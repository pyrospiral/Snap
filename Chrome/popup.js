let send = document.getElementById('send');
let textbox = document.getElementById('text');



send.onclick = function(element) {
	
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      	textbox.innerHTML = tabs[0].url;

    	var options = {
		  type: "basic",
		  title: "Snapped!",
		  message: "Link: "+tabs[0].url,
		  iconUrl: "logo.png"
		}

		id = "1";

      	chrome.notifications.create(id, options);

    });

  };