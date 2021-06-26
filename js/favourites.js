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
  const favouriteItem = document.createElement("li");
  favouriteItem.innerHTML = `
    <img src="${data.Poster}" alt="movie-poster">
    <div class="details-container">
    <h2>${data.Title}</h2>
    <div class="details-parent">
      <div class="details-child">
        <div class="info-section">
          <div class="runtime">
            <span><i class="far fa-hourglass"></i></span>
            <span>${data.Runtime}</span>
          </div>
          <div class="parental-rating">
            <span><i class="far fa-eye"></i></span>
            <span>${data.Rated}</span>
          </div>
        </div>

        <div class="rating-section">
          <div class="imdb-rating">
            <span>imdb</span>
            <span>${data.imdbRating}</span>
          </div>
          <div class="metascore-rating">
            <span>Meta Score</span>
            <span>${data.Metascore}</span>
          </div>
        </div>
      </div>
      <div class="details-child button-group">
        <button class="movie-like-button favourite">Remove from Favourites</button>
        <button class="view-details-button">View More</button>
      </div>
    </div>
  </div>
  `;
  myFavouritesList.appendChild(favouriteItem);

  //add event listener to movie-like button
  const movieLikeButton = favouriteItem.querySelector(".movie-like-button");
  movieLikeButton.addEventListener("click", (e) => {
    e.preventDefault();
    toggleFavourites(favouriteItem);
  });

  //add event listener to view-details button
  const viewDetailsButton = favouriteItem.querySelector(".view-details-button");
  viewDetailsButton.addEventListener("click", function () {
    showMovieDetails(data.Title);
  });
}

//function to redirect to movie-details page
function showMovieDetails(title) {
  const url = `movieDetails.html?title=${title}`;
  window.open(url, "_blank");
}

//function to add/remove a movie to/from favourites
function toggleFavourites(movieItem) {
  const movieLikeButton = movieItem.querySelector("button");
  const movieTitle = movieItem.querySelector("h2").innerHTML;

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
