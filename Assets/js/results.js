
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





//for movie
let movieDates=document.querySelector("#movie-dates")

function displayStorageData(){

    movieDates.innerHTML=""
let readDataList=JSON.parse(localStorage.getItem("readList")) ?? {}
for(let key in readDataList){
   
    movieDates.innerHTML+= `<div class="movie-data-list">
    <h5 class="movie-save-title">${readDataList[key][0]}</h5>
    <div class="movie_save_card">
        <img
            src="${readDataList[key][1]}">
        
        </div>    <button class="btn-delete" onclick="deleteWatchList('${key}')">Delete</button>
   
</div>`
}
}
displayStorageData()


function deleteWatchList(id){

let readDataList=JSON.parse(localStorage.getItem("readList")) ?? {}    
delete readDataList[id] ;

localStorage.setItem("readList",JSON.stringify(readDataList))
displayStorageData()
$.toast({
            text: "data has been deleted!!",
            icon: 'error',
       
            position: 'top-center',
            hideAfter: 2000,
                   showHideTransition: 'slide'
        })
}

