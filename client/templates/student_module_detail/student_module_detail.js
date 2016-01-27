Template.student_module_detail.helpers({
	occurences: function(){
		if (Session.get("occurences")) {
			return Session.get("occurences");
		} else {
			return [];
		}
	},
	studentName: function(){
		return Session.get("studentName");
	},
	moduleName: function(){
		return Session.get("moduleName");
	},
	occurencesGrouped: function(){
		return Session.get("occurencesGrouped");
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
    }
});

Template.student_module_detail.onCreated(function() {

	console.log(this.data);
	console.log(this.data.studentNumber);
	console.log(this.data.moduleID);

    Meteor.call('getStudentsAttendanceForModule', this.data.studentNumber, this.data.moduleID, function(err, jsonResponse) {
        if(err) {
            console.log("error occured on receiving data on server. ", err );
        } else {
            console.log("JSON Response: ", jsonResponse);
            Session.set("moduleName", jsonResponse.moduleName);
            Session.set("studentName", jsonResponse.studentName);
            Session.set("occurences", jsonResponse.occurences);
            var occurencesGrouped = _.groupBy(jsonResponse.occurences, 'month_and_year');
            Session.set("occurencesGrouped", occurencesGrouped);

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