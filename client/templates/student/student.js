Template.student.helpers({
	modules: function(){
		return [  
				   {  
				      "id":1,
				      "moduleName":"CI301 - Individual Project",
				      "attendance":54
				   },
				   {  
				      "id":2,
				      "moduleName":"CI311 - Specification and Refinement",
				      "attendance":73
				   },
				   {  
				      "id":3,
				      "moduleName":"CI346 - Client and Server Side Computing",
				      "attendance":88
				   },
				   {  
				      "id":4,
				      "moduleName":"CI347 - Web and Network Management",
				      "attendance":91
				   },
				   {  
				      "id":5,
				      "moduleName":"CI360 - Mobile Application Development",
				      "attendance":66
				   }
				];
	}
});

Template.student.onRendered(function() {

    Chart.defaults.global.responsive= true;
    Chart.defaults.global.maintainAspectRatio = false;
    Chart.defaults.global.scaleBeginAtZero = true;
    
    // Get the context of the canvas element we want to select
    /*var ctx  = document.getElementById("myChart").getContext("2d");

    // Set the options
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

    // Set the data
    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [20, 30, 80, 40, 10, 50, 90]
            //data: [random(), random(), random(), random(), random(), random(), random()]
        }, {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [90, 50, 10, 40, 80, 30, 20]
        }]
    };

    // draw the charts
    var myLineChart = new Chart(ctx).Line(data, options);*/
});

Template.student.events({
    'click .accordion-navigation': function(event){

        console.log('here');

        if (!loaded) {           

            setTimeout(function() {
                
                var ctx1  = document.getElementById("myChart1").getContext("2d");
                var ctx2  = document.getElementById("myChart2").getContext("2d");
                var ctx3  = document.getElementById("myChart3").getContext("2d");
                var ctx4  = document.getElementById("myChart4").getContext("2d");
                var ctx5 = document.getElementById("myChart5").getContext("2d");

                // draw the charts
                myLineChart1 = new Chart(ctx1).Line(data1, options);
                myLineChart2 = new Chart(ctx2).Line(data2, options);
                myLineChart3 = new Chart(ctx3).Line(data3, options);
                myLineChart4 = new Chart(ctx4).Line(data4, options);
                myLineChart5 = new Chart(ctx5).Line(data5, options);

            }, 150);

            loaded = true;
        } else {
            myLineChart1.destroy();
            myLineChart2.destroy();
            myLineChart3.destroy();
            myLineChart4.destroy();
            myLineChart5.destroy();       

            setTimeout(function() {
                
                var ctx1  = document.getElementById("myChart1").getContext("2d");
                var ctx2  = document.getElementById("myChart2").getContext("2d");
                var ctx3  = document.getElementById("myChart3").getContext("2d");
                var ctx4  = document.getElementById("myChart4").getContext("2d");
                var ctx5  = document.getElementById("myChart5").getContext("2d");

                // draw the charts
                myLineChart1 = new Chart(ctx1).Line(data1, options);
                myLineChart2 = new Chart(ctx2).Line(data2, options);
                myLineChart3 = new Chart(ctx3).Line(data3, options);
                myLineChart4 = new Chart(ctx4).Line(data4, options);
                myLineChart5 = new Chart(ctx5).Line(data5, options);

            }, 150);
        };




    }
});

var loaded = false;

var myLineChart1;
var myLineChart2;
var myLineChart3;
var myLineChart4;
var myLineChart5;

var data1 = {
                labels: ["October", "November", "December", "January", "February", "March", "April", "May", "June"],
                datasets: [{
                    label: "My First dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [random(), random(), random(), random(), random(), random(), random(), random(), random()]
                    //data: [75, 60, 20, 30, 80, 40, 10, 50, 90]
                }]
            };

var data2 = {
                labels: ["October", "November", "December", "January", "February", "March", "April", "May", "June"],
                datasets: [{
                    label: "My First dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [random(), random(), random(), random(), random(), random(), random(), random(), random()]
                    //data: [75, 60, 20, 30, 80, 40, 10, 50, 90]
                }]
            };

var data3 = {
                labels: ["October", "November", "December", "January", "February", "March", "April", "May", "June"],
                datasets: [{
                    label: "My First dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [random(), random(), random(), random(), random(), random(), random(), random(), random()]
                    //data: [75, 60, 20, 30, 80, 40, 10, 50, 90]
                }]
            };

var data4 = {
                labels: ["October", "November", "December", "January", "February", "March", "April", "May", "June"],
                datasets: [{
                    label: "My First dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [random(), random(), random(), random(), random(), random(), random(), random(), random()]
                    //data: [75, 60, 20, 30, 80, 40, 10, 50, 90]
                }]
            };

var data5 = {
                labels: ["October", "November", "December", "January", "February", "March", "April", "May", "June"],
                datasets: [{
                    label: "My First dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [random(), random(), random(), random(), random(), random(), random(), random(), random()]
                    //data: [75, 60, 20, 30, 80, 40, 10, 50, 90]
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