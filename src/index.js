async function getWeatherData(location) {
  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        location +
        "/today/next7days/?key=96SVV4LQXNU3L6K2BQEGNDC2Z",
      { mode: "cors" },
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

console.log(getWeatherData("liverpool"));
