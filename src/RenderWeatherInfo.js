import { createHtmlEl, removeAllChildren } from './AddDOMComponents.js';
import { formatDates, formatHours } from './DateUtils.js';
import renderSVGIcon from './ReadSVGIcon.js';
import { isToday, isThisHour, parse } from 'date-fns';

function getHoursData(daysArray, day) {
  // If today's hourly data, gets weather from the current hour for the next 24 hours,
  // otherwise the 24 hours of the day
  let hoursData;
  if (isToday(day['datetime'])) {
    const currentHour = day['hours'].find((hour) =>
      isThisHour(hour['datetimeEpoch'] * 1000)
    );
    hoursData = day['hours']
      .slice(day['hours'].indexOf(currentHour))
      .concat(
        daysArray[1]['hours'].slice(0, day['hours'].indexOf(currentHour))
      );
  } else {
    hoursData = day['hours'];
  }
  return hoursData;
}

function renderWeatherByHour(hoursData, day) {
  const hoursContainer = document.querySelector('.hours-container');

  removeAllChildren(hoursContainer);
  hoursData.forEach((hour) => {
    const hourContainer = createHtmlEl({
      parent: hoursContainer,
      props: { className: 'hourly-container' },
      textContent: formatHours(new Date(hour['datetimeEpoch'] * 1000)),
    });

    createHtmlEl({
      parent: hourContainer,
      textContent: `${Math.round(hour['temp'])}°`,
    });

    const iconContainer = createHtmlEl({
      parent: hourContainer,
      props: { className: 'icon-container' },
    });

    renderSVGIcon(hour['icon'], iconContainer, 'small-svg-icon');

    createHtmlEl({
      tag: 'div',
      parent: hourContainer,
      textContent: `${Math.round(hour['precipprob'] / 5) * 5} %`,
    });
  });
}

// Function for rendering the parsed weather data
function renderWeatherInfo(parsedWeatherDataArray) {
  const daysContainer = document.querySelector('.days-container');
  renderWeatherByHour(
    getHoursData(parsedWeatherDataArray, parsedWeatherDataArray[0]),
    parsedWeatherDataArray[0]
  );
  removeAllChildren(daysContainer);

  let currentContainer;

  // 1. Create individual containers for each day
  parsedWeatherDataArray.forEach((day, index) => {
    const dayContainer = createHtmlEl({
      parent: daysContainer,
      props: { className: 'daily-container' },
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

    const smallerIcons = ['rain', 'cloudy', 'snow'];

    if (smallerIcons.includes(day['icon'])) {
      renderSVGIcon(day['icon'], iconContainer, 'small-svg-icon');
    } else {
      renderSVGIcon(day['icon'], iconContainer);
    }
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

    dayContainer.addEventListener('click', () => {
      if (currentContainer) {
        currentContainer.classList.remove('active-day');
      }
      const hourlyData = getHoursData(parsedWeatherDataArray, day);
      renderWeatherByHour(hourlyData, day);
      dayContainer.classList.add('active-day');
      currentContainer = dayContainer;
      const hoursContainer = document.querySelector('.hours-container');

      if (!isToday(day['datetime'])) {
        requestAnimationFrame(() => {
          hoursContainer.scrollLeft =
            (hoursContainer.scrollWidth - hoursContainer.clientWidth) / 2;
        });
      } else {
        requestAnimationFrame(() => {
          hoursContainer.scrollLeft = 0;
        });
      }
    });

    if (index === 0) {
      dayContainer.classList.add('active-day');
      currentContainer = dayContainer;
    }
  });
}

export default renderWeatherInfo;
