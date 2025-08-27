import './styles.css';
import './reset-styles.css';
import { getWeatherData } from './WeatherAPIComponent.js';
import searchWeatherLocation from './SearchLocationComponent.js';

function runWeatherApp() {
  searchWeatherLocation();
  const locationInput = document.querySelector('.search-input');

  const locationBtn = document.querySelector('#search-location-icon');

  locationBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const location = encodeURIComponent(locationInput.value.trim());
    getWeatherData(location);
  });

  locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      locationBtn.click();
    }
  });
}

runWeatherApp();
