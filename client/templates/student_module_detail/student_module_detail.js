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
    formatMonthAndYear: function(dateString) {
    	var date = moment(dateString, "M-YYYY");
    	return moment(date).format("MMMM YYYY");
    },
    formatClassDate: function(dateString) {
    	var date = moment(dateString, "YYYY-MM-D");
    	return moment(date).format("Do MMM");
    },
    formatTime: function(timeString) {
    	var time = moment(timeString, "HH:mm:ss");
    	return moment(time).format("HH:mm");
    },
    sessionStudentNumberMatchesParameterStudentNumber: function() {
        return Session.get("studentNumberFromParameter") === Session.get("studentNumberFromSession");
    }
});

Template.student_module_detail.onCreated(function() {

    Session.set("studentNumberFromParameter", this.data.studentNumber);

    Meteor.call('getStudentsAttendanceForModule', this.data.studentNumber, this.data.moduleID, function(err, jsonResponse) {
        if(err) {
            console.log("error occured on receiving data on server. ", err );
        } else {
            console.log("JSON Response: ", jsonResponse);
            Session.set("moduleName", jsonResponse.moduleName);
            Session.set("studentName", jsonResponse.studentName);
            Session.set("studentNumberFromSession", jsonResponse.studentNumber);

            var occurencesGrouped = _.groupBy(jsonResponse.occurences, 'month_and_year');

            var occurencesGroupedCollection = _.map(Object.keys(occurencesGrouped), function(key) {
            	var classes = _.map(Object.keys(occurencesGrouped[key]), function(classesKey) {
			        return occurencesGrouped[key][classesKey];
			    });
            	return {key: key, classes: classes};
            });
            Session.set("occurencesGroupedCollection", occurencesGroupedCollection);
        }
    });
});