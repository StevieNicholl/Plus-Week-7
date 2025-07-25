function setStatus(show, message) {
  let statusBlock = document.querySelector("#status-block");
  let dataBlocks = document.querySelector("#data-blocks");

  if (show === true) {
    statusBlock.innerHTML = message;
    statusBlock.classList.remove("hidden-element");
    dataBlocks.classList.add("hidden-element");
  } else statusBlock.classList.add("hidden-element");
}

function getDayTime() {
  let weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let now = new Date();

  return (
    weekDays[now.getDay()] + ", " + now.getHours() + ":" + now.getMinutes()
  );
}

function updateData(response) {
  console.log(response.data);
  let dataBlocks = document.querySelector("#data-blocks");

  if (response.data.message != null) {
    dataBlocks.classList.add("hidden-element");
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

function searchCity(city) {
  let apiKey = "a20do60b19f65413at1b9bca4101844c";
  let request = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  setStatus(true, "Searching...");
  axios.get(request).then(updateData);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  if (searchInput.value.length > 0) {
    searchCity(searchInput.value);
  }
}

function getForecastDayHTML(dayNum) {
  let weekDays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  return (
    `<div class="forecast-data"><div class="forecast-day">${weekDays[dayNum]}</div>` +
    `<div class="forecast-icon">🌞</div>` +
    `<div class="forecast-temps"><div class="forecast-temp-high">100°</div><div class="forecast-temp-low">1°</div></div></div>`
  );
}

let forecastData = document.querySelector("#forecast-data-container");
forecastData.innerHTML =
  getForecastDayHTML(1) +
  getForecastDayHTML(2) +
  getForecastDayHTML(3) +
  getForecastDayHTML(4) +
  getForecastDayHTML(5);

let searchFrom = document.querySelector("#search-form");
searchFrom.addEventListener("click", handleSearch);
