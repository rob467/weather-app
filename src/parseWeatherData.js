function filterObjkeys(obj, dayKeys, hourKeys) {
  const filteredObj = {};
  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key]) && key === 'hours') {
      filteredObj[key] = obj[key].map((item) =>
        typeof item === 'object'
          ? filterObjkeys(item, hourKeys, hourKeys)
          : item
      );
    } else if (dayKeys.includes(key)) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
}

function parseWeatherData({
  weatherDataObj,
  dayTerms = [
    'datetime',
    'datetimeEpoch',
    'tempmax',
    'tempmin',
    'icon',
    'precipprob',
    'hours',
  ],
  hourTerms = ['datetime', 'datetimeEpoch', 'temp', 'icon', 'precipprob'],
}) {
  return weatherDataObj['days'].map((weatherDay) =>
    filterObjkeys(weatherDay, dayTerms, hourTerms)
  );
}

export default parseWeatherData;
