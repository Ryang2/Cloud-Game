var gameName = "";
var gameDescription = "";
var QAArray = [];
var GameID;

angular.module('GameApp', {}) 
.controller('dataController', function($scope, $sce) {
	//$scope.filteredGames = gamesData;
    $scope.filteredGames = [
                            {
                            	id : 0,
                            	name : "cloudProj",
        						description : "cloud watching project",
        						completed : "yes"
                             },
                             {
                            	 id : 1,
                             	name : "animalProj",
         						description : "animal study project",
         						completed : "no"
                              },
                              {
                            	  id : 2,
                            	name : "SAP",
        						description : "SAP integration",
        						completed : "yes"
                             },
                             {
                            	 id : 3,
                            	name : "cloudProj",
        						description : "cloud watching project",
        						completed : "yes"
                             },
                             {
                            	 id : 4,
                            	name : "modernizationProj",
        						description : "on-going modernization",
        						completed : "no"
                             },
                             {
                            	 id : 5,
                            	name : "internProj",
        						description : "project for interns",
        						completed : "yes"
                             },
                             {
                            	 id : 6,
                            	name : "game",
        						description : "game design project",
        						completed : "yes"
                             },
                             {
                            	 id : 7,
                            	name : "newproj",
        						description : "",
        						completed : "no"
                             }];
    $scope.sortCol = 'rank';
    $scope.sortReverse = false;
    //$scope.$apply();
    $scope.sortBy = function(colName) { 
        if ($scope.sortCol == colName) {
            $scope.sortReverse = !$scope.sortReverse;
        } else {
            $scope.sortReverse = false;
        }
        $scope.sortCol = colName;
    }
    $scope.selectGame = function(gameID) { 
        console.log(gameID);
        GameID = gameID;
        /*var gameInfo = {
        		function : ??,
				LanID: user,
				GameID: gameID
		};
        $.post("/game1.1/gameController", gameInfo, function(list) {
		 	$.each(list, function(index, data) {
				// Make an array that not only has the questions, but clouds, and user data
			});
			prepGame(); //Or some sort of function that loads in the data
			$("#NQA").css("display", "none");
			$("#game").css("display", "");
		}*/
    }
});

$(document).ready(function(){
	setActiveStyleSheet("NE");
	$('#newGame').click(function() {
		$("#NorE").css("display", "none");
		$("#NName").css("display", "");
	});
	$('#existingGame').click(function() {
		$("#NorE").css("display", "none");
		$("#EChoose").css("display", "");
	});
	
	$('#NNameSumbit').click(function() {
		gameName = document.getElementById('gameName').value;
		gameDescription = document.getElementById('gameDes').value;
		if(gameName != null && gameName.replace(/\s/g, "") != ""){
			setActiveStyleSheet('QA');
			$("#titlePic").css("display", "none");
			$("#NName").css("display", "none");
			$("#NQA").css("display", "");
			console.log(gameName+" "+gameDescription);
		} else {
			alert("Please give your project a meaningful name.");
		}
	});
	$('#NBack').click(function() {
		$("#NName").css("display", "none");
		$("#NorE").css("display", "");
	});
	
	$('div[id^=QA]').click(function() {
		var index = QAArray.indexOf($(this).find('h2:eq(0)').text())
		if(index > -1){
			this.style.background="white";
			QAArray.splice(index, 1)
		} else {
			this.style.background="gray";
			QAArray.push($(this).find('h2:eq(0)').text());
		}
		console.log(QAArray);
	});
	$('#NQASubmit').click(function() {
		if(QAArray.length == 0){
			alert("Please select at least one quality attribute before beginning the game.");
		} else {
			/*var gameInfo = {
	    		function : ??,
				LanID: user,
				GameName: gameName,
				GameDescription: gameDescription,
				QAArray : QAArray
			};
		    $.post("/game1.1/gameController", gameInfo, function(list) {
		    	GameID = list[0].GameID;
			 	$.each(list, function(index, data) {
					// Make an array that organizes the questions
				});
				prepGame(); // Which should load in the questions data! 
				$("#NQA").css("display", "none");
				$("#game").css("display", "");
			}*/
			prepGame(); // TODO: remove since it's already in above
			$("#NQA").css("display", "none");
			$("#game").css("display", "");
		}
	});
	$('#NQABack').click(function(){
		setActiveStyleSheet("NE");
		$("#titlePic").css("display", "");
		$("#NQA").css("display", "none");
		$("#NName").css("display", "");
	});
	
	$('#ECBack').click(function() {
		$("#EChoose").css("display", "none");
		$("#NorE").css("display", "");
	});
});