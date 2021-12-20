let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let h3 = document.querySelector("h3");
h3.innerHTML = `${day}, ${hour}:${minute}`;

function displayInfo(response) {
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  let temperature = document.querySelector("#degree");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = Math.round(response.data.main.humidity);
  let humidityButton = document.querySelector("#humidity");
  humidityButton.innerHTML = `Humidity: ${humidity}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let windButton = document.querySelector("#wind");
  windButton.innerHTML = `Wind: ${windSpeed}km/h`;
}
function searchCity(city) {
  let apiKey = "bdf4089b0994f94adcf10ec4fb943bff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayInfo);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
//challege 2
function searchLocation(position) {
  let apiKey = "bdf4089b0994f94adcf10ec4fb943bff";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}units=metric`;
  axios.get(apiUrl).then(displayInfo);
}
function displayLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", displayLocation);
