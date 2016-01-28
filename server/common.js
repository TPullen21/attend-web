Meteor.methods({
    getStudentsAttendanceInformation: function(studentNumber) {
        var url = "http://itsuite.it.brighton.ac.uk/torp10/attend/getStudentAttendanceInformation.php?studentNumber=" + studentNumber;
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
    getModuleAttendance: function(moduleID) {
        var url = "http://itsuite.it.brighton.ac.uk/torp10/attend/getModuleAttendance.php?moduleID=" + moduleID;
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
    getClassAttendance: function(occurrenceID) {
        var url = "http://itsuite.it.brighton.ac.uk/torp10/attend/getClassAttendance.php?occurrenceID=" + occurrenceID;
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
    getMyModulesAttendance: function() {
        var url = "http://itsuite.it.brighton.ac.uk/torp10/attend/getMyModulesAttendance.php";
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
    getStudentsAttendanceForModule: function(studentNumber, moduleID) {
        var url = "http://itsuite.it.brighton.ac.uk/torp10/attend/getStudentsAttendanceForModule.php?studentNumber=" + studentNumber + "&moduleID=" + moduleID;
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