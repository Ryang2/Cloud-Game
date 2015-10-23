var isPressed = false;
var gamesData = [];
var user;

$(document).ready(function(){
	$('#save').click(function() {
		//$("#save").prop("disabled",true);
		if(!isPressed){
			isPressed = true;
			var credentials = {
					//function : ??,
					username: document.getElementById('LANID').value,
					password: document.getElementById('pwd').value
			};
			/*$.post("/game1.1/gameController", credentials, function(list) {
			 	$.each(list, function(index, data) {
					gamesData.push(new gameInstance(data.GameID, data.GameName, data.GameDescription, data.IsGameCompleted));
				});
				user = credentials.username;
				console.log(gamesData);
			}*/
			console.log(credentials.username+" is logging in with password: "+credentials.password);
			window.location = "NewExisting.html"
			isPressed = false; //$("#main").css("display", "block");
		}
	});
	$('#LANID').keypress(function(e){
		if(e.keyCode==13){
			//$("#save").prop("disabled",true);
			isPressed = true;
			$('#save').click();
			return false;
		}
	});
	$('#pwd').keypress(function(e){
		if(e.keyCode==13){
			//$("#save").prop("disabled",true);
			isPressed = true;
			$('#save').click();
			return false;
		}
	});
});

function gameInstance(id, name, description, done){
	this.GameID = id;
	this.GameName = name;
	this.GameDescription = description;
	this.IsGameCompleted = done;
}