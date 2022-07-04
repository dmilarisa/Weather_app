let date = document.querySelector('#date-time');
let now = new Date();
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

let hour = now.getHours();
let minutes = now.getMinutes();
if (hour < 10) {
  hour = "0" + String(hour);
}
if (minutes < 10) {
  minutes = "0" + String(minutes);
}

date.innerHTML = daysOfWeek[now.getDay()] + " " + hour + ":" + minutes;

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let tempC = document.querySelector('#temp-c');
  tempC.innerHTML = `${temp}`;

  let city = response.data.name;
  let cityToChange = document.querySelector('#city');
  cityToChange.innerHTML = city;
}

function changeData(event) {
  event.preventDefault();
  let cityInput = document.querySelector('#city-input').value;

  let apiKey = None
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let buttonToClick = document.querySelector('#go-button');
buttonToClick.addEventListener("click", changeData);

function findCurrentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "c358f38536c4808d14556c03c5e2d3e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function setCurrentData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentPosition);
}

let buttonCurrent = document.querySelector("#current");
buttonCurrent.addEventListener("click", setCurrentData);


// function fahrenheit(event) {
//   event.preventDefault();
//   let tempF = Math.round(1.8 * temp + 32);
//   let tempToChange = document.querySelector('#temp-c');
//   tempToChange.innerHTML = tempF;
// }

// function celsius(event) {
//   event.preventDefault();
//   let tempC = temp;
//   let tempToChange = document.querySelector('#temp-c');
//   tempToChange.innerHTML = tempC;
// }

// let temp = 25;
// let fahrengeit_ref = document.querySelector('#fahrengeit');
// fahrengeit_ref.addEventListener("click", fahrenheit);

// let celsius_ref = document.querySelector('#celsius');
// celsius_ref.addEventListener("click", celsius);

// if (cities.includes(city)) {
//     let tempC = Math.round(weather[city].temp);
//     let tempF = Math.round(1.8 * weather[city].temp + 32);
//     alert(`It is currently ${tempC}°C (${tempF}°F) in ${city.charAt(0).toUpperCase() + city.slice(1)} with a humidity of ${weather[city].humidity}%`)
// }

