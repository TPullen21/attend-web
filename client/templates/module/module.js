Template.module.helpers({
    students: function(){
        return Session.get("students");
    },
    classesGroupedCollection: function(){
        return Session.get("classesGroupedCollection");
    },
	module_name: function(){
		return Session.get("module_name");
	},
	module_code: function(){
		return Session.get("module_code");
	},
    rowClassForPercentage: function(percentage) {
        return (percentage < 40 ? "danger" : "success") + " percentageTableDataCell";
    },
    sessionModuleIDMatchesParameterModuleID: function() {
        return Session.get("moduleIDFromParameter") === Session.get("moduleIDFromSession");
    },
    whatToShow: function(containerDivName) {
        return containerDivName === Session.get("whatToShow");
    }
});

Template.module.onCreated(function() {

	Session.set("moduleIDFromParameter", this.data.moduleID);

    Meteor.call('getModuleAttendance', this.data.moduleID, function(err, jsonResponse) {
        if(err) {
            console.log("error occured on receiving data on server. ", err );
        } else {
            console.log("JSON Response: ", jsonResponse);
            Session.set("moduleIDFromSession", jsonResponse.id);
            Session.set("module_name", jsonResponse.name);
            Session.set("module_code", jsonResponse.code);
            Session.set("students", jsonResponse.students);

            var classesGrouped = _.groupBy(jsonResponse.classes, 'month_and_year');

            var classesGroupedCollection = _.map(Object.keys(classesGrouped), function(key) {
                var classes = _.map(Object.keys(classesGrouped[key]), function(classesKey) {
                    return classesGrouped[key][classesKey];
                });
                return {key: key, classes: classes};
            });
            Session.set("classesGroupedCollection", classesGroupedCollection);

            Session.set("whatToShow", Session.get("whatToShow") ? Session.get("whatToShow") : "student");
        }
    });
});

Template.module.events({
    'click .btn-class': function(event){
        Session.set("whatToShow", "class");
    },
    'click .btn-student': function(event){
        Session.set("whatToShow", "student");
    }        
});