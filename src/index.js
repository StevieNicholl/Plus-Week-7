function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let dataCity = document.querySelector("#data-city");

  dataCity.innerHTML = searchInput.value;
}

let searchFrom = document.querySelector("#search-form");
searchFrom.addEventListener("click", searchCity);
