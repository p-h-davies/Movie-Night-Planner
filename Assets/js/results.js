
let dateStore = document.querySelector("#out-dates")

//Confetti
startConfetti()
setTimeout(() => {
    stopConfetti()
}, 2000);

function getDate() {
    var getResponse = JSON.parse(localStorage.getItem("responses"));
    if (getResponse !== null) {
        responseArray = getResponse;
    } if (getResponse == null) {
        responseArray = 0;
    }
}
getDate()

function renderDate() {
    getDate()
    if (responseArray == 0) {
        dateStore.append("No saved 'Go Out' dates found.")
    }
    console.log(responseArray);
    dateStore.style.display = 'inline';
    for (let index = 0; index < responseArray.length; index++) {
        const element = responseArray[index];
        var cardOut = document.createElement('div');
        cardOut.classList.add("card-out");
        var dateName = document.createElement('h3');
        dateName.innerText = element.Name
        dateName.classList.add("location-name")
        cardOut.append(dateName)
        imgDiv = document.createElement('div')
        imgDiv.classList.add("img-holder")
        cardOut.append(imgDiv)
        var dateImg = document.createElement('img');
        dateImg.src = element.Photo;
        dateImg.classList.add("out-img")
        imgDiv.append(dateImg)
        var dateLocation = document.createElement('ul');
        dateLocation.innerText = element.Location;
        dateLocation.classList.add("location-place")
        let locationDiv = document.createElement("div");
        locationDiv.classList.add("location-div");
        locationDiv.append(dateLocation)
        cardOut.append(locationDiv)
        var dateRating = document.createElement('ul');
        dateRating.innerText = element.Rating
        dateRating.classList.add("location-rating")
        cardOut.append(dateRating)
        dateStore.append(cardOut)

    }
    console.log("Hi")
}

renderDate()