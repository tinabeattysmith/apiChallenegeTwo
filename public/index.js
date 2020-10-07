let baseurl = 'https://api.airvisual.com/v2/';
//let city = "Indianapolis";
//let state = "Indiana";
let country = "USA";
let key = '88685f1b-f5be-478c-a063-f6ef94dfad42';
//cities endpoiont
//let url = `${baseurl}city?city=${city}&state=${state}&country=${country}&key=${key}`
//console.log(url)

//declaring variables
let weather;
let timeDate;
let FahrTemp;
let directions;
let wSpeed;
let wDirection;
let urlState;
let selectedState;
let urlCity;
let selectedCity;

//targets the DOM element
//let body = document.querySelector("body");
let state = document.getElementById("states");
let cityList = document.getElementById("cities");
let btnSubmit = document.getElementById("submit");

function changeState() {
    selectedState = document.getElementById("states").value; 
    urlState = `${baseurl}cities?state=${selectedState}&country=${country}&key=${key}`
}// end changeState

// add EventListener
//body.addEventListener("load", fetchResults);
state.addEventListener("change", fetchResults);

//get cities for selected state from api information
function fetchResults(e) {
	fetch(urlState)
		.then(function (result) {
			return result.json();
		})
		.then(function (json) {
			//console.log("JSON: ", json);
			getCities(json)
		});
	};  // end fetchResults

function getCities(json) {
	cities = json.data;
		//console.log(cities);
		const [{"city" : city, }] = cities
		//console.log(cityName)
		for (let i = 0; i < cities.length; i++) { 
		let current = cities[i]  
		console.log(current.city)
		let option = document.createElement("option")
			option.value = current.city
			option.innerHTML = current.city
			cityList.add(option)
		} // end cities for loop
}// end get cities

//when value in city drop down changes, assembleCityUrl will trigger
cityList.addEventListener("change", assembleCityUrl);   

// set city variable and create url to pull current weather for selected city/state
function assembleCityUrl() {
	selectedCity = document.getElementById("cities").value; 
	urlCity = `${baseurl}city?city=${selectedCity}&state=${selectedState}&country=${country}&key=${key}`
};  // end assembleCityUrl  


//when button clicked, fetchLocalWeather will trigger
btnSubmit.addEventListener('click', fetchLocalWeather);     

