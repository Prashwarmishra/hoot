/*-------------------------------------variable-declaration--------------------------------*/
const movie = window.location.search.substring(7);
const main = document.getElementById("page-main");
console.log(movie);

/*-------------------------------------event-listeners-------------------------------------*/

window.onload = () => {
  fetchData();
};

/*-------------------------------------function-declaration--------------------------------*/
//function to fetch data
function fetchData() {
  const url = `https://www.omdbapi.com/?apikey=6d404629&t=${movie}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateResult(data);
    });
}

//function to update the results
function updateResult(data) {
  console.log("data: ", data);
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  wrapper.innerHTML = `
    <div class="wrapper-header">
        <img src="${data.Poster}" alt="movie-poster" />
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
              <button class="movie-like-button favourite">
                Remove from Favourites
              </button>
              <button class="view-details-button">View More</button>
            </div>
          </div>
        </div>
    </div>

    <div class="wrapper-main">
          <!-- add genre -->
          <div class="genre">
            <h2>Genre</h2>

            ${data.Genre}
          </div>
          <div class="plot">
            <h2>Plot</h2>
            <p>${data.Plot}</p>
          </div>
        </div>

        <div class="wrapper-data">
          <div class="box-office">
            <h2>Box Office</h2>
            <p>${data.BoxOffice}</p>
          </div>
          <div class="box-office">
            <h2>Language</h2>
            <p>${data.Language}</p>
          </div>
        </div>

        <div class="wrapper-footer">
          <div class="actors">
            <h2>Actors</h2>
            <p>${data.Actors}</p>
          </div>
          <div class="box-office">
            <h2>Director</h2>
            <p>${data.Director}</p>
          </div>
        </div>
    `;

  console.log("/*/*/*/*/*/", main);
  main.appendChild(wrapper);
  //   main.innerHTML(wrapper);
}
