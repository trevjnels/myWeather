"use strict";
const logger = function(func) {};

const copyrightListner = function() {
  logger(copyrightListner);
  $(".github-button").on("click", function(e) {
    e.preventDefault();

    window.open("https://trevjnels.github.io/portfolio/", "_blank");
  });
};
const ipKey = "b51463ddf7aa16352e4b06e04d01275f68bedeb5d2dc8908fa99844f";
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
  if (clouds > 0.75) {
    clouds = "overcast";
  } else if (clouds > 0.5 && clouds <= 75) {
    clouds = "cloudy";
  } else if (clouds > 0.25 && clouds <= 50) {
    clouds = "partly cloudy";
  } else {
    clouds = "clear";
  }

  $(".output-left").html(`<div class="flex current-weather">
    <H1>Today's Weather:</H1>
      <H3>${clouds}</h3>
      <p>Current Temp: <span class="shadow">${temp}</span></p>
      <p>High: <span class="shadow">${maxTemp}</span></p>
      <p>Low: <span class="shadow"> ${minTemp}</span> </p>
  </div>`);
};

const dayMaker = function(unix) {
  var daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var date = new Date(unix * 1000);
  return daysOfTheWeek[date.getDay()];
};
const renderFutureWeather = function(resp) {
  $(".output-right").html("");
  var weatherArr = [];
  // console.log(resp.list);
  weatherArr.push(resp.list[3]);
  weatherArr.push(resp.list[10]);
  weatherArr.push(resp.list[19]);
  weatherArr.push(resp.list[30]);
  console.log(weatherArr);

  for (let i = 0; i < weatherArr.length; i++) {
    var day = weatherArr[i];

    var dayWeather = day.weather[0];
    var weatherType = dayWeather.main;
    var icon = `http://openweathermap.org/img/w/${dayWeather.icon}.png`;
    var dayOfWeek = dayMaker(day.dt);
    var temp = kelvin2F(day.main.temp)
      .toString()
      .slice(0, 4);
    var maxTemp = kelvin2F(day.main.temp_max)
      .toString()
      .slice(0, 4);
    var minTemp = kelvin2F(day.main.temp_min)
      .toString()
      .slice(0, 4);
    var clouds = day.clouds.all;
    if (clouds > 0.75) {
      clouds = "Overcast";
    } else if (clouds > 0.5 && clouds <= 75) {
      clouds = "Cloudy";
    } else if (clouds > 0.25 && clouds <= 50) {
      clouds = "Partly cloudy";
    } else {
      clouds = "Clear";
    }
    console.log(dayOfWeek);

    $(".output-right").append(`
      <div class="row">

      <div class="flex future-weather ">
      <H4><span class="shadow">${dayOfWeek}'s Weather:</span></H4>
        <H5>${weatherType}</h5>

      <p>High: <span class="shadow">${maxTemp}</span></p>
      <p>Low: <span class="shadow"> ${minTemp}</span> </p>
    </div>
    <div class="icon"><img src=${icon}></div>
  </div>`);
  }

  // var tomorrow = dateMaker(resp.list[6].dt);

  // 5 13 23 33 43
};
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

const getIPAddressLocation = function() {
  fetch(`https://api.ipdata.co/?api-key=${ipKey}`)
    .then(results => results.json())
    .then(resultsJ => render(resultsJ));
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
    .then(responseJSON => renderFutureWeather(responseJSON));
};

const autoRunner = function() {
  logger(autoRunner);
  copyrightListner();
  getIPAddressLocation();
};

autoRunner();