//get weather for selected state/city from api
function fetchLocalWeather(e) {
	assembleCityUrl(); 
	console.log(urlCity)
	fetch(urlCity)
		.then(function (result) {
			return result.json();
		})
		.then(function (json) {
			console.log("JSON: ", json);
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
		let weatherdisplay = document.getElementById('currentWeather').innerHTML=`The current weather in ${selectedCity}, ${selectedState}`		
		let displayTime=document.getElementById('currentTime').innerHTML=`Time: ${timeDate}`;
		let displayTemp = document.getElementById('currentTemp').innerHTML=`Temperature: ${temperature}°C / ${FahrTemp}°F`;
		let displayHumidity = document.getElementById('currentHumidity').innerHTML=`Humidity: ${humidity}%`;
		let displayWindspeed = document.getElementById('currentWindSpeed').innerHTML=`Wind Speed: ${wSpeed} mph`;
		let displayWinddirection = document.getElementById('currentWindDir').innerHTML=`Wind Direction: ${wDirection}`;
		let displayicon = document.getElementById('apiIcon');
	
		//display weather icon based upon results
		if(icon == '01d'){
				displayicon.src = "./assets/01d.png"
				displayicon.alt = "Sunny day"

			} else if(icon == '01n'){
				displayicon.src = "./assets/01n.png"
				displayicon.alt = "Clear night"

			} 	else if(icon =='02d'){
				displayicon.src = "./assets/02d.png"
				displayicon.alt = "Partly sunny day"

			} 	else if(icon == '02n'){
				displayicon.src = "./assets/02n.png"
				displayicon.alt = "Partly cloudy night"

			} 	else if(icon == '03d'){
				displayicon.src = "./assets/03d.png"
				displayicon.alt = "Partly cloudy day"

			} 	else if(icon == '03n'){
				displayicon.src = "./assets/03d.png" //03n is missing on api site
				displayicon.alt = "Cloudy night"
				
			} 	else if(icon == '04d'){
				displayicon.src = "./assets/04d.png"
				displayicon.alt = "Cloudy day"
			
			}	else if(icon == '04n'){
				displayicon.src = "./assets/03d.png" //03n and 04n are missing on api site
				displayicon.alt = "Cloudy night" 

			}	else if(icon == '09d'){
				displayicon.src = "./assets/09d.png"
				displayicon.alt = "Rainy day"

			}	else if(icon == '10d'){
				displayicon.src = "./assets/10d.png"
				displayicon.alt = "Chance of rain today"

			}	else if(icon == '10n'){
				displayicon.src = "./assets/10n.png"
				displayicon.alt = "Chance of rain"
			
			}	else if(icon == '11d'){
				displayicon.src= "./assets/11d.png"
				displayicon.alt = "Thunderstorm"
			
			} 	else if(icon == '13d'){
				displayicon.src= "./assets/13d.png"
				displayicon.alt = "Snow"
			
			}   else if(icon == '50d'){
				displayicon.src= "./assets/50d.png"
				displayicon.alt = "Mist"			

			}	else {console.log=("no results")
			}; //ends ifelse statment
	
		//display what bottom to wear
		let whatBottom = document.getElementById("bottoms");
		if	(icon =="01n" || icon == "02n" || icon == "03n"|| icon == "10n" ){
			whatBottom.src = "./assets/moon.png"
			whatBottom.alt = "moon"} 
			else if (FahrTemp <'72') {
			whatBottom.src = "./assets/jeans.png"
			whatBottom.alt = "Jeans"	
		} 	else if(FahrTemp >= '72'){
			whatBottom.src = "./assets/shorts.png"
			whatBottom.alt = "PinkShorts"
		}
		
		//display what top to wear
		let whatShirt = document.getElementById("tops");
		if (icon =="01n" || icon == "02n" || icon == "03n"|| icon == "10n" ){
			whatShirt.src = "./assets/moon.png"
			whatShirt.alt = "moon"}
			else if (FahrTemp > '70'){
			whatShirt.src = "./assets/tshirt.png"
			whatShirt.alt = "T-shirt"
		}	else if (FahrTemp <= "70" && FahrTemp >='45'){
			whatShirt.src = "./assets/long-sleeve-tops.png"
			whatShirt.alt = "LongSleeveTop"		
		}	else if (FahrTemp < '45'){
			whatShirt.src = "./assets/greenSweater.png"
			whatShirt.alt = "Sweater"
		}// End of whatShirt
				

		//display what outer wear to wear	
		let whatOuter = document.getElementById("outerwear");
		if(icon =="01n" || icon == "02n" || icon == "03n"|| icon == "10n" ){
		whatOuter.src = "./assets/moon.png"
		whatOuter.alt = "moon"
	}
		else if (FahrTemp < '65' && FahrTemp >='45'){
			whatOuter.src = "./assets/jacket.png"
			whatOuter.alt = "LightJacket"
		} else if (FahrTemp > "65"  && FahrTemp < '72') {
			whatOuter.src = "./assets/sweatshirt.png"
			whatOuter.alt = "sweatshirt"
		} else if (FahrTemp >= "72") {
			whatOuter.src = "./assets/sunscreen.png"
			whatOuter.alt = "sunscreen"
		}	else if(FahrTemp <='44') {
			whatOuter.src = "./assets/winterCoat.png"
			whatOuter.alt = "Winter Coat"
		}// end of whatOuter

		//display what accessories to wear
		let accessories = document.getElementById("accessories");
		if (icon == "01d" || icon == "02d"){
			accessories.src = "./assets/sunglasses.png"
			accessories.alt = "Sunglasses"
		} else if (icon == "09d" || icon == "10d" || icon=="50d"){
			accessories.src = "./assets/outerWearUmbrella.png"
			accessories.alt = "Umbrella"
		} else if(icon == '03d' || icon== '04d'){
			accessories.src = "./assets/ballcaps.png"
			accessories.alt = "Ball Cap"
		} else if(icon =="01n" || icon == "02n" || icon == "03n" || icon == "04n" || icon == "10n" ){
			accessories.src = "./assets/moon.png"
			accessories.alt = "moon"
		} else if (icon != "" && FahrTemp <= "35"){
			accessories.src = "./assets/hatglovescarf.png"
			accessories.alt = "hatGloveScarf"}
			

	}; //ends getWeather


