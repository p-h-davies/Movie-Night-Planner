
//Confetti
startConfetti()
setTimeout(() => {
    stopConfetti()
}, 2000);



//Button click To do List
let resultList = document.querySelector(".btn-result button");
resultList.addEventListener("click", () => {
    window.location.href = "./To-Do.html";
})


// Value store into radio button value by selcting name
var allRadio = document.querySelectorAll("input[name='movieCategory']");
allRadio.forEach((e, i) => {
    e.addEventListener("click", () => {
        watchMovies(e.value)
    })
})



//Make a category data according to API
let totData = 9;

let movieDisplay = document.querySelector(".movie-show-items");
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
let allMoviesCategory = {
    'adventureMovie': ['Crime', 'Action', 'Adventure', 'Horror'],
    'entertainmentMovie': ['Drama', 'Comedy', 'Animation'],
    'westernMovies': ['Western'],
    'suspenseMovie': ['Mystery', 'Biography']

}

let watchMovies = (mtype = '') => {


    //category movies according to type of movie

    const response = fetch(url, options).then(res => res.json()).then(data => {

        var currentMovieType = allMoviesCategory[mtype];

        movieDisplay.innerHTML = "";
        var i = 1;
        data.forEach(element => {

            var checkStatus = false;
            element.genre.forEach((content) => {
                if (currentMovieType.includes(content)) {
                    checkStatus = true;

                }

            })
            if (checkStatus & i <= totData) {




                movieDisplay.innerHTML += `<div class="movie-list">	<div class="movie_card">
                <img src="${element.image}" alt="${element.title}" title="${element.title}" >
                <div class="movie-body">
                  <div class="play-trailer" onclick="trailerWatch('${element.trailer}')">
                    <i class="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
                    </i>
                  </div>
                  <h5 class="movie-title">${element.title}</h5>
                  <div class="movie-year">
                      <span class="movie_info">${element.director[0]}<br/>(Director Name)</span>
                      <span class="movie_info float-right">${element.rating}</span>
                  </div>
                  <div class="movie-save">
                      <button onclick="movieSave('${element.id}')">Save movie</button>
                  </div>
                         
                </div>
              </div>
              </div>`

                i++;

            }


            checkStatus = false;


        });

    })
}


watchMovies('adventureMovie')



//for movie Trailer
let movieTrailer = document.querySelector("#movieTrailerModal");

let movieTrailerTitle = document.querySelector("#modal-header h5")


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

//movie save when user click on save button
let movieGetLocalStorage, finalData;
function movieSave(currentId) {
    let oldReadData = JSON.parse(localStorage.getItem('readList')) ?? {}

    if (currentId in oldReadData) {
        var msg = 'Movie already in your watchlist!'
    } else {
        const response = fetch(url, options).then(res => res.json()).then(data => {
            let currentData = data.filter((v) => v.id == currentId)

            oldReadData[currentId] = [currentData[0].title, currentData[0].image]
            localStorage.setItem("readList", JSON.stringify(oldReadData))
        })
        var msg = 'congrats! Movie has been saved in your watchlist!'
    }


    $.toast({
        text: msg,
        icon: 'info',
        position: 'top-center',
        hideAfter: 2000,
        showHideTransition: 'slide'
    })



}
//get data formlocal storage into to do page
let movieDates = document.querySelector("#movie-dates")

