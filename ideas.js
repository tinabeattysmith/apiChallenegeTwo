const states = [{"state":"Alabama"},{"state":"Alaska"},{"state":"Arizona"},{"state":"Arkansas"},{"state":"California"},{"state":"Colorado"},{"state":"Connecticut"},{"state":"Delaware"},{"state":"Florida"},{"state":"Georgia"},{"state":"Hawaii"},{"state":"Idaho"},{"state":"Illinois"},{"state":"Indiana"},{"state":"Iowa"},{"state":"Kansas"},{"state":"Kentucky"},{"state":"Louisiana"},{"state":"Maine"},{"state":"Maryland"},{"state":"Massachusetts"},{"state":"Michigan"},{"state":"Minnesota"},{"state":"Mississippi"},{"state":"Missouri"},{"state":"Montana"},{"state":"Nebraska"},{"state":"Nevada"},{"state":"New Hampshire"},{"state":"New Jersey"},{"state":"New Mexico"},{"state":"New York"},{"state":"North Carolina"},{"state":"North Dakota"},{"state":"Ohio"},{"state":"Oklahoma"},{"state":"Oregon"},{"state":"Pennsylvania"},{"state":"Rhode Island"},{"state":"South Carolina"},{"state":"South Dakota"},{"state":"Tennessee"},{"state":"Texas"},{"state":"Utah"},{"state":"Vermont"},{"state":"Virginia"},{"state":"Washington"},{"state":"Washington, D.C."},{"state":"West Virginia"},{"state":"Wisconsin"},{"state":"Wyoming"}];

const city = [{"city":"Anderson"},{"city":"Beech Grove"},{"city":"Bloomington"},{"city":"Broad Ripple"},{"city":"Brownsburg"},{"city":"Burns Harbor"},{"city":"Columbus"},{"city":"Dale"},{"city":"Elkhart"},{"city":"Evansville"},{"city":"Ferdinand"},{"city":"Fishers"},{"city":"Fort Wayne"},{"city":"Gary"},{"city":"Granger"},{"city":"Greencastle"},{"city":"Hammond"},{"city":"Harlan"},{"city":"Huntingburg"},{"city":"Indianapolis"},{"city":"Jasper"},{"city":"Kokomo"},{"city":"Lafayette"},{"city":"Lawrence"},{"city":"Mount Vernon"},{"city":"North Terre Haute"},{"city":"Ogden Dunes"},{"city":"Portage"},{"city":"Santa Claus"},{"city":"South Bend"},{"city":"Terre Haute"},{"city":"Warren Park"}];

const currentWeather = {"city":"Indianapolis","state":"Indiana","country":"USA","location":{"type":"Point","coordinates":[-86.2147,39.7889]},"current":{"weather":{"ts":"2020-10-03T00:00:00.000Z","tp":12,"pr":1021,"hu":50,"ws":2.1,"wd":350,"ic":"04n"},"pollution":{"ts":"2020-10-03T00:00:00.000Z","aqius":12,"mainus":"p2","aqicn":4,"maincn":"p2"}}}

//targets the DOM element
let dropDownState = document.getElementById("dropdownStateButton");
let dropDownCity = document.getElementById("dropdownCityButton");
let btnSubmit = document.getElementById("submit");

//sets length of dropdown to 0
dropDownState.length=0;
dropDownCity.length=0;

//add eventlisteners and calls the functions to complete actions
dropDownState.addEventListener("click", popState);
dropDownCity.addEventListener("click", popCity);
btnSubmit.addEventListener("click", submitStateCity);

function popState() {
    let optionState;
    //populates State dropdown
    for (let i = 0; i < states.length; i++) {
      optionState = document.createElement('option');
      optionState.text = states[i].state;
      dropDownState.appendChild(optionState);}
};

function popCity() {
    //populates City dropdown
    //? Research how to consider state in order to pop city. Will this require a second fetch?
    let optionCity;
    for (let i = 0; i < city.length; i++) {
      optionCity = document.createElement('option');
      optionCity.text = city[i].city;
      dropDownCity.appendChild(optionCity);}
};

function submitStateCity() {
// get State/ City


}

//! sample of fetch chain.  Will need to figure this out becuase I think this will be needed since the city fetch requires state and current weather requires both city and state.
let State;
let City;

// Call the API
fetch('https://jsonplaceholder.typicode.com/posts/5').then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {

	// Store the post data to a variable
	post = data;

	// Fetch another API
	return fetch('https://jsonplaceholder.typicode.com/users/' + data.userId);

}).then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (userData) {
	console.log(post, userData);
}).catch(function (error) {
	console.warn(error);
});