// Helper methods for the login HTML template
Template.login.helpers({
    // Return the user's email adress, if they are logged in
    userEmail: function(){
        if (Meteor.user()) {
          return Meteor.user().emails[0].address;
        }
    },
    // Return the user's first name, if they are logged in
    firstName: function(){
        if (Meteor.user()) {
          return Meteor.user().profile.firstName;
        }
    },
    // Return the user's last name, if they are logged in
    lastName: function(){
        if (Meteor.user()) {
          return Meteor.user().profile.lastName;
        }
    }
});

// Functions that will be trigged on certain events within the login HTML template
Template.login.events({
    // If the 'Create an Account' link is clicked, hide the sign in panel and show the registration panel
	'click .register-link': function(event){
		$('.panel-login').hide();
		$('.panel-register').fadeIn();
	},
    // If the 'Sign In' link is clicked, hide the registration panel and show the sign in panel
	'click .login-link': function(event){
		$('.panel-register').hide();
		$('.panel-login').fadeIn();
	},
    // If the registration form is submitted, valdiate the values and create the user
	'submit .register-form': function(event){
        var firstName = trimInput(event.target.firstName.value);
        var lastName = trimInput(event.target.lastName.value);
		var email = trimInput(event.target.email.value);
        var password = trimInput(event.target.password.value);
        var passwordConfirm = trimInput(event.target.passwordConfirm.value);

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
    // If the sign in form is submitted, attempt to log the user in with the provided credentials
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
    // If the sign out form is submitted, attempt to log out the user
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

// Remove all spaces from the provided string
var trimInput = function (val) {
    return val.replace(/\s/g, "");
}

// Used to check for empty input fields
isNotEmpty = function (value) {
    if (value && value !== '') {
        return true;
    }

    FlashMessages.sendError("Please fill in all fields.");
    return false;
};

// Validate email with regular expression
isEmail = function (email) {
    var filter = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (filter.test(email)) {
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