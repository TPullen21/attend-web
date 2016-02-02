Template.student_module_detail.helpers({
	studentName: function(){
		return Session.get("studentName");
	},
    moduleName: function(){
        return Session.get("moduleName");
    },
	occurencesGroupedCollection: function(){
		return Session.get("occurencesGroupedCollection");
	},
    rowClass: function(bool) {
        return bool == 0 ? "danger" : "";
    },
    sessionStudentNumberMatchesParameterStudentNumber: function() {
        return Session.get("studentNumberFromParameter") === Session.get("studentNumberFromSession");
    },
    noDataOrAccess: function() {
        return typeof(Session.get("noDataOrAccess")) === 'undefined' ? true : Session.get("noDataOrAccess");
    }
});

Template.student_module_detail.onCreated(function() {

    Session.set("studentNumberFromParameter", this.data.studentNumber);

    Meteor.call('getStudentsAttendanceForModule', this.data.studentNumber, this.data.moduleID, Meteor.user()._id, function(err, jsonResponse) {
        if(err) {
            console.log("error occured on receiving data on server. ", err );
        } else {
            console.log("JSON Response: ", jsonResponse);
            Session.set("moduleName", jsonResponse.moduleName);
            Session.set("studentName", jsonResponse.studentName);
            Session.set("studentNumberFromSession", Session.get("studentNumberFromParameter"));

            if (jsonResponse.occurences.length > 0) {
                var occurencesGrouped = _.groupBy(jsonResponse.occurences, 'month_and_year');

                var occurencesGroupedCollection = _.map(Object.keys(occurencesGrouped), function(key) {
                    var classes = _.map(Object.keys(occurencesGrouped[key]), function(classesKey) {
                        return occurencesGrouped[key][classesKey];
                    });
                    return {key: key, classes: classes};
                });
                Session.set("occurencesGroupedCollection", occurencesGroupedCollection);
                Session.set("noDataOrAccess", false);
            } else {
                Session.set("noDataOrAccess", true);
            }
        }
    });
});