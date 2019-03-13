var snapDict = {};

var interval = setTimeout(lookForSnaps, 3000);
const serverAddress = 'http://snap-env.p96p3i32sv.us-east-2.elasticbeanstalk.com';

console.log("Started!")

function lookForSnaps(){


	const Http = new XMLHttpRequest();
	const url = serverAddress+'/getsnap/test';
	Http.open("GET", url);
	Http.send();
	Http.onreadystatechange=(e)=>{
		JSON_response = Http.responseText
		try{
			res = JSON.parse(JSON_response)
			console.log(res, res.name)
			processSnap(res)
		}
		catch(error){
			console.log("Cant parse "+error)
		}
	}




	interval = setTimeout(lookForSnaps, 7000);
}


function processSnap(res){


	if (!(res.id in snapDict) && res.name != "none"){


	 	var notification = new Notification("Snap Received!",{
	 		body : 'From: '+res.name+ ", Link: "+res.link,
	 		icon : 'logo.png'
	 	})

	 	notification.onclick = function(event){
	 		event.preventDefault();
	 		window.open(res.link, '_blank');
	 		notification.close()
	 	}

	  	snapDict[res.id] = res


	}

}