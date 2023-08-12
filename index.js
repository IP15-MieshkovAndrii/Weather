const apiKey = '8bfd07dd010c0f6be8eaa572698a531e'
const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=Kramatorsk&limit=5&appid=${apiKey}`;
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
const mapUrl = `https://tile.openweathermap.org/map/precipitation_new/0/0/0.png?appid=${apiKey}`

const changeBackgroundColor = (weather) =>{
    if(weather==='Clear')document.body.style.backgroundColor = 'blue';
    if(weather==='Clouds')document.body.style.backgroundColor = 'grey';
    if(weather==='Atmosphere')document.body.style.backgroundColor = 'aqua';
    if(weather==='Snow')document.body.style.backgroundColor = 'aqua';
    if(weather==='Rain')document.body.style.backgroundColor = 'grey';
    if(weather==='Drizzle')document.body.style.backgroundColor = 'grey';
    if(weather==='Thunderstorm')document.body.style.backgroundColor = 'yellow';
}

const formatTime = (date) => {
    const newDate = new Date(date * 1000);
    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

fetch(geoApiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const cityName = data[0].name;
    const htmlCityName = document.querySelector('.temperature h2');
    htmlCityName.textContent = cityName;

    const latitude = data[0].lat;
    const longitude = data[0].lon;
    const weatherUrl = `${weatherApiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    return fetch(weatherUrl);
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(weatherData => {
    console.log(weatherData);
    const temperature = weatherData.main.temp;
    const htmlTemperature = document.querySelector('.temperature h1');
    htmlTemperature.textContent = Math.round(temperature) + '°';

    const weather = weatherData.weather[0].main;
    const htmlWeather = document.querySelector('.temperature h3');
    htmlWeather.textContent = weather;
    changeBackgroundColor(weather)

    const tempMax = weatherData.main.temp_max;
    const tempMin = weatherData.main.temp_min;
    const htmlMinMax = document.querySelector('.temperature h4');
    htmlMinMax.textContent = 'Max:' + tempMax + '° Min:' + tempMin + '°';

    const sunset = weatherData.sys.sunset;
    const formatSunset = formatTime(sunset);
    const htmlSunset = document.querySelector('.sunset');
    htmlSunset.textContent = formatSunset;
    const sunrise = weatherData.sys.sunrise;
    const formatSunrise = formatTime(sunrise);
    const htmlSunrise = document.querySelector('.sunrise');
    htmlSunrise.textContent = "Sunrise: " + formatSunrise;

    const feelsLike = weatherData.main.feels_like;
    const htmlFeelsLike = document.querySelector('.feelsLike');
    htmlFeelsLike.textContent = Math.round(feelsLike) + '°';

    const humidity = weatherData.main.humidity;
    const htmlHumidity = document.querySelector('.humidity');
    htmlHumidity.textContent = humidity + '%';

    const visibility = weatherData.visibility;
    const htmlVisibility = document.querySelector('.visibility');
    htmlVisibility.textContent = visibility/1000 + 'km';
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });