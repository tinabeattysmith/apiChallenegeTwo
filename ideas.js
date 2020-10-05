let baseurl = 'https://api.airvisual.com/v2/';
let city = "Indianapolis";
let state = "Indiana";
let country = "USA";
let key = '88685f1b-f5be-478c-a063-f6ef94dfad42';
//cities endpoiont
let url = `${baseurl}city?city=${city}&state=${state}&country=${country}&key=${key}`
//console.log(url)

//declaring variables
let weather;
let timeDate;
let FahrTemp;
let directions;
let wSpeed;
let wDirection;

//targets the DOM element
let body = document.querySelector("body");


// add EventListener
body.addEventListener("load", fetchResults);


//get api information
function fetchResults(e) {

	fetch(url)
		.then(function (result) {
			return result.json();
		})
		.then(function (json) {
			//console.log("JSON: ", json);
			getWeather(json)
		});
	};  // fetch results

	function getWeather(json) {
		weather = json.data.current.weather;
		//console.log(weather);
			
		//Destructure response to get information
		let {"ts": timestamp, "tp":temperature, "hu":humidity, "ws":windspeed, "wd":winddirection,"ic":icon}
		= weather
 
			// console.log(temperature);
			// console.log(timestamp);
			// console.log(humidity);
			// console.log(windspeed);
			// console.log(winddirection);
			// console.log(icon);
		
		// convert timestamp to time/date
		timeDate = new Date(timestamp);
		//console.log(timeDate);	

		// convert celcius to fahrenheit
		function cToF(temperature) 
		{ 
			FahrTemp = [Math.round(temperature * 9 / 5 + 32)];
			//console.log(FahrTemp);
		}
		cToF(temperature) 

		function wSpeed(windspeed) 
		{ 
			wSpeed = [Math.round(windspeed /  0.44704)];
			//console.log(wSpeed);
		}
		wSpeed(windspeed) 

		//converts winddirection angle to direction
		function getCardinalDirection(winddirection) {
			directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
			wDirection = (directions[Math.round(winddirection / 45) % 8]);	
		}
		getCardinalDirection(winddirection)

		//display response in DOM	
		let weatherdisplay = document.getElementById('currentWeather').innerHTML=`The current weather in ${city}, ${state}`		
		let displayTime=document.getElementById('currentTime').innerHTML=`Time: ${timeDate}`;
		let displayTemp = document.getElementById('currentTemp').innerHTML=`Temperature: ${temperature}°C / ${FahrTemp}°F`;
		let displayHumidity = document.getElementById('currentHumidity').innerHTML=`Humidity: ${humidity}%`;
		let displayWindspeed = document.getElementById('currentWindSpeed').innerHTML=`Wind Speed: ${wSpeed} mph`;
		let displayWinddirection = document.getElementById('currentWindDir').innerHTML=`Wind Direction: ${wDirection}`;
		let displayicon = document.getElementById('apiIcon');
	
		//display weather icon based upon results
		if(icon == '01d'){
				displayicon.src = "./assets/apiImages/01d.png"
				displayicon.alt = "Sunny day"

			} else if(icon == '01n'){
				displayicon.src = "./assets/apiImages/01n.png"
				displayicon.alt = "Clear night"

			} 	else if(icon =='02d'){
				displayicon.src = "./assets/apiImages/02d.png"
				displayicon.alt = "Partly sunny day"

			} 	else if(icon == '02n'){
				displayicon.src = "./assets/apiImages/02n.png"
				displayicon.alt = "Partly cloudy night"

			} 	else if(icon == '03d'){
				displayicon.src = "./assets/apiImages/03d.png"
				displayicon.alt = "Partly cloudy day"

			} 	else if(icon == '03n'){
				displayicon.src = "./assets/apiImages/03d.png" //03n is missing on api site
				displayicon.alt = "Cloudy night"
				
			} 	else if(icon == '04d'){
				displayicon.src = "./assets/apiImages/04d.png"
				displayicon.alt = "Cloudy day"
			
			}   else if(icon == '09d'){
				displayicon.src = "./assets/apiImages/09d.png"
				displayicon.alt = "Rainy day"

			}	else if(icon == '10d'){
				displayicon.src = "./assets/apiImages/10d.png"
				displayicon.alt = "Chance of rain today"

			}	else if(icon == '10n'){
				displayicon.src = "./assets/apiImages/10n.png"
				displayicon.alt = "Chance of rain tonight"

			}	else {console.log=("no results")
			}; //ends ifelse statment
	
		//display what bottom to wear
		let whatBottom = document.getElementById("bottoms");
			if (FahrTemp > '70'){
				whatBottom.src = "./assets/shorts.png"
				whatBottom.alt = "PinkShorts"
			} 	else if (FahrTemp <'70') {
					whatBottom.src = "./assets/jeans.png"
					whatBottom.alt = "Jeans"	
			}
		
		//display what top to wear	
		let whatShirt = document.getElementById("tops");
			if (FahrTemp > '70'){
				whatShirt.src = "./assets/tshirt.png"
				whatShirt.alt = "T-shirt"
			}	else if (FahrTemp => "70" && FahrTemp >'50'){
				whatShirt.src = "./assets/long-sleeve-tops.png"
				whatShirt.alt = "LongSleeveTop"		
			}	else if (FahrTemp < '49'){
					whatShirt.src = "./assets/greenSweater.png"
					whatShirt.alt = "Sweater"
			}

		//display what outer wear to wear	
		let whatOuter = document.getElementById("outerwear");
			if (FahrTemp < '65'){
				whatOuter.src = "./assets/jacket.png"
				whatOuter.alt = "LightJacket"
			} else if (FahrTemp > "65"  && FahrTemp < '72') {
				whatOuter.src = "./assets/sweatshirt.jpg"
				whatOuter.alt = "sweatshirt"
			} else if (FahrTemp >= "72") {
				whatOuter.src = "./assets/sunscreen.png"
				whatOuter.alt = "sunscren"
			}

			//display what accessories to wear
			let accessories = document.getElementById("accessories");
			if (icon == "01d" || icon == "02d"){
				accessories.src = "./assets/sunglasses.png"
				accessories.alt = "Sunglasses"
			} else if (icon == "09d" || icon == "10d"){
				accessories.src = "./assets/outerWearUmbrella.png"
				accessories.alt = "Umbrella"
			} else if (icon != "" && FahrTemp < "30"){
			accessories.src = "./assets/hatglovescarf.jpg"
			accessories.alt = "hatGloveScarf"
		}
	}; //ends getWeather


