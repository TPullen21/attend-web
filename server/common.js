/* Server methods */

Meteor.methods({
    getStudentsAttendanceInformation: function(studentNumber, staffID) {
        var url = "http://itsuite.it.brighton.ac.uk/torp10/attend/getStudentAttendanceInformation.php?studentNumber=" + studentNumber + "&staffID=" + staffID;
        // Synchronous GET Request
        var result = HTTP.get(url, {timeout:30000})
        if(result.statusCode==200) {
            var jsonResponse = JSON.parse(result.content);
            return jsonResponse;
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorJson = JSON.parse(result.content);
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }
    },
    getModuleAttendance: function(moduleID, staffID) {
        var url = "http://itsuite.it.brighton.ac.uk/torp10/attend/getModuleAttendance.php?moduleID=" + moduleID + "&staffID=" + staffID;
        // Synchronous GET Request
        var result = HTTP.get(url, {timeout:30000})
        if(result.statusCode==200) {
            var jsonResponse = JSON.parse(result.content);
            return jsonResponse;
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorJson = JSON.parse(result.content);
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }
    },
    getClassAttendance: function(occurrenceID, staffID) {
        var url = "http://itsuite.it.brighton.ac.uk/torp10/attend/getClassAttendance.php?occurrenceID=" + occurrenceID + "&staffID=" + staffID;
        // Synchronous GET Request
        var result = HTTP.get(url, {timeout:30000})
        if(result.statusCode==200) {
            var jsonResponse = JSON.parse(result.content);
            return jsonResponse;
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorJson = JSON.parse(result.content);
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }
    },
    getMyModulesAttendance: function(staffID) {
        var url = "http://itsuite.it.brighton.ac.uk/torp10/attend/getMyModulesAttendance.php?staffID=" + staffID;
        // Synchronous GET Request
        var result = HTTP.get(url, {timeout:30000})
        if(result.statusCode==200) {
            var jsonResponse = JSON.parse(result.content);
            return jsonResponse;
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorJson = JSON.parse(result.content);
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }
    },
    getStudentsAttendanceForModule: function(studentNumber, moduleID, staffID) {
        var url = "http://itsuite.it.brighton.ac.uk/torp10/attend/getStudentsAttendanceForModule.php?studentNumber=" + studentNumber + "&moduleID=" + moduleID + "&staffID=" + staffID;
        // Synchronous GET Request
        var result = HTTP.get(url, {timeout:30000})
        if(result.statusCode==200) {
            var jsonResponse = JSON.parse(result.content);
            return jsonResponse;
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorJson = JSON.parse(result.content);
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }
    }
});