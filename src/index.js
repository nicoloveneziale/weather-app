import "./styles.css";
import backgroundImage from "./images/noaa-99F4mC79j1I-unsplash.jpg";

async function getWeatherData(location) {
  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        location +
        "?unitGroup=metric&key=96SVV4LQXNU3L6K2BQEGNDC2Z&contentType=json",
      { mode: "cors" },
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function processData(location) {
  const weatherData = await getWeatherData(location);
  console.log(weatherData);
  const resolvedLocation = weatherData.resolvedAddress;
  const days = weatherData.days;
  const currentConditions = weatherData.currentConditions;
  renderDOM(resolvedLocation, days, currentConditions);
}

function renderDOM(location, days, currentConditions) {
  const body = document.querySelector("body");
  body.innerHTML = "";
  const searchDiv = document.createElement("div");
  searchDiv.id = "search-div";
  const searchInput = document.createElement("input");
  searchInput.placeholder = "Enter a location";
  const searchButton = document.createElement("button");
  searchButton.addEventListener("click", () => {
    processData(searchInput.value);
  });
  searchButton.innerHTML = "Search";
  const searchBar = document.createElement("div");
  searchBar.append(searchInput, searchButton);
  searchDiv.append(searchBar);

  const currentDiv = document.createElement("div");
  currentDiv.id = "current-div";
  const locationHeader = document.createElement("h1");
  locationHeader.innerHTML = location;
  const currentTemperature = document.createElement("h1");
  currentTemperature.id = "current-temp";
  currentTemperature.innerHTML = currentConditions.temp + "°C";
  const currentDescription = document.createElement("p");
  currentDescription.innerHTML = currentConditions.conditions;
  currentDiv.append(locationHeader, currentTemperature, currentDescription);

  function createInfoDiv(identifier) {
    const Div = document.createElement("div");
    Div.id = identifier + "-div";
    Div.classList.add("data-div");
    const value = document.createElement("p");
    var unit = "";
    if (identifier == "humidity") {
      var name = "Humidty";
      unit = "%";
    } else if (identifier == "feelslike") {
      name = "Feels Like";
      unit = "°C";
    } else if (identifier == "windspeed") {
      name = "Wind Speed";
      unit = "Kph";
    } else if (identifier == "uvindex") {
      name = "Uv Index";
    } else if (identifier == "sunrise") {
      name = "Sunrise";
    } else if (identifier == "sunset") {
      name = "Sunset";
    }
    const Label = document.createElement("h3");
    Label.innerHTML = name;
    value.innerHTML = currentConditions[identifier] + unit;
    Div.append(Label, value);
    return Div;
  }

  const contentContainer = document.createElement("div");
  contentContainer.id = "content";

  contentContainer.append(
    currentDiv,
    createInfoDiv("humidity"),
    createInfoDiv("feelslike"),
    createInfoDiv("windspeed"),
    createInfoDiv("uvindex"),
    createInfoDiv("sunrise"),
    createInfoDiv("sunset"),
  );

  const daysContainer = document.createElement("div");
  daysContainer.id = "days-div";

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (var i = 1; i < 9; i++) {
    var day = days[i];
    var date = new Date(day.datetime);

    var dayDiv = document.createElement("div");
    dayDiv.classList.add("day");

    var weekday = document.createElement("p");
    weekday.innerHTML = dayNames[date.getDay()];
    weekday.classList.add("weekday");

    var low = document.createElement("p");
    low.innerHTML = day.tempmin + "°C";

    var high = document.createElement("p");
    high.innerHTML = day.tempmax + "°C";

    dayDiv.append(weekday, low, high);
    daysContainer.appendChild(dayDiv);
  }

  const background = document.createElement("img");
  background.src = backgroundImage;

  body.append(background, searchDiv, contentContainer, daysContainer);
}

processData("Liverpool");
