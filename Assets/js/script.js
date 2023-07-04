let startEl = document.querySelector("#start")
let q1El = document.querySelector("#q1")
let goOut = document.querySelector("#outBtn")
let stayIn = document.querySelector("#inBtn")
let locationEl = document.querySelector("#location")
let locationField = document.querySelector("location-name")
let radiusEl = document.querySelector("#radius")
let fiveKM = document.querySelector("#5km")
let tenKM = document.querySelector("#10km")
let fifteenKM = document.querySelector("#15km")
let twentyKM = document.querySelector("#20km")
let priceEl = document.querySelector("price")
let lowEl = document.querySelector("#price-low")
let mediumEl = document.querySelector("#medium-low")
let highEl = document.querySelector("#high-low")
let vibeEl = document.querySelector("#vibe")
let partyEl = document.querySelector("#party")
let chattyEl = document.querySelector("#chatty")
let adventureEl = document.querySelector("#adventure")
let resultsEl = document.querySelector("#results")
let pastResultsEl = document.querySelector("#past-results")




fetch('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name%2Crating%2Cformatted_phone_number&key=AIzaSyAELLLRlHlybGtB7QWBnN8G11d5vWc1eUA', {
    method: 'GET',
    headers: [],
})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });



userLocation = userinput;
radius = userinputradius;

//When user adds their location and radius, the API link is updated to show that

//if cost is $...

//if cost is $$

//if cost is $$$


//if active, show nightclubs, etc
//if chatty, shows bars and restaurants, cafe
//if adventurous, show museums, amusement parks,



var apiUrl = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/nearbysearch/json?' + userLocation + radius + cost + type + '&key=AIzaSyAELLLRlHlybGtB7QWBnN8G11d5vWc1eUA';


//parameters - open now


//When user clicks submit, the result shows up in results div