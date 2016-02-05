// Helper methods for the student_module_detail HTML template
Template.student_module_detail.helpers({
    // This student's name
	studentName: function(){
		return Session.get("studentName");
	},
    // This module's name
    moduleName: function(){
        return Session.get("moduleName");
    },
    // The grouped collection of class attendance information for this student and module
	occurrencesGroupedCollection: function(){
		return Session.get("occurrencesGroupedCollection");
	},
    // Used to get the class for the table row. If the student hasn't attended this class, it will be marked red with the class 'danger'
    rowClass: function(bool) {
        return bool == 0 ? "danger" : "";
    },
    // Do the route IDs match the cached IDs?
    routeIDsMatchSessionIDs: function() {
        return Session.get("studentNumberFromParameter") === Session.get("studentNumberFromSession")
            && Session.get("moduleIDFromParameter") === Session.get("moduleIDFromSession");
    },
    // Has any data been returned from the database?
    noDataOrAccess: function() {
        return typeof(Session.get("noDataOrAccess")) === 'undefined' ? true : Session.get("noDataOrAccess");
    }
});

// Called when the template is first created
Template.student_module_detail.onCreated(function() {

    // Set the session variables with the route student IDs
    Session.set("studentNumberFromParameter", this.data.studentNumber);
    Session.set("moduleIDFromParameter", this.data.moduleID);

    // Call the server method which returns the class attendance information for this module and student
    Meteor.call('getStudentsAttendanceForModule', this.data.studentNumber, this.data.moduleID, Meteor.user()._id, function(err, jsonResponse) {
        if(err) {
            console.log("error occured on receiving data on server. ", err );
        } else {
            console.log("JSON Response: ", jsonResponse);
            Session.set("moduleName", jsonResponse.moduleName);
            Session.set("studentName", jsonResponse.studentName);
            Session.set("studentNumberFromSession", Session.get("studentNumberFromParameter"));
            Session.set("moduleIDFromSession", Session.get("moduleIDFromParameter"));

            // If the occurrences field of the JSON response contains an array that has a size greater than 0, there's data
            if (jsonResponse.occurrences.length > 0) {
                // Group the class occurrences by the month and year field
                var occurrencesGrouped = _.groupBy(jsonResponse.occurrences, 'month_and_year');

                // Map the grouped object into an iterable collection
                var occurrencesGroupedCollection = _.map(Object.keys(occurrencesGrouped), function(key) {
                    var classes = _.map(Object.keys(occurrencesGrouped[key]), function(classesKey) {
                        return occurrencesGrouped[key][classesKey];
                    });
                    return {key: key, classes: classes};
                });
                Session.set("occurrencesGroupedCollection", occurrencesGroupedCollection);
                Session.set("noDataOrAccess", false);
            } else {
                Session.set("noDataOrAccess", true);
            }
        }
    });
});