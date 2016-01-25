// Check if Staff
Template.registerHelper('isStaff', function() {
	if (Meteor.user()) {
		if (Meteor.user().profile.usertype == 'staff') {
			return true;
		}
	}
});