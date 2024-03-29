// Helper methods for the student HTML template
Template.student_portal_student.helpers({
    // The collection of modules average attendance information for this student
    modules: function() {
        return Session.get("student_modules");
    },
    // This student's name
    studentName: function() {
        return Session.get("studentName");
    },
    // Does the route student number match the cached student number?
    sessionStudentNumberMatchesParameterStudentNumber: function() {
        return Session.get("studentNumberFromParameter") === Session.get("studentNumberFromSession");
    },
    // Has any data been returned from the database?
    noDataOrAccess: function() {
        return typeof(Session.get("noDataOrAccess")) === 'undefined' ? true : Session.get("noDataOrAccess");
    },
    isModule: function(index) {
        return index > 0;
    }
});

// Called when the template is first created
Template.student_portal_student.onCreated(function() {

    // Set a session variable with the route student ID
    Session.set("studentNumberFromParameter", this.data.studentNumber);
    var token = this.data.token;
    
    // Call the server method which returns the average attendance information for all the modules for this student from the database
    Meteor.call('studentPortal_GetStudentsAttendanceInformation', this.data.studentNumber, this.data.token, function(err, jsonResponse) {
        if(err) {
            console.log("error occured on receiving data on server. ", err );
        } else {
            console.log("JSON Response: ", jsonResponse);
            Session.set("studentName", jsonResponse.studentName);
            Session.set("student_modules", jsonResponse.totals);
            Session.set("studentNumberFromSession", jsonResponse.studentNumber);

            // If the breakdown field of the JSON response contains an array that has a size greater than 0, there's data
            if (jsonResponse.breakdown.length > 0) {
                Session.set("breakdownGrouped", _.groupBy(jsonResponse.breakdown, 'module_name'));
                Session.set("noDataOrAccess", false);
                Session.set("studentPortalToken", token);
            } else {
                Session.set("noDataOrAccess", true);
            }
        }
    });
});

// Called when the template is fully rendered
Template.student_portal_student.onRendered(function() {
    // Set global chart options
    Chart.defaults.global.responsive= true;
    Chart.defaults.global.maintainAspectRatio = false;
    Chart.defaults.global.scaleBeginAtZero = true;
});

// Functions that will be trigged on certain events within the student HTML template
Template.student_portal_student.events({
    // When a module name is clicked to expand the breakdown pane
    'click .moduleTitle': function(event){

        // For every chart in the array of created charts, if any, destroy all the charts
        _.each(lineCharts, function(lineChart) {
            lineChart.destroy();
        });

        // Then set the array an empty array
        lineCharts = [];

        // After 150ms (enough time for the collapsable pane to finish expanding)
        setTimeout(function() {

            // Get the breakdown information for the module name that was clicked
            var breakdownForModuleArray = Session.get('breakdownGrouped')[event.target.innerText];

            // Get the canvas element in the collapsable pane that's opening via the module ID for the module clicked
            var ctx = document.getElementById("myChart" + event.target.attributes.id.value).getContext("2d");

            var dataPoints = [];
            var labels = [];

            // For every record in the breakdown records for this module, add the average percentage to the data points (y axis) array and add the month/year string to the labels (x axis) array
            _.each(breakdownForModuleArray, function(occ) {
                dataPoints.push(roundPercentage(occ.percentage_of_classes_attended));
                labels.push(formatMonthAndYear(occ.month, occ.year));
            });

            // Set the chart data labels and data points field to the relevant arrays populated above
            chartData.labels = labels;
            chartData.datasets[0].data = dataPoints;

            // Create the chart with the chart data and options
            var lineChart = new Chart(ctx).Line(chartData, chartOptions);

            // Add the newly created chart to this global array for future access
            lineCharts.push(lineChart);

        }, 150);
    }
});

// Global array of created charts
var lineCharts = [];

// Placeholder chart data object to be populated with labels and data points when charts are created
var chartData = {
                labels: [],
                datasets: [{
                    label: "My First dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: []
                }]
            };

// Chart options object to be used when creating charts
var chartOptions = {

    /* Default chart options */

    scaleShowGridLines: true,
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",

    /* Options to force the y axis to start from 0 and finish at 100 */

    scaleOverride: true,
    scaleSteps: 10,
    scaleStepWidth: 10,
    scaleStartValue: 00
};

// Helper method for this file to round a float percentage to the nearest integer
var roundPercentage = function(percentage) {
    return Math.round(parseFloat(percentage));
}

// Helper method for this file to convert a month and year number to a string in the format "January '15"
var formatMonthAndYear = function(monthNumberString, yearString) {
    var calendarMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var calendarMonthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return calendarMonths[parseInt(monthNumberString) - 1] + ' \'' + yearString.toString().substr(2,2);
}

var validateToken = function(studentNumber, token) {
    var hashedNumber = (((studentNumber * 15485863)) % 899999) + 100000;
    console.log(hashedNumber);

    return token == hashedNumber;
}