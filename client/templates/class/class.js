Template.class.helpers({
	students: function(){
		return Session.get("students");
	},
    moduleName: function(){
        return Session.get("moduleName");
    },
    moduleCode: function(){
        return Session.get("moduleCode");
    },
    occurrenceStart: function(){
        var date = moment(Session.get("occurrenceStartDatetime"), "YYYY-MM-DD HH:mm:ss");
        return moment(date).format("ddd do MMM YY HH:mm");
    },
    occurrenceFinish: function(){
        var date = moment(Session.get("occurrenceFinishDatetime"), "YYYY-MM-DD HH:mm:ss");
        return moment(date).format("HH:mm");
    },
    rowClass: function(bool) {
        return bool == 0 ? "danger" : "";
    },
    sessionOccurrenceIDMatchesParameterOccurrenceID: function() {
        return Session.get("occurrenceIDFromParameter") === Session.get("occurrenceIDFromSession");
    }
});

Template.class.onCreated(function() {

    Session.set("occurrenceIDFromParameter", this.data.occurrenceID);

    Meteor.call('getClassAttendance', this.data.occurrenceID, Meteor.user()._id, function(err, jsonResponse) {
        if(err) {
            console.log("error occured on receiving data on server. ", err );
        } else {
            console.log("JSON Response: ", jsonResponse);
            Session.set("moduleName", jsonResponse.moduleName);
            Session.set("moduleCode", jsonResponse.moduleCode);
            Session.set("occurrenceStartDatetime", jsonResponse.occurrenceStartDatetime);
            Session.set("occurrenceFinishDatetime", jsonResponse.occurrenceFinishDatetime);
            Session.set("occurrenceIDFromSession", jsonResponse.occurrenceID);
            Session.set("students", jsonResponse.students);
        }
    });
});