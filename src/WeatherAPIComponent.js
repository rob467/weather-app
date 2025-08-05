import parseWeatherData from './parseWeatherData.js';

async function getWeatherData(location, unitGroup = 'metric') {
  const APIKEY = 'HJG7F9DWTSQQ4M9D2YKR9J4NE';

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&include=hours&key=${APIKEY}`;
  console.log(url)
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const weatherPromise = response.json();

    weatherPromise.then((val) => {
      console.log(val);
      console.log(
        parseWeatherData({
          weatherDataObj: val,
        })
      );
    });
  } catch (error) {
    console.error(error.message);
  }
}

export { getWeatherData };
