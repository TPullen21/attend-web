// Set the global layout template
Router.configure({
	layoutTemplate: 'layout'
});

// Declare hooks that will be can be called when a route is being accessed
var onBeforeActions = {
	// Redirect the user to home if they are not logged in
	userIsLoggedIn: function() {
		if (Meteor.userId()) {
			this.next();
		} else {
			Router.go('/');
		}
	},
	// Clear all cached session variables
	clearSession: function() {
		console.log('Clearing Session');
		Object.keys(Session.keys).forEach(function(key){
	        Session.set(key, undefined);
	    });
	    Session.keys = {};
	}
}

// Only attach the onBeforeAction hook to check if the user is logged in on the following routes
Router.onBeforeAction(onBeforeActions.userIsLoggedIn, {
	only: ['modules', 'module', 'student', 'student_module_detail', 'class']
});

// Map the routes of the site
Router.map(function() {

	this.route('home', {
		path: '/',
		template: 'home',
        onBeforeAction: function(){
        	// If a user is logged in, go to the modules route
            if(Meteor.user() && Meteor.userId() != null){
                Router.go('modules');
            } 
            // Otherwise clear session variables, incase they've logged out
            else {
				onBeforeActions.clearSession();
				this.next();
            }
        }
	});

	// As the route name, path and template name is the same, this can be condensed
	this.route('modules');

	this.route('module', {
		path: '/module/:_id',
		template: 'module',
        data: function(){
        	console.log("Request:", this.request);
            return {moduleID: this.params._id};
        }
	});

	this.route('student', {
		path: '/student/:_id',
		template: 'student',
        data: function(){
            return {studentNumber: this.params._id};
        }
	});

	this.route('student_module_detail', {
		path: '/student/:studentNumber/module/:moduleID',
		template: 'student_module_detail',
        data: function(){
            return {studentNumber: this.params.studentNumber, moduleID: this.params.moduleID};
        }
	});

	this.route('class', {
		path: '/class/:_id',
		template: 'class',
        data: function(){
            return {occurrenceID: this.params._id};
        }
	});

	this.route('student_portal_student', {
		path: 'studentportal/student/:_id/token/:token',
		template: 'student_portal_student',
		layoutTemplate: 'student_portal_layout',
        data: function(){
            return {studentNumber: this.params._id, token: this.params.token};
        }
	});

	this.route('student_portal_student_module_detail', {
		path: 'studentportal/student/:studentNumber/module/:moduleID',
		template: 'student_portal_student_module_detail',
		layoutTemplate: 'student_portal_layout',
        data: function(){
            return {studentNumber: this.params.studentNumber, moduleID: this.params.moduleID};
        }
	});
});