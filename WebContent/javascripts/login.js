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
				sessionStorage.setItem('user', user);
	    		sessionStorage.setItem('coins', list[0].Coins);
	    		sessionStorage.setItem('games', JSON.stringify(gamesData));
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
	this.id = id;
	this.name = name;
	this.description = description;
	this.done = done;
	if(this.done == 1){
		this.completed = "Yes";
	} else {
		this.completed = "No";
	}
}