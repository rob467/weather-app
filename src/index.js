import './styles.css';
import './reset-styles.css';
import { getWeatherData } from './WeatherAPIComponent.js';
import searchWeatherLocation from './SearchLocationComponent.js'
import renderWeatherInfo from './RenderWeatherInfo.js';

searchWeatherLocation();

const locationInput = document.querySelector('.search-input');
const location = encodeURIComponent(locationInput.value.trim());

const locationBtn = document.querySelector('#search-location-btn');


locationBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const location = encodeURIComponent(locationInput.value.trim());
  getWeatherData(location);
});
