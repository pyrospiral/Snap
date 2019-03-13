let send = document.getElementById('send');
let textbox = document.getElementById('text');

const username = "kush";
const serverAddress = 'http://snap-env.p96p3i32sv.us-east-2.elasticbeanstalk.com';

send.onclick = function(element) {
	
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      	textbox.innerHTML = "Snapped!"+tabs[0].url;

		const Http = new XMLHttpRequest();
		const url = serverAddress+'/sendsnap/'+username+"+snap+"+encodeURI(tabs[0].url);
		Http.open("GET", url);
		Http.send();
		Http.onreadystatechange=(e)=>{
			respose = Http.responseText
			console.log(respose)
		}



    });

  };