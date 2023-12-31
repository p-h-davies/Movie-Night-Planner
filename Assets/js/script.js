let startEl = document.querySelector("#startBtn");
let q1El = document.querySelector("#q1");
let q2El = document.querySelector("#q2");
let goOut = document.querySelector("#outBtn");
let stayIn = document.querySelector("#inBtn");
let movieNight = document.querySelector("#movie-night");
let cocktailEl = document.querySelector("#cocktail");
let dinnerEl = document.querySelector("#dinner");
let locationEl = document.querySelector("#location");
let locationField = document.querySelector("location-name");
let submitEl = document.querySelector("#submit");
let quizEl = document.querySelector(".quiz-container");
const questionEl = document.querySelector("#question");
let answerElA = document.querySelector("#answerA");
let answerElB = document.querySelector("#answerB");
let answerElC = document.querySelector("#answerC");
let resultsEl = document.querySelector("#results")
let pastResultsEl = document.querySelector("#past-results");
let title = document.querySelector("#result-title")
let titleName = document.querySelector("#result-title-display")
let savedDatesBtn = document.querySelector("#saved-div")
let toDo = document.querySelector("#to-do")
let dateStore = document.querySelector("#out-dates")
let bodyEl = document.querySelector("#body")


//Start Page Display
titleName.style.display = 'none';
resultsEl.style.display = 'none';
q1El.style.display = 'none';
goOut.style.display = 'none';
stayIn.style.display = 'none';
locationEl.style.display = 'none';
submitEl.style.display = 'none';
quizEl.style.display = 'none';
questionEl.style.display = 'none';
answerElA.style.display = 'none';
answerElB.style.display = 'none';
answerElC.style.display = 'none';
dateStore.style.display = 'none';
q2El.style.display = 'none';
movieNight.style.display = 'none';
cocktailEl.style.display = 'none';
dinnerEl.style.display = 'none';

//First Question Display - "Go out or stay home"
startEl.addEventListener("click", function () {
    titleName.style.display = 'none';
    resultsEl.style.display = 'none';
    startEl.style.display = 'none';
    savedDatesBtn.style.display = 'none';
    q1El.style.display = 'inline';
    goOut.style.display = 'inline';
    stayIn.style.display = 'inline';
})


//If "Go out" is selected
goOut.addEventListener("click", function () {
    titleName.style.display = 'none';
    resultsEl.style.display = 'none';
    startEl.style.display = 'none';
    savedDatesBtn.style.display = 'none'
    q1El.style.display = 'none';
    goOut.style.display = 'none';
    stayIn.style.display = 'none';
    locationEl.style.display = 'flex'
    submitEl.style.display = 'inline'

})
//If "Stay In" is selected
stayIn.addEventListener("click", function () {
    titleName.style.display = 'none';
    resultsEl.style.display = 'none';
    startEl.style.display = 'none';
    savedDatesBtn.style.display = 'none';
    q1El.style.display = 'none';
    goOut.style.display = 'none';
    stayIn.style.display = 'none';
    q2El.style.display = 'inline';
    movieNight.style.display = 'inline';
    cocktailEl.style.display = 'inline';
    dinnerEl.style.display = 'inline';
})

//If "Cosy Up" is selected
movieNight.addEventListener("click", function () {
    document.location = "./movie-night.html"
})

//"Go out" questions list
let questionsList = [
    { title: "How far are you willing to travel?", answerA: "0-10km", answerB: "10-15km", answerC: "15+km" },
    { title: "How much are you looking to spend?", answerA: "$", answerB: "$$", answerC: "$$$" },
    { title: "What's your ideal vibe?", answerA: "Adventure", answerB: "Get to Know Each Other", answerC: "Day Time Hang" },
]

let questionIndex = 0;

function displayQuestion() {
    questionEl.innerHTML = questionsList[questionIndex].title;
    answerElA.innerHTML = questionsList[questionIndex].answerA;
    answerElB.innerHTML = questionsList[questionIndex].answerB;
    answerElC.innerHTML = questionsList[questionIndex].answerC;
    questionIndex++;

}

//Location Submission and "Go Out" questions start
submitEl.addEventListener("click", function (e) {
    e.preventDefault();
    titleName.style.display = 'none';
    resultsEl.style.display = 'none';
    locationEl.style.display = 'none'
    submitEl.style.display = 'none'
    quizEl.style.display = 'flex';
    questionEl.style.display = 'flex';
    answerElA.style.display = 'inline';
    answerElB.style.display = 'inline';
    answerElC.style.display = 'inline';
    answerElA.addEventListener("click", displayQuestion)
    answerElB.addEventListener("click", displayQuestion)
    answerElC.addEventListener("click", displayQuestion)
    displayQuestion()
})

