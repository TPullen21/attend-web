/* Global Helper Methods */

// Round float percentage to the nearest integer
Template.registerHelper(
    "roundPercentage", function(percentage) {
        return Math.round(parseFloat(percentage));
    }
);

// Format month and year string
Template.registerHelper(
    "formatMonthAndYear", function(dateString) {
    	var date = moment(dateString, "M-YYYY");
    	return moment(date).format("MMMM YYYY");
    }
);

// Format class date
Template.registerHelper(
    "formatClassDate", function(dateString) {
    	var date = moment(dateString, "YYYY-MM-D");
    	return moment(date).format("Do MMM");
    }
);

// Format time to remove seconds
Template.registerHelper(
    "formatTime", function(timeString) {
    	var time = moment(timeString, "HH:mm:ss");
    	return moment(time).format("HH:mm");
    }
);