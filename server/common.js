Meteor.methods({
    getStudentsAttendanceInformation: function(studentNumber) {
        var url = "http://itsuite.it.brighton.ac.uk/torp10/attend/getStudentAttendanceInformation.php?studentNumber=" + studentNumber;
        // Asynchronous GET Request
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
        // Asynchronous GET Request
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