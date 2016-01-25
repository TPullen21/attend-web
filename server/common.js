Meteor.methods({
    getStudentsAttendanceForModulesTotals: function(studentNumber) {
        var url = "http://itsuite.it.brighton.ac.uk/torp10/attend/getStudentsAttendanceForModulesTotals.php?studentNumber=" + studentNumber;
        // Synchronous GET Request
        var result = HTTP.get(url, {timeout:30000});
        if(result.statusCode==200) {
            var jsonResponse = JSON.parse(result.content);
            return jsonResponse;
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorJson = JSON.parse(result.content);
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }
    },
    getStudentsAttendanceForModulesPerMonth: function(studentNumber) {
        var url = "http://itsuite.it.brighton.ac.uk/torp10/attend/getStudentsAttendanceForModulesPerMonth.php?studentNumber=" + studentNumber;
        // Synchronous GET Request
        var result = HTTP.get(url, {timeout:30000});
        if(result.statusCode==200) {
            var jsonResponse = JSON.parse(result.content);
            return jsonResponse;
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorJson = JSON.parse(result.content);
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }
    },
    getStudentName: function(studentNumber) {
        var url = "http://itsuite.it.brighton.ac.uk/torp10/attend/getStudentName.php?studentNumber=" + studentNumber;
        // Synchronous GET Request
        var result = HTTP.get(url, {timeout:30000});
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