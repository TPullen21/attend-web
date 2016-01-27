Router.configure({
	layoutTemplate: 'layout'
});

var onBeforeActions = {
	isStaff: function() {
		// If logged in
		if (Meteor.user()) {
			if (Meteor.user().profile.usertype == 'staff') {
				this.next();
			} else {
				Router.go('/');
			}
		} else {
				Router.go('/');
		}
	}
}

Router.onBeforeAction(onBeforeActions.isStaff, {
	only: ['modules', 'module', 'student']
});


Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'home'
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
});