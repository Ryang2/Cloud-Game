var gameName = "";
var gameDescription = "";
var QAArray = [];
<<<<<<< HEAD
var GameID;
var bet = -1; // index of bets array
var modelBet = -1; // index of cloudList, the cloud user bets on
var playerCoins = 100; // Coins kept track in the game
var user;
var playerStartingCoins = 100;
var loadingGame = false; 
var tempData;

angular.module('GameApp', {}) 
.controller('dataController', function($scope, $sce) {
    /*var tempJSON = $.parseJSON(sessionStorage.getItem('games'));
    var tempArray = []
    for(var i = 0; i < tempJSON.length; i++){
    	console.log(tempJSON[i]);
    	tempArray.push(new gameInstance(tempJSON[i].id, tempJSON[i].name, tempJSON[i].des, tempJSON[i].done));
    }
	$scope.filteredGames = tempArray;*/
	$scope.filteredGames = $.parseJSON(sessionStorage.getItem('games'));
	sessionStorage.setItem('games', null);
    console.log($scope.filteredGames);
    $scope.sortCol = 'rank';
    $scope.sortReverse = false;
    //$scope.$apply();
    $scope.loadGamesData = function() {
        if ($scope.filteredGames == null) {
        	if(user == null || tempData == null){
        		window.location = "login.html";
        	}
        	var gamesData = [];
        	var credentials = {
					fn : 1,
					LANID: user,
					pwd: tempData
			};
			$.post("/game1.1/gameController", credentials, function(list) {
				console.log(list);
				if(list != null){
					if(list.length > 0){
					 	$.each(list, function(index, data) {
					 		if(data.gameID != null){
					 			gamesData.push(new gameInstance(data.gameID, data.gameName, data.gameDesc, data.gameCompleted));
					 		}
						});
					 	$scope.filteredGames = gamesData;
					 	$scope.$apply();
					} else {
						window.location = "login.html";
					}
				} else {
					alert("Unable to load your games. The database is busy.");
				}
			});
        }
    }
    $scope.loadGamesData();
=======

angular.module('GameApp', {}) 
.controller('dataController', function($scope, $sce) {
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
>>>>>>> 32488006180bc92f045b0f8ccd8e78d6de5842fa
    $scope.sortBy = function(colName) { 
        if ($scope.sortCol == colName) {
            $scope.sortReverse = !$scope.sortReverse;
        } else {
            $scope.sortReverse = false;
        }
        $scope.sortCol = colName;
<<<<<<< HEAD
    }
    $scope.isLoading = function() {
    	 if(loadingGame) {return true;}return false;
    };
    $scope.selectGame = function(gameID) { 
        //console.log(gameID);
        loadingGame = true;
        var gameInfo = {
        		fn : 4,
        		LANID: user,
        		gameID: gameID
		};
        $.post("/game1.1/gameController", gameInfo, function(list) {
        	if(list != null){
        		console.log(list);
	        	var indCloud = {}, indQues = {}, indTips = {}, cloudData = [], quesData = [], tipsData = [];
			 	$.each(list, function(index, data) {
					// Make an array that not only has the questions, but clouds, and user data
					//ModelID, QualityAttributeID, cloudScore
					if(indCloud.hasOwnProperty(data.ModelID)){
						if(indCloud[data.ModelID].indexOf(data.QualityAttributeID) == -1){
							var ind = -1;for(var i = 0; i < cloudData.length; i++){ if(cloudData[i].ModelID == data.ModelID){ind = i; break;}}
							cloudData[ind].ModelAnswerValue.push(parseInt(data.cloudScore));
							indCloud[data.ModelID].push(data.QualityAttributeID);
						}
					} else {
						cloudData.push(new cloudInfo(parseInt(data.ModelID))); // TODO: sort this array into one where the scores are in an array (like below)
						cloudData[cloudData.length-1].ModelAnswerValue.push(parseInt(data.cloudScore));
						indCloud[data.ModelID] = [data.QualityAttributeID]
					}
					//QuestionID, theAnswer, UserNotes, QuestionAsked, QuestionValue, AnswerID, AnswerValue, ModelID, ModelAnswerValue, QualityAttributeName
					//quesInfo(id, title, qa, notes, asked)
					if(indQues.hasOwnProperty(data.QuestionID)){
						if(indQues[data.QuestionID].hasOwnProperty(data.AnswerID)){
							if(indQues[data.QuestionID][data.AnswerID].indexOf(data.ModelID) == -1){ // Add new ModelID
								var ind = -1;for(var i = 0; i < quesData.length; i++){ if(quesData[i].QuestionID == data.QuestionID){ind = i; break;}}
								quesData[ind].AnswerValue.push(parseInt(data.ModelAnswerValue));
								indQues[data.QuestionID][data.AnswerID].push(data.ModelID);
							}
						} else { // Add new answerID and ModelID
							var ind = -1;for(var i = 0; i < quesData.length; i++){ if(quesData[i].QuestionID == data.QuestionID){ind = i; break;}}
							quesData[ind].AnswerID.push(parseInt(data.AnswerID));
							quesData[ind].AnswerTitle.push(parseInt(data.AnswerValue));
							quesData[ind].AnswerValue.push(parseInt(data.ModelAnswerValue));
							indQues[data.QuestionID][data.AnswerID] = [data.ModelID];
						}
					} else {
						quesData.push(new quesInfo(parseInt(data.QuestionID), data.QuestionValue, data.QualityAttributeName, data.UserNotes, parseInt(data.QuestionAsked)));
						if(data.QuestionAsked = 1){quesData[quesData.length-1].choice = parseInt(data.theAnswer);}
						quesData[quesData.length-1].AnswerID.push(parseInt(data.AnswerID));
						quesData[quesData.length-1].AnswerTitle.push(parseInt(data.AnswerValue));
						quesData[quesData.length-1].AnswerValue.push(parseInt(data.ModelAnswerValue));
						indQues[data.QuestionID] = {};
						indQues[data.QuestionID][data.AnswerID] = [data.ModelID];
					}
					if(!indTips.hasOwnProperty(data.TipID)){
						console.log(data.TipID);
						tipsData.push(new tipInfo(parseInt(data.TipID), data.TipQA, data.TipName, data.TipDescription));
						indTips[data.TipID] = 1;
					}
				});
				GameID = gameID;
				gameName = list[0].GameName;
				modelBet = list[0].CloudModelID;
				bet = list[0].ModelBettingCoins;
				console.log(playerStartingCoins);
				playerCoins = list[0].netcoins;
				console.log(gameName);
				console.log(modelBet);
				console.log(bet);
				console.log(playerCoins);
				for(var i = 0; i < quesData.length; i++){
					if(QAArray.indexOf(""+(QAIDList.indexOf(quesData[i].QAName)+1)) == -1){QAArray.push(""+(QAIDList.indexOf(quesData[i].QAName)+1))}
				}
				console.log(quesData);
				console.log(cloudData);
				console.log(tipsData);
				console.log(QAArray);
				prepGame(quesData, tipsData, cloudData);
				setActiveStyleSheet('QA');
				$("#titlePic").css("display", "none");
				$("#EChoose").css("display", "none");
				$("#game").css("display", "");
				loadingGame = false;
        	} else {
        		alert("The database is busy, try again later.");
        		loadingGame = false;
        	}
        });
    }
    $('#NQASubmit').click(function() {
    	var input = this;
        input.disabled = true;
		if(QAArray.length == 0){
			alert("Please select at least one quality attribute before beginning the game.");
			input.disabled = false;
		} else {
			var QAString = "";
			for(var i = 0; i < QAArray.length; i++){QAString+=QAArray[i]+",";}
			var gameInfo = {
	    		fn : 2,
	    		LANID: user,
	    		gameName: gameName,
	    		gameDesc: gameDescription,
				QAArray : QAString
			};
		    $.post("/game1.1/gameController", gameInfo, function(list) {
		    	console.log(QAString);
				if(list != null){
					console.log(list);
			    	GameID = parseInt(list[0].GameID);
				 	var indQues = {}, indTips = {}, quesData = [], tipsData = [];
				 	$.each(list, function(index, data) {
						//QuestionID, QuestionValue, AnswerID, AnswerValue, ModelID, ModelAnswerValue, QualityAttributeName
						//quesInfo(id, title, qa, notes, asked)
						if(indQues.hasOwnProperty(data.QuestionID)){
							if(indQues[data.QuestionID].hasOwnProperty(data.AnswerID)){
								if(indQues[data.QuestionID][data.AnswerID].indexOf(data.ModelID) == -1){ // Add new ModelID
									var ind = -1;for(var i = 0; i < quesData.length; i++){ if(quesData[i].QuestionID == data.QuestionID){ind = i; break;}}
									quesData[ind].AnswerValue.push(data.ModelAnswerValue);
									indQues[data.QuestionID][data.AnswerID].push(data.ModelID);
								}
							} else { // Add new answerID and ModelID
								var ind = -1;for(var i = 0; i < quesData.length; i++){ if(quesData[i].QuestionID == data.QuestionID){ind = i; break;}}
								quesData[ind].AnswerID.push(data.AnswerID);
								quesData[ind].AnswerTitle.push(data.AnswerValue);
								quesData[ind].AnswerValue.push(data.ModelAnswerValue);
								indQues[data.QuestionID][data.AnswerID] = [data.ModelID];
							}
						} else {
							quesData.push(new quesInfo(data.QuestionID, data.QuestionValue, data.QualityAttributeName, "", 0));
							quesData[quesData.length-1].AnswerID.push(data.AnswerID);
							quesData[quesData.length-1].AnswerTitle.push(data.AnswerValue);
							quesData[quesData.length-1].AnswerValue.push(data.ModelAnswerValue);
							indQues[data.QuestionID] = {};
							indQues[data.QuestionID][data.AnswerID] = [data.ModelID];
						}
						if(!indTips.hasOwnProperty(data.TipID)){
							tipsData.push(new tipInfo(data.TipID, data.TipQA, data.TipName, data.TipDescription));
							indTips[data.TipID] = 1;
						}
					});
					modelBet = -1;
					bet = -1;
					playerCoins = 0;
					prepGame(quesData, tipsData, null);
					$("#NQA").css("display", "none");
					$("#game").css("display", "");
					console.log(quesData);
					console.log(tipsData);
					input.disabled = false;
				} else {
					alert("The database is busy, try again later.");
					input.disabled = false;
				}
			});
		}
	});
    $('#existingGame').click(function() {
		$("#NorE").css("display", "none");
		if($scope.filteredGames.length == 0){
			$("#table").css("display", "none");
			$("#noneFound").css("display", "");
		} else {
			$("#table").css("display", "");
			$("#noneFound").css("display", "none");
		}
		$("#EChoose").css("display", "");
	});
=======
        //$scope.$apply(); selectGame
    }
    $scope.selectGame = function(gameID) { 
        console.log(gameID);
    }
>>>>>>> 32488006180bc92f045b0f8ccd8e78d6de5842fa
});

$(document).ready(function(){
	setActiveStyleSheet("NE");
<<<<<<< HEAD
	user = sessionStorage.getItem('user');
	tempData = sessionStorage.getItem('tempData');
	console.log(user);
	$('#welcomeTitle').html("<h2>Welcome, "+user+"!</h2>");
	$("#welcomeTitle").css("display", "");
	playerStartingCoins = sessionStorage.getItem('coins');
	console.log(playerStartingCoins);
	if(playerStartingCoins == null){
		playerStartingCoins = 0;
		//console.log(playerStartingCoins);
	}
	//$scope.filteredGames = $.parseJSON(sessionStorage.getItem('games')); scope is not defined! make a function in controller that does this for you?
	//$scope.$apply();
	
=======
>>>>>>> 32488006180bc92f045b0f8ccd8e78d6de5842fa
	$('#newGame').click(function() {
		$("#NorE").css("display", "none");
		$("#NName").css("display", "");
	});
<<<<<<< HEAD
=======
	$('#existingGame').click(function() {
		$("#NorE").css("display", "none");
		$("#EChoose").css("display", "");
	});
	
>>>>>>> 32488006180bc92f045b0f8ccd8e78d6de5842fa
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
<<<<<<< HEAD
		var index = QAArray.indexOf($(this).attr('value'))
=======
		var index = QAArray.indexOf($(this).find('h2:eq(0)').text())
>>>>>>> 32488006180bc92f045b0f8ccd8e78d6de5842fa
		if(index > -1){
			this.style.background="white";
			QAArray.splice(index, 1)
		} else {
			this.style.background="gray";
<<<<<<< HEAD
			//QAArray.push($(this).find('h2:eq(0)').text());
			QAArray.push($(this).attr('value'));
		}
		console.log(QAArray);
	});
	
=======
			QAArray.push($(this).find('h2:eq(0)').text());
		}
		console.log(QAArray);
	});
	$('#NQASubmit').click(function() {
		if(QAArray.length == 0){
			alert("Please select at least one quality attribute before beginning the game.");
		} else {
			prepGame();
			$("#NQA").css("display", "none");
			$("#game").css("display", "");
		}
	});
>>>>>>> 32488006180bc92f045b0f8ccd8e78d6de5842fa
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
<<<<<<< HEAD
});
function cloudInfo(id){
	this.ModelID = id;
	this.ModelAnswerValue = [];
}
function quesInfo(id, title, qa, notes, asked){
	this.QuestionID = id;
	this.QuestionTitle = title;
	this.QAName = qa;
	this.choice = -1;
	this.AnswerID = [];
	this.AnswerTitle = []
	this.AnswerValue = [];
	this.UserNotes = notes;
	this.QuestionAsked = asked;
}
function tipInfo(id, qa, title, text){
	this.TipID = id;
	this.QA = qa;
	this.TipName = title;
	this.TipDescription = text;
}
function gameInstance(id, name, description, done){
	this.id = id;
	console.log(id);
	this.name = name;
	this.des = description;
	this.done = done;
	if(this.done == "1" || this.done == 1){
		this.completed = "Yes";
	} else {
		this.completed = "No";
	}
}
=======
});
>>>>>>> 32488006180bc92f045b0f8ccd8e78d6de5842fa
