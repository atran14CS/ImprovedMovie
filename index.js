/*
 * Name: Akira Tran
 * Date: 04/20/2023
 * Section: CSE 154 AB Allan Elizabeth
 *
 * This is the JavaScript portion for the movies.html the purpose for this script
 * is to generate a random movie when #button is click and add movie title with their
 * rating when #list-btn is clicked.
 */
"use strict";
(function() {

  window.addEventListener("load", init);
  const MOVIETITLES = ["god-father.jpg", "pulb-fiction.jpg", "shawshank.jpg",
  "dark-knight-rises.jpeg", "john-wick-2.jpg", "jojo-rabbit.jpeg", "dictator.jpeg",
  "endgame.jpeg", "inglourious-bastards.jpg", "sorcer-stone.jpg"];
  const RANDUSER_URL = 'https://randomuser.me/api/';
  const MUSEUM_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/112";

  /**
   * main function controls which button assoicates to which call back function upon
   * click.
   */
  function init() {
    let button = qs('#button');
    button.addEventListener("click", generateRandMov);
    let listButton = qs('#list-btn');
    listButton.addEventListener("click", createMovieList);
    id("create").addEventListener("click", toggleCreateMovie);
    id("create").addEventListener("click", createMovieList);
    qs(".home").addEventListener("click", toggleHome);
    id("rate").addEventListener("click", toggleRate);
    id("background").addEventListener("click", makeRequest2);
    id("gen-moreReviews").addEventListener("click", makeRequest1);
  }

  /**
   * generate random movie from MOVIETITLES by picking a random number
   * Then change the current image to new movie title image.
   */
  function generateRandMov() {
    let randomIndex = Math.floor(Math.random() * MOVIETITLES.length);
    let randomMovie = MOVIETITLES[randomIndex];
    let changeImage = id("movie-box");
    changeImage.src = "random-movies/" + randomMovie;
    changeImage.classList.toggle("dashed");
  }

  function makeRequest1() {
    fetch(RANDUSER_URL)
    .then(statusCheck)
    .then(res => res.json())
    .then(userCreation)
    .then(movieReview)
    .catch(console.error)
  }

  function makeRequest2() {
    fetch(MUSEUM_URL)
    .then(statusCheck)
    .then(res => res.json())
    .then(getBackgroundImage)
    .catch(console.error)
  }

  function getBackgroundImage(data) {
    let imageSrc = data.primaryImage;
    document.body.style.backgroundImage = `url("${imageSrc}")`;
  }

  function userCreation(data) {
    let fName = data.results[0].name.first;
    let lName = data.results[0].name.last;
    let userSection = gen("section");
    let userName = gen("p");
    let userImg = gen("img");
    userName.textContent = fName + " " + lName;
    userImg.src = data.results[0].picture.large;
    userSection.appendChild(userImg);
    userSection.appendChild(userName);
    return userSection;
  }

  function movieReview(userSection) {
    const reviewComments = ["this movie was garbage!", "It was ok I think they could have done a better job.",
    "The director needs to be fire ASAP", "Speechless",
    "Amazing", "If was to choose 1 move to watch for the rest of my life it would be this one", ": )"];
    let moveImg = gen("img");
    let randomIndex = Math.floor(Math.random() * MOVIETITLES.length);
    moveImg.src = "random-movies/" + MOVIETITLES[randomIndex];
    userSection.appendChild(moveImg);
    let newReview = gen("p");
    newReview.textContent = reviewComments[randomIndex];
    userSection.appendChild(newReview);
    id("user-reviews").appendChild(userSection);
  }

  function handleError() {
    let errorP = gen("h1");
    errorP.textContent = "ERROR UNABLE TO FIND REVIEWS"
    id("movie-reviews").appendChild(errorP);
  }

  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Takes user input of their favorite movie and the rating and adds it to a list
   */
  function createMovieList() {
    let newMovie = gen("li");
    newMovie.classList.add("movie-item");
    let movieTitle = id("movie-title").value;
    let movieRating = id("rating").value;
    newMovie.textContent = movieTitle + " " + movieRating;
    id("movie-list").appendChild(newMovie);
  }

  function toggleRate() {
    let rateView = id("movie-reviews");
    if(rateView.classList.contains("hidden")) {
      id("main-menu").classList.add("hidden");
      id("make-list").classList.add("hidden");
      rateView.classList.remove("hidden");
    }
  }

  function toggleHome() {
    let homeView = id("main-menu");
    if(homeView.classList.contains("hidden")) {
      id("movie-reviews").classList.add("hidden");
      id("make-list").classList.add("hidden");
      homeView.classList.remove("hidden");
    }
  }

  function toggleCreateMovie() {
    let createList = id("make-list");
    if(createList.classList.contains("hidden")) {
      id("main-menu").classList.add("hidden");
      id("movie-reviews").classList.add("hidden");
      createList.classList.remove("hidden");
    }
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

})();