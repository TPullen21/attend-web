Template.module.helpers({
	students: function(){
		if (Session.get("students")) {
			return Session.get("students");
		} else {
			return [];
		}
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
        }
    });
});