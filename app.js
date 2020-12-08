var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=oR4u5XRgpAh9ClhFejJOWQnB_roAGMkNTylQfI-W5RI";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
	url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

let pdata = "";
let pname = "";
let pimgurl = "";
let pi = 0;
// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
	// TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
			pdata = JSON.parse(request.response).data;
			pname = pdata.map(plant => plant.common_name);
			pimgurl = pdata.map(plant => plant.image_url);
			pi = 0;
    })
);

function addMore() {
	let pWait = document.createElement("p");
	if (pdata){
		pWait.innerHTML = "";
		let div = document.createElement("div");
		let p = document.createElement("p");
		p.innerHTML = pname[pi];
		let img = document.createElement("img");
		img.setAttribute("src", pimgurl[pi]);
		pi += 1;
		if (pi >= 20){
				pi = 0;
		}
		document.getElementById("result").appendChild(div);
		div.setAttribute("class", "item");
		div.appendChild(p);
		div.appendChild(img);
	} else {
		pWait.innerHTML = "Trying to get some plants from trefle.io...when in doubt, click the button again.";
	}
	if (document.getElementById("wait").firstChild) {
		document.getElementById("wait").replaceChild(pWait, document.getElementById("wait").firstChild);
	} else {
		document.getElementById("wait").appendChild(pWait);
	}
}
