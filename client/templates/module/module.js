Template.module.helpers({
    students: function(){
        return Session.get("students");
    },
    classes: function(){
        return Session.get("classes");
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
    },
    rowClass: function(percentage) {
        return percentage < 40 ? "danger" : "";
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
            Session.set("classes", jsonResponse.classes);

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