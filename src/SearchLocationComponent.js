import { createHtmlEl, createHtmlLabelInput } from './AddDOMComponents.js';
import searchSvg from './svgs/search-icon.svg'

function searchWeatherLocation() {
  const searchDiv = createHtmlEl({
      parent: document.querySelector('.search-container'),
      props: { className: 'search-form' },})

  const searchLocation = createHtmlEl({
    tag: 'input',
    parent: searchDiv,
    props: {
      placeholder: 'Enter a location',
      type: 'text',
      className: 'search-input',
    },
  });
  const searchBtn = createHtmlEl({
    tag: 'img',
    parent: searchDiv,
    props: {
      src: searchSvg,
      id: 'search-location-icon',
    },
    textContent: 'Search',
  });
}

export default searchWeatherLocation;
