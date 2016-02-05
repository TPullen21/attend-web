Router.configure({
	layoutTemplate: 'layout'
});

var onBeforeActions = {
	userIsLoggedIn: function() {
		// If a user is logged in
		if (Meteor.userId()) {
			this.next();
		} else {
			Router.go('/');
		}
	},
	clearSession: function() {
		console.log('Clearing Session');
		Object.keys(Session.keys).forEach(function(key){
	        Session.set(key, undefined);
	    });
	    Session.keys = {};
	}
}

Router.onBeforeAction(onBeforeActions.userIsLoggedIn, {
	only: ['modules', 'module', 'student', 'student_module_detail']
});


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

	this.route('modules');

	this.route('module', {
		path: '/module/:_id',
		template: 'module',
        data: function(){
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
		path: '/student/:studentNumber/:moduleID',
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
});