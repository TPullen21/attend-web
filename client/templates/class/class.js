// Helper methods for the class HTML template
Template.class.helpers({
    // The collection of student attendance information for this class
	students: function(){
		return Session.get("students");
	},
    // The module name for this class
    moduleName: function(){
        return Session.get("moduleName");
    },
    // The module code for this class
    moduleCode: function(){
        return Session.get("moduleCode");
    },
    // The formatted start date and time for the occurrence of this class
    occurrenceStart: function(){
        var date = moment(Session.get("occurrenceStartDatetime"), "YYYY-MM-DD HH:mm:ss");
        return moment(date).format("ddd do MMM YY HH:mm");
    },
    // The formatted finish time for the occurrence of this class
    occurrenceFinish: function(){
        var date = moment(Session.get("occurrenceFinishDatetime"), "YYYY-MM-DD HH:mm:ss");
        return moment(date).format("HH:mm");
    },
    // Used to get the class for the table row. If the student hasn't attended this class, it will be marked red with the class 'danger'
    rowClass: function(attended) {
        return attended == 0 ? "danger" : "";
    },
    // Does the route occurence ID match the cached ID?
    sessionOccurrenceIDMatchesParameterOccurrenceID: function() {
        return Session.get("occurrenceIDFromParameter") === Session.get("occurrenceIDFromSession");
    },
    // Has any data been returned from the database?
    noDataOrAccess: function() {
        return typeof(Session.get("noDataOrAccess")) === 'undefined' ? true : Session.get("noDataOrAccess");
    }
});

// Called when the template is first created
Template.class.onCreated(function() {

    // Set a session variable with the route occurence ID
    Session.set("occurrenceIDFromParameter", this.data.occurrenceID);

    // Call the server method which returns the attendance information for this class from the database
    Meteor.call('getClassAttendance', this.data.occurrenceID, Meteor.userId(), function(err, jsonResponse) {
        if(err) {
            console.log("error occured on receiving data on server. ", err );
        } else {
            console.log("JSON Response: ", jsonResponse);
            Session.set("moduleName", jsonResponse.moduleName);
            Session.set("moduleCode", jsonResponse.moduleCode);
            Session.set("occurrenceStartDatetime", jsonResponse.occurrenceStartDatetime);
            Session.set("occurrenceFinishDatetime", jsonResponse.occurrenceFinishDatetime);
            Session.set("occurrenceIDFromSession", Session.get("occurrenceIDFromParameter"));

            // If the students array field of the JSON response is larger than 0, there's data
            if (jsonResponse.students.length > 0) {
                Session.set("students", jsonResponse.students);
                Session.set("noDataOrAccess", false);
            } else {
                Session.set("noDataOrAccess", true);
            }
        }
    });
});