//"Go Out" Question List - User Values
let userRadius = 0;
let userSpend = "";
let userVibe = "";


answerElA.addEventListener("click", function (event) {
    if (questionIndex == 1 && event.target == answerElA) {
        userRadius = 10000
    }
    if (questionIndex == 2 && event.target == answerElA) {
        userSpend = "2";
    }
    if (questionIndex == 3 && event.target == answerElA) {
        userVibe = "tourist_attraction"
    }
    if (questionIndex === questionsList.length) {
        end()
    }
})

answerElB.addEventListener("click", function (event) {
    if (questionIndex == 1 && event.target == answerElB) {
        userRadius = 15000

    }
    if (questionIndex == 2 && event.target == answerElB) {
        userSpend = "3";
    }
    if (questionIndex == 3 && event.target == answerElB) {
        userVibe = "bar"
    }
    if (questionIndex === questionsList.length) {
        end()
    }
})

answerElC.addEventListener("click", function (event) {
    if (questionIndex == 1 && event.target == answerElC) {
        userRadius = 20000
    }
    if (questionIndex == 2 && event.target == answerElC) {
        userSpend = "4";
    }
    if (questionIndex == 3 && event.target == answerElC) {
        userVibe = "cafe"
    }
    if (questionIndex === questionsList.length) {
        end()
    }
});

//"Go Out" Questions End Display, initialises result fetching
function end() {
    console.log(userVibe);
    console.log(userSpend);
    console.log(userRadius);
    q1El.style.display = 'none';
    goOut.style.display = 'none';
    stayIn.style.display = 'none';
    locationEl.style.display = 'none';
    submitEl.style.display = 'none';
    quizEl.style.display = 'none';
    questionEl.style.display = 'none';
    answerElA.style.display = 'none';
    answerElB.style.display = 'none';
    answerElC.style.display = 'none';
    showResults()
}


let responseArray = []

