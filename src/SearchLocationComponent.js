import { createHtmlEl, createHtmlLabelInput } from './AddDOMComponents.js';

function searchWeatherLocation() {
  const searchDiv = createHtmlEl({
      parent: document.querySelector('.search-container'),
      props: { className: 'search-form' },})

  const searchLocation = createHtmlEl({
    tag: 'input',
    parent: searchDiv,
    props: {
      placeholder: 'Enter a location & country',
      type: 'text',
      className: 'search-input',
    },
  });
  const searchBtn = createHtmlEl({
    tag: 'button',
    parent: searchDiv,
    props: {
      type: 'button',
      id: 'search-location-btn',
    },
    textContent: 'Search',
  });
}

export default searchWeatherLocation;
