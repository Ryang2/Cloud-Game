var isPressed = false;
<<<<<<< HEAD
var gamesData = [];
var user;
var tempData;
=======
>>>>>>> 32488006180bc92f045b0f8ccd8e78d6de5842fa

$(document).ready(function(){
	$('#save').click(function() {
		//$("#save").prop("disabled",true);
		if(!isPressed){
			isPressed = true;
<<<<<<< HEAD
			var input = this;
	        input.disabled = true;
			var credentials = {
					fn : 1,
					LANID: document.getElementById('LANID').value,
					pwd: document.getElementById('pwd').value
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
						user = credentials.LANID;
						tempData = credentials.pwd;
						//console.log(gamesData);
						//console.log(user);
						//console.log(list[0].coins);
						sessionStorage.setItem('user', user);
						sessionStorage.setItem('tempData', tempData);
			    		sessionStorage.setItem('coins', list[0].coins);
			    		//console.log(gamesData);
			    		//console.log(JSON.stringify(gamesData));
			    		sessionStorage.setItem('games', JSON.stringify(gamesData));
			    		window.location = "NewExisting.html";
					} else {
						alert("Wrong username/password combination.");
						input.disabled = false;
						isPressed = false; //$("#main").css("display", "block");
					}
				} else {
					alert("The database is busy, try again later.");
					input.disabled = false;
					isPressed = false; //$("#main").css("display", "block");
				}
			});
			//console.log(credentials.LANID+" is logging in with password: "+credentials.pwd);
		}
	});
	$('#LANID').keypress(function(e){
		if(!isPressed && e.keyCode==13){
=======
			var credentials = {
					username: document.getElementById('LANID').value,
					password: document.getElementById('pwd').value
			};
			/*$.post("/com.costco.test.counter/auth", credentials, function(data) {
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
>>>>>>> 32488006180bc92f045b0f8ccd8e78d6de5842fa
			$('#save').click();
			return false;
		}
	});
	$('#pwd').keypress(function(e){
<<<<<<< HEAD
		if(!isPressed && e.keyCode==13){
=======
		if(e.keyCode==13){
			//$("#save").prop("disabled",true);
			isPressed = true;
>>>>>>> 32488006180bc92f045b0f8ccd8e78d6de5842fa
			$('#save').click();
			return false;
		}
	});
<<<<<<< HEAD
});
function gameInstance(id, name, description, done){
	this.id = id;
	this.name = name;
	this.des = description;
	this.done = done;
	if(this.done == 1){
		this.completed = "Yes";
	} else {
		this.completed = "No";
	}
}
=======
});
>>>>>>> 32488006180bc92f045b0f8ccd8e78d6de5842fa
