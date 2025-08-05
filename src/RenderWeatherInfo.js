import { createHtmlEl } from './AddDOMComponents.js';
import formatDates from './DateUtils.js';

// Function for rendering the parsed weather data
function renderWeatherInfo(parsedWeatherDataArray) {
  const weatherContainer = document.querySelector('.weather-container');
  // 1. Create individual containers for each day
  parsedWeatherDataArray.forEach((day) => {
    const dayContainer = createHtmlEl({
      parent: weatherContainer,
      props: { className: 'day-container' },
      textContent: formatDates(day['datetime']),
    });

    const tempContainer = createHtmlEl({
      parent: dayContainer,
      props: { className: 'temp-container' },
      children: [
        createHtmlEl({
          tag: 'span',
          textContent: `${Math.round(day['tempmax'])}° / ${Math.round(day['tempmin'])}°`,
        }),
      ],
    });

    const precipContainer = createHtmlEl({
      parent: dayContainer,
      children: [
        createHtmlEl({
          tag: 'span',
          textContent: `${day['precipprob'] ? `${Math.round(day['precipprob'] / 5) * 5} %` : ''}`,
        }),
      ],
    });
    // 2. Show weather data by day: temp-max/temp-min, percentage precipition and weather icon
    // 3. Hourly container: Could initially be hidden, but shows the hour by hour weather for a clicked day
  });
}

export default renderWeatherInfo;
