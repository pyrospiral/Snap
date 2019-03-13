let send = document.getElementById('send');
let textbox = document.getElementById('text');

const username = "kush";
const serverAddress = 'http://127.0.0.1:5000';

send.onclick = function(element) {
	
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      	textbox.innerHTML = "Snapped!"+tabs[0].url;

  //   	var options = {
		//   type: "basic",
		//   title: "Snapped!",
		//   message: "Link: "+tabs[0].url,
		//   iconUrl: "logo.png"
		// }

		// id = "1";

  //     	chrome.notifications.create(id, options);


		const Http = new XMLHttpRequest();
		const url = serverAddress+'/sendsnap/'+username+"+snap+"+encodeURI(tabs[0].url);
		Http.open("GET", url);
		Http.send();
		Http.onreadystatechange=(e)=>{
			respose = Http.responseText
			console.log(respose)
		}


  	//  	var notification = new Notification("Snapped!",{
	 	// 	body : "Link: "+tabs[0].url,
	 	// 	icon : 'logo.png'
	 	// })



    });

  };