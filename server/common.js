/* Server methods */

//Kadira.connect('p4TWawARuAZ3JFr5y', '58aba75e-6bd9-4fd9-8b49-bb2fd978b1e1');

Meteor.methods({
    getStudentsAttendanceInformation: function(studentNumber, staffID) {
        var url = "http://ec2-52-16-135-99.eu-west-1.compute.amazonaws.com:8888/attendance/student/" + studentNumber;
        // Synchronous GET Request
        var result = HTTP.get(url, {headers: {'staffid' : staffID}, timeout:30000})
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
        var url = "http://ec2-52-16-135-99.eu-west-1.compute.amazonaws.com:8888/attendance/module/" + moduleID;
        // Synchronous GET Request
        var result = HTTP.get(url, {headers: {'staffid' : staffID}, timeout:30000})
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
        var url = "http://ec2-52-16-135-99.eu-west-1.compute.amazonaws.com:8888/attendance/class/" + occurrenceID;
        // Synchronous GET Request
        var result = HTTP.get(url, {headers: {'staffid' : staffID}, timeout:30000})
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
        var url = "http://ec2-52-16-135-99.eu-west-1.compute.amazonaws.com:8888/attendance/staffModules";
        // Synchronous GET Request
        var result = HTTP.get(url, {headers: {'staffid' : staffID}, timeout:30000})
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
        var url = "http://ec2-52-16-135-99.eu-west-1.compute.amazonaws.com:8888/attendance/student/" + studentNumber + "/module/" + moduleID;
        // Synchronous GET Request
        var result = HTTP.get(url, {headers: {'staffid' : staffID}, timeout:30000})
        if(result.statusCode==200) {
            var jsonResponse = JSON.parse(result.content);
            return jsonResponse;
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorJson = JSON.parse(result.content);
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }
    },
    /* *** Student Portal Methods *** */
    studentPortal_GetStudentsAttendanceInformation: function(studentNumber, token) {
        var url = "http://ec2-52-16-135-99.eu-west-1.compute.amazonaws.com:8888/attendance/student/" + studentNumber;
        // Synchronous GET Request
        var result = HTTP.get(url, {headers: {'token' : token}, timeout:30000})
        if(result.statusCode==200) {
            var jsonResponse = JSON.parse(result.content);
            return jsonResponse;
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorJson = JSON.parse(result.content);
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }
    },
    studentPortal_GetStudentsAttendanceForModule: function(studentNumber, moduleID, token) {
        var url = "http://ec2-52-16-135-99.eu-west-1.compute.amazonaws.com:8888/attendance/student/" + studentNumber + "/module/" + moduleID;
        // Synchronous GET Request
        var result = HTTP.get(url, {headers: {'token' : token}, timeout:30000})
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