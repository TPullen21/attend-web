Template.student.helpers({
	students: function() {
        return Session.get("students");
    },
    totals: function() {
        return Session.get("totals");
    },
    studentName: function() {
        return Session.get("studentName");
    },
    sessionStudentNumberMatchesParameterStudentNumber: function() {
        return Session.get("studentNumberFromParameter") === Session.get("studentNumberFromSession");
    },
    noDataOrAccess: function() {
        return typeof(Session.get("noDataOrAccess")) === 'undefined' ? true : Session.get("noDataOrAccess");
    }
});

Template.student.onCreated(function() {

    Session.set("studentNumberFromParameter", this.data.studentNumber);

    Meteor.call('getStudentsAttendanceInformation', this.data.studentNumber, Meteor.user()._id, function(err, jsonResponse) {
        if(err) {
            console.log("error occured on receiving data on server. ", err );
        } else {
            console.log("JSON Response: ", jsonResponse);
            Session.set("studentName", jsonResponse.studentName);
            Session.set("totals", jsonResponse.totals);
            Session.set("studentNumberFromSession", jsonResponse.studentNumber);

            if (jsonResponse.breakdown.length > 0) {
                Session.set("breakdownGrouped", _.groupBy(jsonResponse.breakdown, 'module_name'));
                Session.set("noDataOrAccess", false);
            } else {
                Session.set("noDataOrAccess", true);
            }
        }
    });
});

Template.student.onRendered(function() {

    Chart.defaults.global.responsive= true;
    Chart.defaults.global.maintainAspectRatio = false;
    Chart.defaults.global.scaleBeginAtZero = true;
});

Template.student.events({
    'click .moduleTitle': function(event){

        _.each(lineCharts, function(lineChart) {
            lineChart.destroy();
        });

        lineCharts = [];

        setTimeout(function() {

            var breakdownForModuleArray = Session.get('breakdownGrouped')[event.target.innerText];

            var ctx = document.getElementById("myChart" + event.target.attributes.id.value).getContext("2d");
            var dataArray = [];
            var labels = [];

            _.each(breakdownForModuleArray, function(occ) {
                dataArray.push(roundPercentage(occ.percentage_of_classes_attended));
                labels.push(getMonth(occ.month, occ.year));
            });

            chartData.labels = labels;
            chartData.datasets[0].data = dataArray;

            var lineChart = new Chart(ctx).Line(chartData, options);

            lineCharts.push(lineChart);

        }, 150);

    }
});

var loaded = false;

var lineCharts = [];
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

var options = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    scaleOverride : true,
    scaleSteps : 10,
    scaleStepWidth : 10,
    scaleStartValue : 00,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};

function random() {
    return Math.floor((Math.random() * 100) + 1);
}

var roundPercentage = function(percentage) {
    return Math.round(parseFloat(percentage));
}

var getMonth = function(monthNumberString, yearString) {
    var calendarMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var calendarMonthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return calendarMonths[parseInt(monthNumberString) - 1] + ' \'' + yearString.substr(2,2);
}