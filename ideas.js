let url = 'https://api.airvisual.com/v2/city?city=Indianapolis&state=Indiana&country=USA&key=88685f1b-f5be-478c-a063-f6ef94dfad42';
//let City;

//targets the DOM element
//let dropDownState = document.getElementById("dropdownStateButton");
//let dropDownCity = document.getElementById("dropdownCityButton");
let btnSubmit = document.getElementById("submit");

//sets length of dropdown to 0
//dropDownState.length = 0;
//dropDownCity.length = 0;

//add eventlisteners and calls the functions to complete actions
//dropDownState.addEventListener('click', fetchResults);
//dropDownCity.addEventListener("click", popCity);
btnSubmit.addEventListener("click", fetchResults);

function fetchResults(e) {
	e.preventDefault();

	fetch(url)
		.then(function (result) {
			return result.json();
		})
		.then(function (json) {
			//console.log("JSON: ", json);
			getWeather(json)
		});

	function getWeather(json) {
		let weather = json.data.current.weather;
		console.log(weather);
		
		const {"ts": timestamp, "tp":temperature, "hu":humidity, "ws":windspeed, "wd":winddirection,"ic":icon}
		= weather
									 
console.log(temperature);
console.log(timestamp);
console.log(humidity);
console.log(windspeed);
console.log(winddirection);
console.log(icon);

			
	let displayTime=document.getElementById('currentTime').innerHTML=`Timestamp: ${timestamp}`;
	let displayTemp = document.getElementById('currentTemp').innerHTML=`Temperature: ${temperature}`;
	let displayHumidity = document.getElementById('currentHumidity').innerHTML=`Humidity: ${humidity}`;
	let displayWindspeed = document.getElementById('currentWindSpeed').innerHTML=`Wind Speed: ${windspeed}`;
	let displayWinddirection = document.getElementById('currentWindDir').innerHTML=`Wind Direction: ${winddirection}`;
	//let displayicon = document.getElementById('currentIcon');
}
}





	/*function popState(json) {
		let states = json.data;

		//populates State dropdown
		let optionState;
		for (let i = 0; i < states.length; i++) {
			optionState = document.createElement('option');
			optionState.text = states[i].state;
			optionState.id = states[i].state;
			dropDownState.appendChild(optionState);
			};
			
			//if Indiana, set selected = true
			/*if (optionState.text = 'Indiana') {
				let selectedState = document.getElementById('Indiana');
				selected.selectedIndex = 13;
			};*/
	
/*



function popCity() {
	//populates City dropdown
	//? Research how to consider state in order to pop city. Will this require a second fetch?
	let optionCity;
	for (let i = 0; i < city.length; i++) {
	  optionCity = document.createElement('option');
	  optionCity.text = city[i].city;
	  dropDownCity.appendChild(optionCity);}
};*/
