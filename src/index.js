function formatDate(date) {
  let now = new Date(date);
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

  return daysOfWeek[now.getDay()] + " " + hour + ":" + minutes;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;  
  let forecastHTML = `<div class=row>`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = 
        forecastHTML +
        `
        <div class="col-2">
          <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="36"
          />
          <div class="forecast-temp">
            <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span> 
            <span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
          </div>
        </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c358f38536c4808d14556c03c5e2d3e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
 
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  iconElement.setAttribute("src", iconUrl);
  
  celsiusTemp = response.data.main.temp
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "c358f38536c4808d14556c03c5e2d3e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function changeData(event) {
  event.preventDefault();
  let cityInput = document.querySelector('#city-input').value;
  search(cityInput);
}

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

function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = Math.round(celsiusTemp * 9 / 5 + 32);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let buttonToClick = document.querySelector('#go-button');
buttonToClick.addEventListener("click", changeData);

let buttonCurrent = document.querySelector("#current");
buttonCurrent.addEventListener("click", setCurrentData);

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#c-link");
celsiusLink.addEventListener("click", showCelsius);

search("Kyiv");


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

