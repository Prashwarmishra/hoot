/*-------------------------------------variable-declaration--------------------------------*/
const movieSearchInput = document.getElementById("movie-search-input");
let movieSearchInterval;
const searchResultsList = document.getElementById("search-results-list");
let favouritesList = [];

/*-------------------------------------event-listeners-------------------------------------*/

//once the window gets loaded, call enableSearch
window.onload = () => {
  enableSearch();
};

/*-------------------------------------function-declaration--------------------------------*/

//function to fetch the movie searched
function fetchData(name) {
  const url = `https://www.omdbapi.com/?apikey=6d404629&s=${name}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let movies = [];
      if (data.Response === "True") {
        movies = data.Search.map((movie) => movie);
      }
      updateResult(movies);
    });
}

//function to add the data fetched to dom
function updateResult(movies) {
  searchResultsList.innerHTML = "";
  movies.forEach((movie) => {
    const movieItem = document.createElement("li");
    const movieTitle = document.createElement("h2");
    const moviePoster = document.createElement("img");
    const movieLikeButton = document.createElement("button");

    movieTitle.innerHTML = movie.Title;
    moviePoster.src = movie.Poster;
    moviePoster.alt = "movie-poster";
    movieLikeButton.innerText = "Add to Favourites";

    //add event listener on movieLikeButton
    movieLikeButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("toggling favourites");
      toggleFavourites(movieItem);
    });

    movieItem.appendChild(movieTitle);
    movieItem.appendChild(moviePoster);
    movieItem.appendChild(movieLikeButton);

    searchResultsList.appendChild(movieItem);
  });
}

//function to get the name of movie searched
function enableSearch() {
  //an event-listener that calls fetchData once movie name is typed
  movieSearchInput.onkeyup = (e) => {
    //the below function optimises the calls to be made by using a setTimeout
    clearTimeout(movieSearchInterval);
    movieSearchInterval = setTimeout(() => {
      fetchData(e.target.value);
    }, 250);
  };
}

//function to add a movie to favourites
function toggleFavourites(movieItem) {
  const movieLikeButton = movieItem.querySelector("button");
  const movieTitle = movieItem.querySelector("h2").innerHTML;
  console.log("movie like button", movieItem);
  const favourite = movieItem.querySelector(".favourite");
  console.log("checking if favourited", favourite);

  if (favourite) {
    movieLikeButton.classList.remove("favourite");
    removeFromFavourites(movieTitle);
  } else {
    movieLikeButton.classList.add("favourite");
    addToFavourites(movieTitle);
  }
  //   console.log("toggled");
  //   movieLikeButton.classList.toggle("favourite");
}

//function to add to favourites
function addToFavourites(movieTitle) {
  console.log("movieTitle", favouritesList);
  favouritesList.push(movieTitle);
  console.log("favourites-------->", favouritesList);
}

//function to remove from favourites
function removeFromFavourites(movieTitle) {
  favouritesList = favouritesList.filter((movie) => movie !== movieTitle);
  console.log("unfavourites-------->", favouritesList);
}
