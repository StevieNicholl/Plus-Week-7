let now;
let todayDay;

function setStatus(show, message) {
  let statusBlock = document.querySelector("#status-block");
  let dataBlocks = document.querySelector("#data-blocks");
  let forecastData = document.querySelector("#forecast-data-container");

  if (show === true) {
    statusBlock.innerHTML = message;
    statusBlock.classList.remove("hidden-element");
    dataBlocks.classList.add("hidden-element");
    forecastData.innerHTML = "";
  } else {
    statusBlock.classList.add("hidden-element");
  }
}

function getDayTime() {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    weekDays[now.getDay()] + ", " + now.getHours() + ":" + now.getMinutes()
  );
}

function updateData(response) {
  let dataBlocks = document.querySelector("#data-blocks");

  if (response.data.message != null) {
    setStatus(true, response.data.message);
  } else if (response.data.city != null) {
    setStatus(false);

    let dataCity = document.querySelector("#data-city");
    dataCity.innerHTML = response.data.city;

    let dayTime = document.querySelector("#day-time");
    dayTime.innerHTML = getDayTime();

    let dataCondition = document.querySelector("#data-condition");
    dataCondition.innerHTML = response.data.condition.description;

    let dataHumidity = document.querySelector("#data-humidity");
    dataHumidity.innerHTML = response.data.temperature.humidity + "%";

    let dataWind = document.querySelector("#data-wind");
    dataWind.innerHTML = response.data.wind.speed + "km/h";

    let dataTemp = document.querySelector("#data-temp");
    dataTemp.innerHTML = Math.round(response.data.temperature.current);

    let iconContainer = document.querySelector("#icon-container");
    let iconImg = `<img class="data-icon" src="${response.data.condition.icon_url}"/>`;
    iconContainer.innerHTML = iconImg;

    dataBlocks.classList.remove("hidden-element");
  } else setStatus(true, "Invalid Input");
}

function updateFCData(response) {
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastData = document.querySelector("#forecast-data-container");
  for (let index = 0; index < 5; index++) {
    forecastData.innerHTML +=
      `<div class="forecast-data"><div class="forecast-day">${
        weekDays[(todayDay + index + 1) % 7]
      }</div>` +
      `<div class="forecast-icon"> <img src="${response.data.daily[index].condition.icon_url}"/></div>` +
      `<div class="forecast-temps"><div class="forecast-temp-high">${Math.round(
        response.data.daily[index].temperature.maximum
      )}°</div><div class="forecast-temp-low">${Math.round(
        response.data.daily[index].temperature.minimum
      )}°</div></div></div>`;
  }
}

function searchCity(city) {
  let apiKey = "a20do60b19f65413at1b9bca4101844c";
  let request = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let fcRequest = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  now = new Date();
  todayDay = now.getDay();
  setStatus(true, "Searching...");
  axios.get(request).then(updateData);
  axios.get(fcRequest).then(updateFCData);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  if (searchInput.value.length > 0) {
    searchCity(searchInput.value);
  }
}

let searchFrom = document.querySelector("#search-form");
searchFrom.addEventListener("click", handleSearch);
