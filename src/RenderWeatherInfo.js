import { createHtmlEl, removeAllChildren } from './AddDOMComponents.js';
import formatDates from './DateUtils.js';
import renderSVGIcon from './ReadSVGIcon.js';

// Function for rendering the parsed weather data
function renderWeatherInfo(parsedWeatherDataArray) {
  const weatherContainer = document.querySelector('.weather-container');
  removeAllChildren(weatherContainer);
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

    const iconContainer = createHtmlEl({
      parent: dayContainer,
      props: { className: 'icon-container' },
    });

    renderSVGIcon(day['icon'], iconContainer);

    const precipContainer = createHtmlEl({
      parent: dayContainer,
    });

    createHtmlEl({
      tag: 'span',
      parent: precipContainer,
      textContent:
        Math.round(day['precipprob'] / 5) * 5
          ? `${Math.round(day['precipprob'] / 5) * 5} %`
          : '',
    });
  });
}

export default renderWeatherInfo;
