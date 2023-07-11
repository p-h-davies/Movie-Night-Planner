
// Get the modal for when user click on movie night button then pop up for selection
let movieModal = document.querySelector("#movieModal");
let movieStorageData=document.querySelector(".movie-storage")
// Get the button that opens the modal
let btnModal = document.getElementById("btnModal");

// Get the <span> element that closes the modal
let movieCloseBtn = document.querySelector(".movieModalClose");

// When the user clicks the button, open the modal 
btnModal.addEventListener("click", () => {
    movieModal.style.display = "block"
    btnModal.style.display="none"
    movieStorageData.style.display="none"

})
// When the user clicks on <span> (x), close the modal
movieCloseBtn.addEventListener("click", () => {
    movieModal.style.display = "none"
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == movieModal) {
        movieModal.style.display = "none";
    }
}




//Make a category data according to API
let totData = 8;
const moviesBtn = document.querySelector("#moviesBtn");
let thumbnailInner = document.querySelector(".thumbnail");

let moviesListItmes = document.querySelector(".movies-list")

const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6962bde52fmsh2e93ccc685e930bp1551d9jsn2960b2c2c6e1',
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
    }
};


let movieCategory = []
let userAnsMovie;
let allData = "";


let watchMovies = (mtype = '') => {

    //category movies according to type of movie
    let allMoviesCategory = {
        'adventureMovie': ['Crime', 'Action', 'Adventure', 'Horror'],
        'entertainmentMovie': ['Drama', 'Comedy', 'Animation'],
        'westernMovies': ['Western'],
        'suspenseMovie': ['Mystery', 'Biography']

    }

    const response = fetch(url, options).then(res => res.json()).then(data => {

        var currentMovieType = allMoviesCategory[mtype];
        if (currentMovieType != undefined) {
            localStorage.setItem("currentMovieType", JSON.stringify(currentMovieType))
        }
        else {
            currentMovieType = JSON.parse(localStorage.getItem("currentMovieType"))
        }
        thumbnailInner.innerHTML = "";
        var i = 1;
        data.forEach(element => {
            var checkStatus = false;
            element.genre.forEach((content) => {
                if (currentMovieType.includes(content)) {
                    checkStatus = true;

                }

            })
            if (checkStatus & i <= totData) {
                console.log(i);

                thumbnailInner.innerHTML += ` <div class="thumbnail-inner"><h4>${element.title}</h4>
                    <img src="${element.image}" alt="${element.title}" title="${element.title}" onclick="trailerWatch('${element.trailer}')"></div>`


                i++;
            }
            checkStatus = false;


        });

    })
}



//just randomly data show in movie night page only 6 movie data show
let movieShow=document.querySelector(".movie-show")

function showMovies(){
    var k=5;
const response1 = fetch(url, options).then(res => res.json()).then(data1 => {
data1.forEach((v,i)=>{
    if(k>=i){
    movieShow.innerHTML+=`<div class="randomly-movie-inner"><h4>${v.title}</h4>
    <img src="${v.image}" alt="${v.title}" title="${v.title}" onclick="trailerWatch('${v.trailer}')"></div>`
    }
})
})
}
showMovies()


//for movie Trailer
let movieTrailer = document.querySelector("#movieTrailerModal");
let movieTrailerTitle = document.querySelector("#modal-header h5")

let movieGetLocalStorage, finalData;
function trailerWatch(index) {

    const response = fetch(url, options).then(res => res.json()).then(data => {
        movieTrailer.innerHTML = ""
        data.forEach(element => {
            if (element.trailer == index) {
                movieTrailer.style.display = "block"


                movieTrailer.innerHTML += `  <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="movieTrailerLabel">${element.title}</h5>
                        <span class="close movieTrailerClose" onclick="movieTrailerClose()">&times;</span>
                                                
                       </div>
                          <div class="modal-body"><iframe src="${element.trailer}"></iframe></div>
             </div>`

                let titleMovie = `${element.title}`
                movieGetLocalStorage = JSON.parse(localStorage.getItem("movie")) ?? []
                if (!movieGetLocalStorage.includes(element.title)) {
                    finalData = [...movieGetLocalStorage, titleMovie]
                    localStorage.setItem("movie", JSON.stringify(finalData))
                }
            }


        });
    })
}


// Get the modal for when user watch movie Tralier 
let movieTrailers = document.querySelector("#movieTrailerModal");
function movieTrailerClose() {
    // Get the <span> element that closes the modal
    let movieTrailerCloseBtn = document.querySelector(".movieTrailerClose");
    // When the user clicks on <span> (x), close the modal
    movieTrailerCloseBtn.addEventListener("click", () => {

        movieTrailers.style.display = "none"
    })

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        console.log(event.target)
        if (event.target == movieTrailers) {
            movieTrailers.style.display = "none";
        }
    }


}

//local storage data
let movieStorage = document.querySelector(".movie-storage ol");
let movieWatchList=document.querySelector(".movie-storage")
function displayDataStorage() {
    movieStorage.innerHTML = ''
    movieGetLocalStorage = JSON.parse(localStorage.getItem("movie")) ?? []
    movieGetLocalStorage.forEach((value, i) => {
        movieWatchList.style.display="block"
        movieStorage.innerHTML += `<li>${value}<span onclick="deleteData(${i})"> <i class="fa fa-trash" aria-hidden="true"></i></span></li>`;

    })

}
displayDataStorage()


//delete data if user wants to it and display message for deleting 
function deleteData(index) {

    let movieStorageLIstItem = JSON.parse(localStorage.getItem("movie")) ?? []

    movieStorageLIstItem.splice(index, 1)
    localStorage.setItem("movie", JSON.stringify(movieStorageLIstItem))
    displayDataStorage()
    $.toast({
        text:"Data has been Delete!!",
        icon: 'error',
        position : 'top-left' ,
        hideAfter : 1000, 
        showHideTransition : 'slide'
      })
}


window.onload = () => {
    localStorage.removeItem("currentMovieType");
}
// Value store into radio button value by selcting name
var allRadio = document.querySelectorAll("input[name='movieCategory']");
allRadio.forEach((e, i) => {
    e.addEventListener("click", () => {
        watchMovies(e.value)
    })
})


//Lazy Loading for showing thumbnails

let status1 = true;
window.onscroll = function () {

    let mainHeight = thumbnailInner.clientHeight;
    let scrollHeight = window.scrollY;
    let windowHeight = window.innerHeight;
    let cmovieGetLocalStorage = JSON.parse(localStorage.getItem("currentMovieType"))
    // console.log(mainHeight,Math.ceil(windowHeight+scrollHeight))

    if (Math.ceil(windowHeight + scrollHeight) >= mainHeight && status1) {
        console.log(status1)
        totData = totData + 8;
        watchMovies(cmovieGetLocalStorage)
        status1 = false;
        window.scroll({
            top: mainHeight,

        });
        setTimeout(() => {
            status1 = true;
        }, 1500)
    }
}