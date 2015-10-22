"use strict";
	

var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 850;
var radarChartData = null;
var myRadarChart = null;
//var canvasChart = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");

//var chart = canvasChart.get(0).getContext("2d");
var canvasChart;
//console.log(canvasChart);
var chart;
var clouds;
var QAs;

var tea = "rgba(100, 120, 0,";
var blue = "rgba(0, 120, 255,";
var red = "rgba(255, 0, 0,";
var black = "rgba(50,50,50,";
var green = "rgba(0,180,0,";
var purple = "rgba(255,0,255,";


$(document).ready(function() {
	canvasChart = document.getElementById("canvasChart");
	chart = canvasChart.getContext("2d");
	var pcs = sessionStorage.getItem('pieces');
	clouds = $.parseJSON(pcs);
	pcs = sessionStorage.getItem('QA');
	QAs = $.parseJSON(pcs);
	
	console.log(QAs);
	console.log(clouds);
	console.log(clouds[0]);
	console.log(clouds[0].cloud);
	console.log(clouds[0].QAScores);
//canvasChart.appendTo('body');
//canvasChart.show(); TODO: Have the chart pull data from variables you define 

	radarChartData = {
		/*labels : [ "Security", "Scalability", "Integrability",
				"Availability", "Performance", "Maintainability" ], // need function to get names of chosen QAs*/
		labels : QAs,
		datasets : [ {
			label : clouds[0].cloud,
			fillColor : tea+"0)",
			strokeColor : tea+"0.5)",
			pointColor : tea+"1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke: tea+"1)",
			data : clouds[0].QAScores
		}, {
			label : clouds[1].cloud,
			fillColor : blue+"0)",
			strokeColor: blue+"0.5)",
			pointColor : blue+"1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke: blue+"1)",
			data : clouds[1].QAScores
		}, {
			label : clouds[2].cloud,
			fillColor : red+"0)",
			strokeColor : red+"0.5)",
			pointColor : red+"1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : red+"1)",
			data : clouds[2].QAScores
		}, {
			label : clouds[3].cloud,
			fillColor : black+"0)",
			strokeColor : black+"0.5)",
			pointColor : black+"1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : black+"1)",
			data : clouds[3].QAScores
		}, {
			label : clouds[4].cloud,
			fillColor : green+"0)",
			strokeColor : green+"0.5)",
			pointColor : green+"1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : green+"1)",
			data : clouds[4].QAScores
		},
		{
			label : clouds[5].cloud,
			fillColor : purple+"0)",
			strokeColor : purple+"0.5)",
			pointColor : purple+"1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : purple+"1)",
			data : clouds[5].QAScores
		}, ]
	};
	/*//scalability
	radarChartData.datasets[0].data[1] = 20; //dataset => model; data => QA
	radarChartData.datasets[1].data[1] = 30;
	radarChartData.datasets[2].data[1] = 50;
	radarChartData.datasets[3].data[1] = 10;
	radarChartData.datasets[4].data[1] = 40;
	radarChartData.datasets[5].data[1] = 60;*/

	
	var options = {
			legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li id=<%=\"legend\"+i%>><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
		    // String - Template string for single tooltips
		    tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>",
		    // String - Template string for multiple tooltips
		    multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
		};
	
	myRadarChart = new Chart(chart).Radar(radarChartData, options);
	
	document.getElementById('js-legend').innerHTML += myRadarChart.generateLegend();
	
	$('#legend0').click(function() {
		if(myRadarChart.datasets[0].strokeColor == tea+"1)"){
			myRadarChart.datasets[0].strokeColor = tea+"0.5)";
			myRadarChart.datasets[1].strokeColor = blue+"0.5)";
			myRadarChart.datasets[2].strokeColor = red+"0.5)";
			myRadarChart.datasets[3].strokeColor = black+"0.5)";
			myRadarChart.datasets[4].strokeColor = green+"0.5)";
			myRadarChart.datasets[5].strokeColor = purple+"0.5)";
			document.getElementById('cloudDesc').innerHTML = "";
		} else {
			myRadarChart.datasets[0].strokeColor = tea+"1)";
			myRadarChart.datasets[1].strokeColor = blue+"0.2)";
			myRadarChart.datasets[2].strokeColor = red+"0.2)";
			myRadarChart.datasets[3].strokeColor = black+"0.2)";
			myRadarChart.datasets[4].strokeColor = green+"0.2)";
			myRadarChart.datasets[5].strokeColor = purple+"0.2)";
			displayCloudStats(0);
		}
		myRadarChart.update();
	});
	$('#legend1').click(function() {
		if(myRadarChart.datasets[1].strokeColor == blue+"1)"){
			myRadarChart.datasets[0].strokeColor = tea+"0.5)";
			myRadarChart.datasets[1].strokeColor = blue+"0.5)";
			myRadarChart.datasets[2].strokeColor = red+"0.5)";
			myRadarChart.datasets[3].strokeColor = black+"0.5)";
			myRadarChart.datasets[4].strokeColor = green+"0.5)";
			myRadarChart.datasets[5].strokeColor = purple+"0.5)";
			document.getElementById('cloudDesc').innerHTML = "";
		} else {
			myRadarChart.datasets[0].strokeColor = tea+"0.2)";
			myRadarChart.datasets[1].strokeColor = blue+"1)";
			myRadarChart.datasets[2].strokeColor = red+"0.2)";
			myRadarChart.datasets[3].strokeColor = black+"0.2)";
			myRadarChart.datasets[4].strokeColor = green+"0.2)";
			myRadarChart.datasets[5].strokeColor = purple+"0.2)";
			displayCloudStats(1);
		}
		myRadarChart.update();
	});
	$('#legend2').click(function() {
		if(myRadarChart.datasets[2].strokeColor == red+"1)"){
			myRadarChart.datasets[0].strokeColor = tea+"0.5)";
			myRadarChart.datasets[1].strokeColor = blue+"0.5)";
			myRadarChart.datasets[2].strokeColor = red+"0.5)";
			myRadarChart.datasets[3].strokeColor = black+"0.5)";
			myRadarChart.datasets[4].strokeColor = green+"0.5)";
			myRadarChart.datasets[5].strokeColor = purple+"0.5)";
			document.getElementById('cloudDesc').innerHTML = "";
		} else {
			myRadarChart.datasets[0].strokeColor = tea+"0.2)";
			myRadarChart.datasets[1].strokeColor = blue+"0.2)";
			myRadarChart.datasets[2].strokeColor = red+"1)";
			myRadarChart.datasets[3].strokeColor = black+"0.2)";
			myRadarChart.datasets[4].strokeColor = green+"0.2)";
			myRadarChart.datasets[5].strokeColor = purple+"0.2)";
			displayCloudStats(2);
		}
		myRadarChart.update();
	});
	$('#legend3').click(function() {
		if(myRadarChart.datasets[3].strokeColor == black+"1)"){
			myRadarChart.datasets[0].strokeColor = tea+"0.5)";
			myRadarChart.datasets[1].strokeColor = blue+"0.5)";
			myRadarChart.datasets[2].strokeColor = red+"0.5)";
			myRadarChart.datasets[3].strokeColor = black+"0.5)";
			myRadarChart.datasets[4].strokeColor = green+"0.5)";
			myRadarChart.datasets[5].strokeColor = purple+"0.5)";
			document.getElementById('cloudDesc').innerHTML = "";
		} else {
			myRadarChart.datasets[0].strokeColor = tea+"0.2)";
			myRadarChart.datasets[1].strokeColor = blue+"0.2)";
			myRadarChart.datasets[2].strokeColor = red+"0.2)";
			myRadarChart.datasets[3].strokeColor = black+"1)";
			myRadarChart.datasets[4].strokeColor = green+"0.2)";
			myRadarChart.datasets[5].strokeColor = purple+"0.2)";
			displayCloudStats(3);
		}
		myRadarChart.update();
	});
	$('#legend4').click(function() {
		if(myRadarChart.datasets[4].strokeColor == green+"1)"){
			myRadarChart.datasets[0].strokeColor = tea+"0.5)";
			myRadarChart.datasets[1].strokeColor = blue+"0.5)";
			myRadarChart.datasets[2].strokeColor = red+"0.5)";
			myRadarChart.datasets[3].strokeColor = black+"0.5)";
			myRadarChart.datasets[4].strokeColor = green+"0.5)";
			myRadarChart.datasets[5].strokeColor = purple+"0.5)";
			document.getElementById('cloudDesc').innerHTML = "";
		} else {
			myRadarChart.datasets[0].strokeColor = tea+"0.2)";
			myRadarChart.datasets[1].strokeColor = blue+"0.2)";
			myRadarChart.datasets[2].strokeColor = red+"0.2)";
			myRadarChart.datasets[3].strokeColor = black+"0.2)";
			myRadarChart.datasets[4].strokeColor = green+"1)";
			myRadarChart.datasets[5].strokeColor = purple+"0.2)";
			displayCloudStats(4);
		}
		myRadarChart.update();
	});
	$('#legend5').click(function() {
		if(myRadarChart.datasets[5].strokeColor == purple+"1)"){
			myRadarChart.datasets[0].strokeColor = tea+"0.5)";
			myRadarChart.datasets[1].strokeColor = blue+"0.5)";
			myRadarChart.datasets[2].strokeColor = red+"0.5)";
			myRadarChart.datasets[3].strokeColor = black+"0.5)";
			myRadarChart.datasets[4].strokeColor = green+"0.5)";
			myRadarChart.datasets[5].strokeColor = purple+"0.5)";
			document.getElementById('cloudDesc').innerHTML = "";
		} else {
			myRadarChart.datasets[0].strokeColor = tea+"0.2)";
			myRadarChart.datasets[1].strokeColor = blue+"0.2)";
			myRadarChart.datasets[2].strokeColor = red+"0.2)";
			myRadarChart.datasets[3].strokeColor = black+"0.2)";
			myRadarChart.datasets[4].strokeColor = green+"0.2)";
			myRadarChart.datasets[5].strokeColor = purple+"1)";
			displayCloudStats(5);
		}
		myRadarChart.update();
	});
	$('#SCBack').click(function() {
		window.location = "NewExisting.html"
	});
	
	function displayCloudStats(num){
		var cloudText = "<p>Here are the performance of "+myRadarChart.datasets[num].label+": </p><p>";
		var total = 0;
		for(var i in myRadarChart.datasets[num].points){
			cloudText+=myRadarChart.datasets[num].points[i].label+": "+myRadarChart.datasets[num].points[i].value+" <br>";
			total += myRadarChart.datasets[num].points[i].value
		}
		cloudText+="</p><p>Total Score: "+total+". Average: "+total/myRadarChart.datasets[num].points.length+". </p>";
		document.getElementById('cloudDesc').innerHTML = cloudText;
	}
});
	