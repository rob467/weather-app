// Utility functions for reading weather data from visual crossing API

import { parse } from "date-fns";

// for a given location (from the weather API), cycle through days array to
// get key weather data (high/low temp, rain %, weather icon)
// flexible to allow either day or hours (requires additional input in API search function)
// Additional optional parameters

function parseWeatherData({ weatherDataArray, weatherData = [] }) {
  if (weatherData.length !== 0) {
    weatherData.forEach((element) => {
      weatherDataArray.forEach((weatherDay) => {
        if (weatherDay.hasOwnProperty(element)) {
          console.log(`${element}: ${weatherDay[element]}`);
        }
      });
    });
  }
}

export default parseWeatherData;