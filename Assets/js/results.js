
let dateStore = document.querySelector("#out-dates")

function renderDate() {
    var getResponse = JSON.parse(localStorage.getItem("responses"));
    if (getResponse !== null) {
        responseArray = getResponse;
    }
    console.log(responseArray);
    for (let index = 0; index < responseArray.length; index++) {
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
    console.log("Hi")
}

renderDate()