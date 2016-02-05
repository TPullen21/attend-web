// Helper methods for the module HTML template
Template.module.helpers({
    // The collection of student attendance information for this module
    students: function(){
        return Session.get("students");
    },
    // The collection of class attendance information for this module
    classesGroupedCollection: function(){
        return Session.get("classesGroupedCollection");
    },
    // This module's name
	module_name: function(){
		return Session.get("module_name");
	},
    // This module's code
	module_code: function(){
		return Session.get("module_code");
	},
    // Used to get the class for the percentage table data cell. If the attendance is lower than 40% it will be marked red with the class 'danger', otherwise it will be marked green
    tableDataCellClassForPercentage: function(percentage) {
        return (percentage < 40 ? "danger" : "success") + " percentageTableDataCell";
    },
    // Does the route module ID match the cached ID?
    sessionModuleIDMatchesParameterModuleID: function() {
        return Session.get("moduleIDFromParameter") === Session.get("moduleIDFromSession");
    },
    // Used to know which breakdown to show (class or student) - containerDivName will be either student or class, the same as the session variable
    whatToShow: function(containerDivName) {
        return containerDivName === Session.get("whatToShow");
    },
    // Has any data been returned from the database?
    noDataOrAccess: function() {
        return typeof(Session.get("noDataOrAccess")) === 'undefined' ? true : Session.get("noDataOrAccess");
    }
});

// Called when the template is first created
Template.module.onCreated(function() {

    // Set a session variable with the route module ID
	Session.set("moduleIDFromParameter", this.data.moduleID);

    // Call the server method which returns the attendance information for this module from the database
    Meteor.call('getModuleAttendance', this.data.moduleID, Meteor.user()._id, function(err, jsonResponse) {
        if(err) {
            console.log("error occured on receiving data on server. ", err );
        } else {
            console.log("JSON Response: ", jsonResponse);
            Session.set("moduleIDFromSession", jsonResponse.id);
            Session.set("module_name", jsonResponse.name);
            Session.set("module_code", jsonResponse.code);
            Session.set("students", jsonResponse.students);

            // If the classes field of the JSON response contains an array that has a size greater than 0, there's data
            if (jsonResponse.classes.length > 0) {

                // Group the classes by the month and year field
                var classesGrouped = _.groupBy(jsonResponse.classes, 'month_and_year');

                // Map the grouped object into an iterable collection
                var classesGroupedCollection = _.map(Object.keys(classesGrouped), function(key) {
                    var classes = _.map(Object.keys(classesGrouped[key]), function(classesKey) {
                        return classesGrouped[key][classesKey];
                    });
                    return {key: key, classes: classes};
                });

                Session.set("classesGroupedCollection", classesGroupedCollection);
                Session.set("noDataOrAccess", false);

            } else {
                Session.set("noDataOrAccess", true);
            }

            // If this session variable has not been set, set it to show the student breakdown, otherwise set it to itself
            Session.set("whatToShow", Session.get("whatToShow") ? Session.get("whatToShow") : "student");
        }
    });
});


// Functions that will be trigged on certain events within the module HTML template
Template.module.events({
    // If the 'Breakdown by Class' button has been pressed on the button group or dropdown buttons, set the session variable of what to show to 'class'
    'click .btn-class': function(event){
        Session.set("whatToShow", "class");
    },
    // If the 'Breakdown by Student' button has been pressed on the button group or dropdown buttons, set the session variable of what to show to 'student'
    'click .btn-student': function(event){
        Session.set("whatToShow", "student");
    }
});