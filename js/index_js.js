// API KEY
var apiKey = "40f09ea875474cbfae8190205241112";

// =============== DOM Selectors =============
// Today's Weather
var todayWeatherDay = document.querySelector(".today-weather .weather-day");
var todayWeatherDate = document.querySelector(".today-weather .weather-date");
var todayWeatherLocation = document.querySelector(
  ".today-weather .weather-location"
);
var todayWeatherTemp = document.querySelector(".today-weather .weather-temp");
var todayWeatherIcon = document.querySelector(".today-weather .weather-icon");
var todayWeatherCondition = document.querySelector(
  ".today-weather .weather-condition"
);

// Tomorrow Weather
var tomorrowWeatherDay = document.querySelector(
  ".tomorrow-weather .weather-day"
);
var tomorrowWeatherTemp = document.querySelector(
  ".tomorrow-weather .weather-temp"
);
var tomorrowWeatherMinTemp = document.querySelector(
  ".tomorrow-weather .weather-min-temp"
);
var tomorrowWeatherIcon = document.querySelector(
  ".tomorrow-weather .weather-icon"
);
var tomorrowWeatherCondition = document.querySelector(
  ".tomorrow-weather .weather-condition"
);

// Third Day Weather
var thirdWeatherDay = document.querySelector(".third-weather .weather-day");
var thirdWeatherTemp = document.querySelector(".third-weather .weather-temp");
var thirdWeatherMinTemp = document.querySelector(
  ".third-weather .weather-min-temp"
);
var thirdWeatherIcon = document.querySelector(".third-weather .weather-icon");
var thirdWeatherCondition = document.querySelector(
  ".third-weather .weather-condition"
);

// Function to fetch the weather data for the given location
function fetchWeatherData(location = "Cairo") {
  var url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject("Failed to fetch weather data");
      }
      return response.json();
    })
    .then((data) => {
      updateWeatherUI(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Function to update the UI with the fetched weather data
function updateWeatherUI(data) {
  var todayWeather = data.forecast.forecastday[0];
  var tomorrowWeather = data.forecast.forecastday[1];
  var thirdDayWeather = data.forecast.forecastday[2];

  // ===== Update Today's Weather =====
  var today = new Date(todayWeather.date);
  todayWeatherDay.textContent = today.toLocaleDateString("en-US", {
    weekday: "long",
  });
  todayWeatherDate.textContent = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
  todayWeatherLocation.textContent = data.location.name;
  todayWeatherTemp.innerHTML = `${todayWeather.day.avgtemp_c}<sup>o</sup>C`;
  todayWeatherIcon.src = `https:${todayWeather.day.condition.icon}`;
  todayWeatherCondition.textContent = todayWeather.day.condition.text;

  // ===== Update Tomorrow's Weather =====
  var tomorrow = new Date(tomorrowWeather.date);
  tomorrowWeatherDay.textContent = tomorrow.toLocaleDateString("en-US", {
    weekday: "long",
  });
  tomorrowWeatherTemp.innerHTML = `${tomorrowWeather.day.avgtemp_c}<sup>o</sup>C`;
  tomorrowWeatherMinTemp.innerHTML = `${tomorrowWeather.day.mintemp_c}<sup>o</sup>`;
  tomorrowWeatherIcon.src = `https:${tomorrowWeather.day.condition.icon}`;
  tomorrowWeatherCondition.textContent = tomorrowWeather.day.condition.text;

  // ===== Update Third Day's Weather =====
  var thirdDay = new Date(thirdDayWeather.date);
  thirdWeatherDay.textContent = thirdDay.toLocaleDateString("en-US", {
    weekday: "long",
  });
  thirdWeatherTemp.innerHTML = `${thirdDayWeather.day.avgtemp_c}<sup>o</sup>C`;
  thirdWeatherMinTemp.innerHTML = `${thirdDayWeather.day.mintemp_c}<sup>o</sup>`;
  thirdWeatherIcon.src = `https:${thirdDayWeather.day.condition.icon}`;
  thirdWeatherCondition.textContent = thirdDayWeather.day.condition.text;
}

// Call the fetch function when the page loads to get default weather data for Cairo
document.addEventListener("DOMContentLoaded", () => {
  fetchWeatherData();
});

// Event listener to allow users to change the location
document
  .querySelector(".find-location button")
  .addEventListener("click", () => {
    var location = document.querySelector("#search").value.trim();
    if (location) {
      fetchWeatherData(location);
    }
  });
