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
const kelvin2F = function(k) {
  var f = k * (9 / 5) - 459.67;
  return f;
};

const renderCurrentWeather = function(resp) {
  var temp = kelvin2F(resp.main.temp)
    .toString()
    .slice(0, 4);
  var maxTemp = kelvin2F(resp.main.temp_max)
    .toString()
    .slice(0, 4);
  var minTemp = kelvin2F(resp.main.temp_min)
    .toString()
    .slice(0, 4);
  var clouds = resp.clouds.all;
  var weather = [];
  resp.weather.forEach(function(elem) {
    weather.push(elem);
  });

  $(".output-left").html(`<div class="flex current-weather">
    <H1>Today's Weather:</H1>
    <p>Current Temp: ${temp}</p>
    <p>High: ${maxTemp}</p>
    <p>Low: Temp: ${minTemp}</p>
  </div>`);
};
const renderFutureWeather = function() {};
const renderCity = function(city) {
  $(".title").html(`Weather in ${city}:`);
};

const render = function(ipLocation) {
  renderCity(ipLocation.city);

  var lat = ipLocation.latitude;
  var long = ipLocation.longitude;
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
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${weatherKey}`
  )
    .then(response => response.json())
    .then(responseJSON => renderCurrentWeather(responseJSON));
};

const getFutureWeather = function(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${weatherKey}`
  )
    .then(response => response.json())
    .then(responseJSON => responseJSON);
};

const autoRunner = function() {
  logger(autoRunner);
  copyrightListner();
  getIPAddress();
};

autoRunner();
