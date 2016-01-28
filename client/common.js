Template.registerHelper(
    "roundPercentage", function(percentage) {
        return Math.round(parseFloat(percentage));
    }
);
Template.registerHelper(
    "formatMonthAndYear", function(dateString) {
    	var date = moment(dateString, "M-YYYY");
    	return moment(date).format("MMMM YYYY");
    }
);
Template.registerHelper(
    "formatClassDate", function(dateString) {
    	var date = moment(dateString, "YYYY-MM-D");
    	return moment(date).format("Do MMM");
    }
);
Template.registerHelper(
    "formatTime", function(timeString) {
    	var time = moment(timeString, "HH:mm:ss");
    	return moment(time).format("HH:mm");
    }
);