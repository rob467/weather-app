import './styles.css';
import './reset-styles.css';
import { getWeatherData } from './WeatherAPIComponent.js';
import searchWeatherLocation from './SearchLocationComponent.js'

searchWeatherLocation();

const locationInput = document.querySelector('.search-input');
const locationBtn = document.querySelector('#search-location-btn');


locationBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(locationInput.value)
  getWeatherData(locationInput.value)
})
// getWeatherData('madrid');
