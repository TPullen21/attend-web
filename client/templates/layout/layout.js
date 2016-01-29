// Check if Staff
Template.registerHelper('isStaff', function() {
	if (Meteor.user()) {
		if (Meteor.user()) {
			if (Meteor.user().profile.usertype == 'staff') {
				return true;
			}
		}
	}
});

Template.layout.events({
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