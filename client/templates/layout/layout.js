// Check if the user that is logged in is a staff member
Template.registerHelper('isStaff', function() {
	if (Meteor.user()) {
		if (Meteor.user()) {
			if (Meteor.user().profile.usertype == 'staff') {
				return true;
			}
		}
	}
});

// Functions that will be trigged on certain events within the layout HTML template
Template.layout.events({
    // If the sign out button is pressed, attempt to log out the user
	"click .logout-user": function (event) {
        Meteor.logout(function (err) {
            if (err) {
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess('You are now logged out.');
                Router.go('/');
            }
        });
    }
});