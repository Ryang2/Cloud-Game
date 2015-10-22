var isPressed = false;

$(document).ready(function(){
	$('#save').click(function() {
		//$("#save").prop("disabled",true);
		if(!isPressed){
			isPressed = true;
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