Router.configure({
	layoutTemplate: 'layout'
});


Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'home'
	});

	this.route('modules');

	this.route('module', {
		path: '/module/:_id',
		template: 'module'
	});

	this.route('student', {
		path: '/student/:_id',
		template: 'student'
	});
});