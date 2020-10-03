let url = 'http://api.airvisual.com/v2/states?country=usa&key=88685f1b-f5be-478c-a063-f6ef94dfad42';
let City;

//targets the DOM element
let dropDownState = document.getElementById("dropdownStateButton");
let dropDownCity = document.getElementById("dropdownCityButton");
let btnSubmit = document.getElementById("submit");

//sets length of dropdown to 0
dropDownState.length=0;
dropDownCity.length=0;

//add eventlisteners and calls the functions to complete actions
dropDownState.addEventListener('click', fetchResults);
//dropDownCity.addEventListener("click", popCity);
//btnSubmit.addEventListener("click", submitStateCity);

function fetchResults(e) {
    e.preventDefault();
 
     fetch(url)
        .then (function(result) {
            return result.json();
        })
        .then (function(json) {
            console.log("JSON: ", json);
            popState(json);
        });
    
function popState(json) {
	let states = json.data;
	console.log(states);
	 //populates State dropdown
    let optionState;   
    for (let i = 0; i < states.length; i++) {
      	optionState = document.createElement('option');
		optionState.text = states[i].state;
		dropDownState.appendChild(optionState);}


	};


/*function popCity() {
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
}*/
};