function showResults() {
    bodyEl.classList.add("full-body");
    titleName.style.display = 'flex';
    resultsEl.style.display = 'inline';
    toDo.classList.add("button-end")
    savedDatesBtn.style.display = 'flex'

    //Date Night Results Title
    if (userVibe == "tourist_attraction") {
        titleName.append("Congratulations! Your date night is: Explore a tourist attraction!")
        title.append("Go explore the local tourist attractions! Learn something about your city and learn about your love interest. We've listed the best tourist attractions near you below:")
    }
    if (userVibe == "bar") {
        titleName.append("Congratulations! Your date night is: Hit up a local bar!")
        title.append("Where else can you drink without judgement and get to know your date? Honestly, we can't believe you didn't already think of this! We've listed the best bars near you below:")
    }
    if (userVibe == "cafe") {
        titleName.append("Congratulations! Your date night is: Sip & chat in a cafe!")
        title.append("Bathe in the sunshine in the outdoor area, or cosy up together with hot coffee in hand. A cafe is the ultimate date spot for the day time, and maybe a walk in the park afterwards? We've listed the best tourist attractions near you below:")
    }

    //Confetti
    startConfetti()
    setTimeout(() => {
        stopConfetti()
    }, 2000);

    //Address Input Values
    let numberEl = document.getElementById("number-form").value;
    let userNumber = numberEl;
    console.log(userNumber);
    let streetEl = document.getElementById("street-form").value;
    let userStreet = streetEl.replace(" ", "20%");
    console.log(userStreet);
    let cityEl = document.getElementById("city-form").value;
    let userCity = cityEl.replace(" ", "20%");
    console.log(userCity);


    //Fetch
    //Longitude & Lang
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + userNumber + "%20" + userStreet + "20%" + userCity + "&key=AIzaSyA-MjyRNDu-Qz_Pbhyea2-QrgHelF4_Ggo")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.status);
            if (data.status == 'ZERO_RESULTS') {
                let error = document.createElement('h2')
                error.classList.add("error")
                error.textContent = "Sorry, we didn't find anything matching this description near you. Either try the quiz again or go on a hunt for a location that fits this description yourself!"
                resultsEl.append(error)
            }
            for (const issue of data.results) {
                const latitude = issue.geometry.location.lat
                console.log(latitude)
                const longitude = issue.geometry.location.lng
                console.log(longitude)
                //Google Places Fetch
                var apiUrl = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + "%2C" + longitude + '&radius=' + userRadius + '&type=' + userVibe + '&maxprice=' + userSpend + '&key=AIzaSyAELLLRlHlybGtB7QWBnN8G11d5vWc1eUA';
                console.log(apiUrl)
                fetch(apiUrl, {
                    method: 'GET',
                    headers: [],
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        for (const issue of data.results) {
                            const name = issue.name;
                            const location = issue.vicinity;
                            let photoRef = issue.photos[0].photo_reference;
                            const rating = issue.rating;
                            const price = issue.price_level;
                            console.log(photoRef)
                            let photo = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&maxheight=400&photo_reference=" + photoRef + "&sensor=false&key=AIzaSyAELLLRlHlybGtB7QWBnN8G11d5vWc1eUA"

                            //element creation
                            var img = document.createElement('img')
                            img.src = photo
                            var nameDisplay = document.createElement('ul');
                            nameDisplay.innerText = name;
                            nameDisplay.classList.add("location-title")
                            var locationDisplay = document.createElement('ul');
                            locationDisplay.innerText = "Location: " + location;
                            locationDisplay.classList.add("location-address")
                            var ratingDisplay = document.createElement('ul');
                            ratingDisplay.innerText = "Rating: " + rating;
                            ratingDisplay.classList.add("location-rating")
                            var priceDisplay = document.createElement('ul');
                            priceDisplay.innerText = "Price: (1-5, 1 being most affordable): " + price;
                            priceDisplay.classList.add("location-price")
                            var imgDiv = document.createElement('div');
                            imgDiv.classList.add("img-div")
                            var cardDiv = document.createElement('div');
                            cardDiv.id = 'div_' + issue.name;
                            cardDiv.classList.add("card-whole")
                            var saveBtn = document.createElement('button');
                            saveBtn.textContent = "Save to your To Do List"
                            saveBtn.classList.add("save")
                            saveBtn.id = 'btn_' + issue.name

                            //element appending
                            resultsEl.append(cardDiv)
                            cardDiv.appendChild(nameDisplay)
                            cardDiv.append(imgDiv)
                            imgDiv.appendChild(img)
                            cardDiv.appendChild(locationDisplay)
                            cardDiv.appendChild(ratingDisplay)
                            cardDiv.appendChild(priceDisplay)
                            var submitDiv = document.createElement('div');
                            cardDiv.append(submitDiv);
                            submitDiv.classList.add("submit-button")
                            submitDiv.appendChild(saveBtn);

                            //saving Fetch results into local storage
                            let responses = {
                                Photo: photo,
                                Name: nameDisplay.outerText,
                                Location: locationDisplay.outerText,
                                Rating: ratingDisplay.outerText,
                                Price: priceDisplay.outerText
                            }
                            console.log(responseArray)
                            saveBtn.addEventListener("click", function () {
                                responseArray.push(responses)
                                localStorage.setItem("responses", JSON.stringify(responseArray));
                                console.log(responseArray)
                                UIkit.notification({
                                    message: 'Date Location Saved!',
                                    status: 'primary',
                                    pos: 'top-right',
                                    timeout: 5000
                                });
                            })
                        }
                    });
            }
        })
}
function getDate() {
    var getResponse = JSON.parse(localStorage.getItem("responses"));
    if (getResponse !== null) {
        responseArray = getResponse;
    }
}

getDate()


function renderDate() {
    console.log(responseArray);
    dateStore.style.display = 'inline';
    for (let index = 0; index < responseArray.length; index++) {
        var getResponse = JSON.parse(localStorage.getItem("responses"));
        if (getResponse !== null) {
            responseArray = getResponse;
        }
        const element = responseArray[index];
        var dateName = document.createElement('h3');
        dateName.innerText = "Date: " + element.Name
        var dateLocation = document.createElement('ul');
        dateLocation.innerText = "Address: " + element.Location;
        var dateRating = document.createElement('ul');
        dateRating.innerText = "Rating: " + element.Rating
        var datePricing = document.createElement('ul');
        datePricing.innerText = "Pricing: " + element.Pricing
        var dateImg = document.createElement('img');
        dateImg.src = element.Photo;
        dateStore.append(dateName)
        dateStore.append(dateLocation)
        dateStore.append(dateImg)
    }
}



//Render Saved Dates on Click
let toDoStore = document.querySelector("#to-do")
toDoStore.addEventListener("click", function () {
    renderDate()
    document.location = "./To-Do.html";
});


//file names
//notify of button click
//don't allow location field to go through without data
//fix location position