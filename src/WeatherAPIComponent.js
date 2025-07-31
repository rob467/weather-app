import parseWeatherData from './parseWeatherData.js';

async function getWeatherData(location, unitGroup = 'metric') {
  const APIKEY = 'HJG7F9DWTSQQ4M9D2YKR9J4NE';

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
              ${location}?unitGroup=${unitGroup}&include=days&key=${APIKEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const weatherPromise = response.json();

    weatherPromise.then((val) => {
      console.log(val);
      parseWeatherData({
        weatherDataArray: val.days,
        weatherData: ['temp', 'precip'],
      })}
    );
  } catch (error) {
    console.error(error.message);
  }
}

export { getWeatherData };
