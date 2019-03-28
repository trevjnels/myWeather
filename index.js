"use strict";
const logger = function(func) {
  console.log(func.name, " is running!");
};

const copyrightListner = function() {
  logger(copyrightListner);
  $(".github-button").on("click", function(e) {
    e.preventDefault();
    console.log("click");
    window.open("https://trevjnels.github.io/portfolio/", "_blank");
  });
};
const ipKey = "316961512d48d2f24ad46bfd87a7bc6f";
const weatherKey = "eb0f6c8bad479b1a1f57b441165e3edc";

const renderCurrentWeather = function() {};
const renderFutureWeather = function() {};
const renderCity = function(city) {
  $(".title").html(`Weather in ${city}:`);
};

const render = function(response) {
  renderCity(response.city);

  var lat = response.latitude;
  var long = response.longitude;
  getCurrentWeather(lat, long);
  getFutureWeather(lat, long);
};

const getIPAddress = function() {
  fetch(`http://api.ipstack.com/check?access_key=${ipKey}`)
    .then(response => response.json())
    .then(responseJSON => render(responseJSON));
  // .then(responseJSON => console.log(responseJSON));
};

const getCurrentWeather = function(lat, long) {
  fetch(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}`)
    .then(response => response.json())
    .then(responseJSON => console.log(responseJSON));
};

const getFutureWeather = function(lat, long) {};

const autoRunner = function() {
  logger(autoRunner);
  copyrightListner();
  getIPAddress();
};

autoRunner();
