/*-------------------------------------variable-declaration--------------------------------*/
const movieSearchInput = document.getElementById("movie-search-input");
let movieSearchInterval;
const searchResultsList = document.getElementById("search-results-list");
let favouritesList = fetchFavourites();

/*-------------------------------------event-listeners-------------------------------------*/

//once the window gets loaded, call enableSearch
window.onload = () => {
  enableSearch();
};

/*-------------------------------------function-declaration--------------------------------*/

//function to fetch the favourites list
function fetchFavourites() {
  const favourites = localStorage.getItem("favouritesList").split(",") || [];
  console.log("favourites: ", favourites);
  return favourites;
}

//function to add the favourites list to localStorage
function updateFavourites() {
  localStorage.setItem("favouritesList", favouritesList);
}

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

    //check if the movie is already favourited
    const isFavourite = checkIfFavourite(movie.Title);

    //if already favourited, add class favourite to the button and add appropriate text
    if (isFavourite) {
      movieLikeButton.classList.add("favourite");
      movieLikeButton.innerText = "Remove from Favourites";
    } else {
      movieLikeButton.innerText = "Add to Favourites";
    }

    movieTitle.innerHTML = movie.Title;
    moviePoster.src = movie.Poster;
    moviePoster.alt = "movie-poster";

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

//function to add/remove a movie to/from favourites
function toggleFavourites(movieItem) {
  const movieLikeButton = movieItem.querySelector("button");
  const movieTitle = movieItem.querySelector("h2").innerHTML;
  console.log("movie like button", movieItem);

  //check if the class favourite is present
  const favourite = movieItem.querySelector(".favourite");
  console.log("checking if favourited", favourite);

  //if favourite class is present, remove the movie from the favourites
  if (favourite) {
    movieLikeButton.classList.remove("favourite");
    removeFromFavourites(movieTitle);
  } else {
    //else, add the movie to the favourites list
    movieLikeButton.classList.add("favourite");
    addToFavourites(movieTitle);
  }
}

//function to add to favourites
function addToFavourites(movieTitle) {
  //push the movie's title to the favourites array
  favouritesList.push(movieTitle);
  console.log("favourites-------->", favouritesList);
  updateFavourites();
}

//function to remove from favourites
function removeFromFavourites(movieTitle) {
  //remove the movie's title from the favourites array
  favouritesList = favouritesList.filter((movie) => movie !== movieTitle);
  console.log("unfavourites-------->", favouritesList);
  updateFavourites();
}

//function to check if a movie is favoueited
function checkIfFavourite(movie) {
  const index = favouritesList.indexOf(movie);
  if (index != -1) {
    return true;
  }
  return false;
}
