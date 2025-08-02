// Utility functions for reading weather data from visual crossing API

import { formatCloseDates } from './DateUtils.js';

// for a given location (from the weather API), cycle through days array to
// get key weather data (high/low temp, rain %, weather icon)
// flexible to allow either day or hours (requires additional input in API search function)
// Additional optional parameters

function parseWeatherData({
  weatherDaysArray,
  weatherDataTerms = ['tempmax', 'tempmin', 'precipprob'],
  noOfDays = 7,
}) {
  if (weatherDataTerms.length !== 0 && weatherDaysArray !== 0) {
    const processedWeatherData = weatherDaysArray.slice(0, noOfDays)
    .map((weatherDay) =>
      Object.keys(weatherDay)
      .filter(key => weatherDataTerms.includes(key))
      .reduce((filteredObj, key) => {
        filteredObj[key] = weatherDay[key];
        return filteredObj;
      }, {})
      );
      console.log(processedWeatherData)
    return processedWeatherData;
  }
}

export default parseWeatherData;
