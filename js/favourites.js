/*-------------------------------------variable-declaration--------------------------------*/
let favouritesList = fetchFavourites();
const myFavouritesList = document.getElementById("my-favourites-list");

/*-------------------------------------event-listeners-------------------------------------*/

window.onload = () => {
  addFavouritesToList();
};

/*-------------------------------------function-declaration--------------------------------*/

function fetchData(movie) {
  const url = `https://www.omdbapi.com/?apikey=6d404629&t=${movie}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //   console.log("data fetched:", data);
      return updateResult(data);
    });
}

function updateResult(data) {
  console.log("data recieved: ", data);

  const favouriteItem = document.createElement("li");
  const favouritePoster = document.createElement("img");
  const detailsContainer = document.createElement("div");
  const favouriteTitle = document.createElement("h2");
  const infoContainer = document.createElement("div");
  const ratingsContainer = document.createElement("div");
  const runTime = document.createElement("div");
  const runTimeIcon = document.createElement("i");
  const runTimeText = document.createElement("span");
  const parentalRating = document.createElement("div");
  const parentalRatingIcon = document.createElement("i");
  const parentalRatingText = document.createElement("span");
  const imdbRating = document.createElement("div");
  const imdbRatingLabel = document.createElement("span");
  const imdbRatingValue = document.createElement("span");
  const metaScore = document.createElement("div");
  const metaScoreLabel = document.createElement("span");
  const metaScoreValue = document.createElement("span");
  const buttonGroup = document.createElement("div");
  const movieLikeButton = document.createElement("button");
  const movieDetailsButton = document.createElement("button");

  favouritePoster.src = data.Poster;
  favouritePoster.alt = "movie-poster";
  favouriteTitle.innerHTML = data.Title;
  runTimeIcon.classList.add("fas");
  runTimeIcon.classList.add("fa-stopwatch");
  runTimeText.innerHTML = data.Runtime;
  // runTime.innerHTML = data.Runtime;
  // <i class="far fa-eye"></i>
  parentalRatingIcon.classList.add("far");
  parentalRatingIcon.classList.add("fa-eye");
  parentalRatingText.innerHTML = data.Rated;

  imdbRatingLabel.innerHTML = "imdb";
  imdbRatingValue.innerHTML = data.imdbRating;

  metaScoreLabel.innerHTML = "Meta Score";
  metaScoreValue.innerHTML = data.Metascore;

  movieLikeButton.innerHTML = "Remove from Favourites";
  movieLikeButton.classList.add("favourite");
  movieDetailsButton.innerHTML = "View Details";

  runTime.appendChild(runTimeIcon);
  runTime.appendChild(runTimeText);

  parentalRating.appendChild(parentalRatingIcon);
  parentalRating.appendChild(parentalRatingText);

  imdbRating.appendChild(imdbRatingLabel);
  imdbRating.appendChild(imdbRatingValue);

  metaScore.appendChild(metaScoreLabel);
  metaScore.appendChild(metaScoreValue);

  infoContainer.appendChild(runTime);
  infoContainer.appendChild(parentalRating);
  infoContainer.classList.add("info-container");

  ratingsContainer.appendChild(imdbRating);
  ratingsContainer.appendChild(metaScore);
  ratingsContainer.classList.add("ratings-container");

  buttonGroup.appendChild(movieLikeButton);
  buttonGroup.appendChild(movieDetailsButton);
  buttonGroup.classList.add("button-group");

  detailsContainer.appendChild(favouriteTitle);
  detailsContainer.appendChild(infoContainer);
  detailsContainer.appendChild(ratingsContainer);
  detailsContainer.appendChild(buttonGroup);
  detailsContainer.classList.add("details-container");

  favouriteItem.appendChild(favouritePoster);
  favouriteItem.appendChild(detailsContainer);
  favouriteItem.classList.add("movie-container");
  myFavouritesList.appendChild(favouriteItem);

  //add event listener on movieLikeButton
  movieLikeButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("toggling favourites");
    toggleFavourites(favouriteItem);
  });
}

//function to add/remove a movie to/from favourites
function toggleFavourites(movieItem) {
  const movieLikeButton = movieItem.querySelector("button");
  const movieTitle = movieItem.querySelector("h2").innerHTML;
  console.log("movie like button", movieItem);

  //check if the class favourite is present
  const favourite = movieItem.querySelector(".favourite");

  //if favourite class is present, remove the movie from the favourites
  if (favourite) {
    movieLikeButton.classList.remove("favourite");
    movieLikeButton.innerText = "Add to Favourites";
    removeFromFavourites(movieTitle);
  } else {
    //else, add the movie to the favourites list
    movieLikeButton.classList.add("favourite");
    movieLikeButton.innerText = "Remove from Favourites";
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

//function to add the favourites list to localStorage
function updateFavourites() {
  localStorage.setItem("favouritesList", favouritesList);
}

function addFavouritesToList() {
  favouritesList.map((movie) => {
    fetchData(movie);
  });
}

//function to fetch the favourites
function fetchFavourites() {
  let favourites = localStorage.getItem("favouritesList");
  if (favourites) {
    favourites = favourites.split(",");
  } else {
    favourites = [];
  }
  return favourites;
}
