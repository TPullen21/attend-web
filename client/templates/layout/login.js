Template.login.helpers({
    userEmail: function(){
        if (Meteor.user()) {
          return Meteor.user().emails[0].address;
        }
    },
    firstName: function(){
        if (Meteor.user()) {
          return Meteor.user().profile.firstName;
        }
    },
    lastName: function(){
        if (Meteor.user()) {
          return Meteor.user().profile.lastName;
        }
    }
});

Template.login.events({
	'click .register-link': function(event){
		$('.panel-login').hide();
		$('.panel-register').fadeIn();
	},
	'click .login-link': function(event){
		$('.panel-register').hide();
		$('.panel-login').fadeIn();
	},
	'submit .register-form': function(event){
        var firstName = event.target.firstName.value;
        var lastName = event.target.lastName.value;
		var email = event.target.email.value;
        var password = event.target.password.value;
        var passwordConfirm = event.target.passwordConfirm.value;

		if (isNotEmpty(firstName) &&
            isNotEmpty(lastName) &&
            isNotEmpty(email) && 
			isNotEmpty(password) && 
			isEmail(email) && 
			areValidPasswords(password, passwordConfirm)) {
		         // Create new user
		            Accounts.createUser({
		                email: email,
		                password: password,
		                profile: {
		                    usertype: 'staff',
                            firstName: firstName,
                            lastName: lastName
		                }
		            }, function (err) {
		                if (err) {
		                    FlashMessages.sendError("There was an error with registration.");
		                } else {
		                    FlashMessages.sendSuccess("Account Created! You are now logged in.");
		                    Router.go('modules');
		                }
		            });
		    }
        
        // Prevent form submission
        return false;
	},
	"submit .login-form": function (event) {

        var email = event.target.email.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(email, password, function (err) {
            if (err){
                event.target.email.value = email;
                event.target.password.value = password;
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess('Welcome back, ' + Meteor.user().profile.firstName + '.');
                Router.go('modules');
            }
        });

        // Clear form
        event.target.email.value = "";
        event.target.email.value = "";

        // Prevent form submission
        return false;
    },
	"submit .logout-form": function (event) {
        Meteor.logout(function (err) {
            if (err) {
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess('You are now logged out.');
                Router.go('/');
            }
        });

        // Prevent form submission
        return false;
    }
});


/* **** Input Field Validation **** */

// Remove leading and trailing white space
var trimInput = function (val) {
    return val.replace(/^\s*|\s*$/g, "");
}

// Check for empty input fields
isNotEmpty = function (value) {
    if (value && value !== '') {
        return true;
    }

    FlashMessages.sendError("Please fill in all fields.");
    return false;
};

// Validate email with regular expression
isEmail = function (value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (filter.test(value)) {
        return true;
    }

    FlashMessages.sendError("Please enter a valid email address.");
    return false;
};

// Check length of password field
isValidPassword = function (password) {
    if (password.length < 8) {
        FlashMessages.sendError("Password must be at least 8 characters.");
        return false;
    }

    return true;
};

// Match passwords
areValidPasswords = function (password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }

    if (password !== confirm) {
        FlashMessages.sendError("Passwords do not match.");
        return false;
    }

    return true;
};