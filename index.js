
const apiKey = '8bfd07dd010c0f6be8eaa572698a531e'
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
let globalLat = 0;
let globalLon = 0;
const mapUrl = `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`
const googleKey = 'AIzaSyCh3wa3v6OYQy3VYG4lhmEcHBM03p3mjPo';
let timeZone;

const changeBackgroundColor = (icon) =>{
  let bgElement = document.querySelector('.bg');
    switch (icon) {
        case '01d':
          bgElement.style.backgroundImage = 'linear-gradient(115deg, #63a4ff 10%, #227076 80%)';
            break;
        case '01n':
          bgElement.style.backgroundImage = 'url("images/clear_n.jpeg")';
            break;
        case '02d':
          bgElement.style.backgroundImage = 'url("images/few_clouds_d.jpeg")';
            break;
        case '02n':
          bgElement.style.backgroundImage = 'url("images/few_clouds_n.jpeg")';
            break;
        case '03d':
          bgElement.style.backgroundImage = 'url("images/clouds_d.jpeg")';
            break;
        case '03n':
          bgElement.style.backgroundImage = 'url("images/clouds_n.jpeg")';
            break;
        case '04d':
          bgElement.style.backgroundImage = 'url("images/broken_d.jpeg")';
            break;
        case '04n':
          bgElement.style.backgroundImage = 'url("images/broken_d.jpeg")';
            break;
        case '09d':
          bgElement.style.backgroundImage = 'url("images/drizzle_d.webp")';
            break;
        case '09n':
          bgElement.style.backgroundImage = 'url("images/drizzle_n.jpeg")';
            break;
        case '10d':
          bgElement.style.backgroundImage = 'url("images/rain_d.jpeg")';
            break;
        case '10n':
          bgElement.style.backgroundImage = 'url("images/rain_n.png")';
            break;
        case '11d':
          bgElement.style.backgroundImage = 'url("images/thunder_d.jpeg")';
            break;
        case '11n':
          bgElement.style.backgroundImage = 'url("images/thunder_n.jpeg")';
            break;
        case '13d':
          bgElement.style.backgroundImage = 'url("images/snow_d.jpeg")';
            break;
        case '13n':
          bgElement.style.backgroundImage = 'url("images/snow_n.jpeg")';
            break;
        case '50d':
          bgElement.style.backgroundImage = 'url("images/mist_d.jpeg")';
            break;
        case '50n':
          bgElement.style.backgroundImage = 'url("images/mist_n.jpeg")';
            break;
        default:
          bgElement.style.backgroundImage = 'linear-gradient(115deg, #63a4ff 10%, #227076 80%)';
            break;
}

}

const formatTime = (date) => {
    const newDate = new Date(date * 1000);
    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

function loadWeatherMap(){
    const mapDiv = document.querySelector('.weatherMap');
    const mapOptions = {
      center: new google.maps.LatLng(globalLat, globalLon),
      zoom: 9,
      mapTypeId: 'roadmap',
      styles: [
          { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#333333" }] },
          {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#333333" }],
          },
          {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#111111" }],
          },
          {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }],
          },
          {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#888888" }],
          },
          {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#f0f0f0" }],
          },
          {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#333333" }],
          },
          {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#555555" }],
          },
          {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#eeeeee" }],
          },
          {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#333333" }],
          },
          {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#444444" }],
          },
          {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#dddddd" }],
          },
          {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#333333" }],
          },
          {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#cccccc" }],
          },
          {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#333333" }],
          },
          {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#aaaaaa" }],
          },
      ],
  };
  
  
    const map = new google.maps.Map(mapDiv, mapOptions);

    const tileLayer = new google.maps.ImageMapType({
        getTileUrl: (coord, zoom) => {
            const url = mapUrl
                .replace('{x}', coord.x)
                .replace('{y}', coord.y)
                .replace('{z}', zoom);
            return url;
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 18
    });
    map.overlayMapTypes.push(tileLayer);
}

const qualityPollution = (key, value) => {
  switch (key) {
    case 'so2':
      if (value < 20) return 'Good';
      if (value < 80) return 'Fair';
      if (value < 250) return 'Moderate';
      if (value < 350) return 'Poor';
      return 'Very Poor';
    
    case 'no2':
      if (value < 40) return 'Good';
      if (value < 70) return 'Fair';
      if (value < 150) return 'Moderate';
      if (value < 200) return 'Poor';
      return 'Very Poor';
    
    case 'pm10':
      if (value < 20) return 'Good';
      if (value < 50) return 'Fair';
      if (value < 100) return 'Moderate';
      if (value < 200) return 'Poor';
      return 'Very Poor';
    
    case 'pm2_5':
      if (value < 10) return 'Good';
      if (value < 25) return 'Fair';
      if (value < 50) return 'Moderate';
      if (value < 75) return 'Poor';
      return 'Very Poor';
    
    case 'o3':
      if (value < 60) return 'Good';
      if (value < 100) return 'Fair';
      if (value < 140) return 'Moderate';
      if (value < 180) return 'Poor';
      return 'Very Poor';
    
    case 'co':
      if (value < 4400) return 'Good';
      if (value < 9400) return 'Fair';
      if (value < 12400) return 'Moderate';
      if (value < 15400) return 'Poor';
      return 'Very Poor';
    
    default:
      return 'Unknown';
  }
}

const qualityBackColor = (qualityName) => { 
  switch (qualityName) {
    case 'Good':
      return 'rgba(26, 176, 31, 0.5)';
    case 'Fair':
      return 'rgba(171, 176, 26, 0.5)';
    case 'Moderate':
      return 'rgba(176, 126, 26, 0.5)';
    case 'Poor':
      return 'rgba(176, 26, 26, 0.5)';
    case 'Very Poor':
      return 'rgba(89, 26, 176, 0.5)';
    default:
      return 'rgba(200, 200, 200, 0.5)';
  }
}

const calculateCardinalDirection = (degrees) => {
  if (degrees >= 0 && degrees < 22.5) {
      return 'N';
  } else if (degrees >= 22.5 && degrees < 67.5) {
      return 'NE';
  } else if (degrees >= 67.5 && degrees < 112.5) {
      return 'E';
  } else if (degrees >= 112.5 && degrees < 157.5) {
      return 'SE';
  } else if (degrees >= 157.5 && degrees < 202.5) {
      return 'S';
  } else if (degrees >= 202.5 && degrees < 247.5) {
      return 'SW';
  } else if (degrees >= 247.5 && degrees < 292.5) {
      return 'W';
  } else if (degrees >= 292.5 && degrees < 337.5) {
      return 'NW';
  } else {
      return 'N';
  }
}

async function fetchWeatherData(cityName, apiKey) {
  const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
  
  try {
      const response = await fetch(geoApiUrl);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if(!data[0])return;
      const cityName_1 = data[0].name;
      const htmlCityName = document.querySelector('.hight2');
      htmlCityName.textContent = cityName_1;

      const latitude = data[0].lat;
      const longitude = data[0].lon;
      const weatherUrl = `${weatherApiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      globalLat = latitude;
      globalLon = longitude;
      const response_1 = await fetch(weatherUrl);
      if (!response_1.ok) {
          throw new Error('Network response was not ok');
      }
      const weatherData = await response_1.json();
      const temperature = weatherData.main.temp;
      const htmlTemperature = document.querySelector('.hight1');
      htmlTemperature.textContent = Math.round(temperature) + '°';

      const weather = weatherData.weather[0].main;
      const htmlWeather = document.querySelector('.hight3');
      htmlWeather.textContent = weather;
      changeBackgroundColor(weatherData.weather[0].icon);

      const tempMax = weatherData.main.temp_max;
      const tempMin = weatherData.main.temp_min;
      const htmlMinMax = document.querySelector('.hight4');
      htmlMinMax.textContent = 'Max:' + tempMax + '° Min:' + tempMin + '°';

      const cloudiness = weatherData.clouds.all;
      const htmlCloudiness = document.querySelector('.cloudiness');
      htmlCloudiness.textContent = cloudiness + '%';

      const sunset = weatherData.sys.sunset;
      const formatSunset = formatTime(sunset);
      const htmlSunset = document.querySelector('.sunset');
      htmlSunset.textContent = formatSunset;
      const sunrise = weatherData.sys.sunrise;
      const formatSunrise = formatTime(sunrise);
      const htmlSunrise = document.querySelector('.sunrise');
      htmlSunrise.textContent = "Sunrise: " + formatSunrise;
      loadWeatherMap()

      const wind = weatherData.wind.speed;
      const htmlWind = document.querySelector('.wind');
      htmlWind.textContent = wind + 'mps';
      const windDirection = weatherData.wind.deg;
      const htmlWindDirection = document.querySelector('.winddegree');
      htmlWindDirection.textContent = calculateCardinalDirection(windDirection);

      let precipitation = 0;
      if (weatherData.rain) precipitation = weatherData.rain['1h'];
      if (weatherData.snow) precipitation = weatherData.snow['1h'];
      const htmlPrecipitation = document.querySelector('.precipitation');
      htmlPrecipitation.textContent = precipitation + 'mm';

      const feelsLike = weatherData.main.feels_like;
      const htmlFeelsLike = document.querySelector('.feelsLike');
      htmlFeelsLike.textContent = Math.round(feelsLike) + '°';

      const humidity = weatherData.main.humidity;
      const htmlHumidity = document.querySelector('.humidity');
      htmlHumidity.textContent = humidity + '%';

      const visibility = weatherData.visibility;
      const htmlVisibility = document.querySelector('.visibility');
      htmlVisibility.textContent = visibility / 1000 + 'km';

      const pressure = weatherData.main.pressure;
      const htmlPressure = document.querySelector('.pressure');
      htmlPressure.textContent = pressure + 'hPa';
      const response_2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${globalLat}&lon=${globalLon}&appid=${apiKey}&units=metric`);
      if (!response_2.ok) {
          throw new Error('Network response was not ok');
      }
      const weatherData_1 = await response_2.json();
      const forecastData = weatherData_1.list;
      const tendaysForecastContainer = document.querySelector('.dayForecast');
      tendaysForecastContainer.innerHTML = '';

      timeZone = weatherData.timezone;

      forecastData.forEach(forecast => {
          const forecastItem = document.createElement('div');
          forecastItem.classList.add('forecastItem');
          const timeString = formatTime(forecast.dt);
          const iconCode = forecast.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
          const temperature_1 = forecast.main.temp;

          forecastItem.innerHTML = `
            <div class="forecastTime">${timeString}</div>
            <img src="${iconUrl}" alt="Weather Icon" class="forecastIcon">
            <div class="forecastTemperature">${Math.round(temperature_1)}°</div>
        `;

          tendaysForecastContainer.appendChild(forecastItem);
      });
      const response_3 = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${globalLat}&lon=${globalLon}&appid=${apiKey}`);
      if (!response_3.ok) {
          throw new Error('Network response was not ok');
      }
      const pollutionData = await response_3.json();
      const components = pollutionData.list[0].components;

      const pollutionContainer = document.querySelector('.pollution');
      pollutionContainer.innerHTML = '';

      for (const key in components) {
          const pollutionItem = document.createElement('div');
          pollutionItem.classList.add('pollutionItem');

          const componentKey = key;
          const componentValue = components[key];
          const qualityName = qualityPollution(componentKey, componentValue);
          const qualityColor = qualityBackColor(qualityName);

          pollutionItem.innerHTML = `
        <div class="componentKey">${(componentKey === 'pm2_5' ? 'pm2.5' : componentKey)}</div>
        <div class="componentValue">${componentValue}</div>
      `;
          pollutionItem.style.backgroundColor = qualityColor;
          pollutionContainer.appendChild(pollutionItem);
      }
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
}
function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log(latLng)
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'location': latLng }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            var addressComponents = results[0].address_components;
            var city = "";
            for (var i = 0; i < addressComponents.length; i++) {
              var types = addressComponents[i].types;
              if (types.includes('locality')) {
                city = addressComponents[i].long_name;
                break;
              }
            }
            return city;
          }
        } else {
          return 'Kramatorsk';
        }
      });
    });
  } else {
    return 'Kramatorsk';
  }
}

function addCityItem() {
  const list = document.querySelector('.items');
  const weatherData = localStorage.getItem('weatherData');
  list.innerHTML = ''

  const data = weatherData ? JSON.parse(weatherData) : [];
  data.forEach((itemData, index) => {
    const cityItem = cityTemplate.content.cloneNode(true);
    const adjustedTimestamp = new Date().getTime() + (itemData.time * 1000);
    const adjustedTime = new Date(adjustedTimestamp).toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
    });

    const leftPart = cityItem.querySelector('.leftPart');
    leftPart.querySelector('h2').textContent = itemData.name;
    leftPart.querySelector('h3').textContent = adjustedTime;
    leftPart.querySelector('h4').textContent = itemData.weather;
    leftPart.addEventListener('click', () => {
      fetchWeatherData(itemData.name, apiKey)
    });

    const rightPart = cityItem.querySelector('.rightPart');
    rightPart.querySelector('h1').textContent = itemData.temp;
    rightPart.querySelector('h4').textContent = itemData.maxMin;

    const removeButton = cityItem.querySelector('.remove');
    removeButton.addEventListener('click', () => {
      data.splice(index, 1);
      localStorage.setItem('weatherData', JSON.stringify(data));
      const cityItem = removeButton.closest('.cityItem');
      if (cityItem && cityItem.parentNode === list) {
          list.removeChild(cityItem);
      }
    });

    if (index === data.length - 1) {
      cityItem.querySelector('.cityItem').style.border = 'none';
    }

    list.appendChild(cityItem);
});

}

const initCityName = initMap()
console.log(initCityName)
fetchWeatherData(initCityName || 'New York', apiKey)
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const existingData = localStorage.getItem('weatherData');
if(!existingData)localStorage.setItem('weatherData', '[]');
searchButton.addEventListener("click", () => {
  const cityName = cityInput.value;
  if (cityName) {
    fetchWeatherData(cityName, apiKey)
  }
});


const addButton = document.querySelector('.adding');
addButton.addEventListener('click', () => {
    const existingData = localStorage.getItem('weatherData');
    let dataList = existingData ? JSON.parse(existingData) : [];

    const dataExists = dataList.some(item => item.lat === globalLat && item.lon === globalLon);
    if (dataExists) {
        return;
    }
    const data = {
        name: document.querySelector('.hight2').textContent,
        time: timeZone,
        weather: document.querySelector('.hight3').textContent,
        temp: document.querySelector('.hight1').textContent,
        maxMin: document.querySelector('.hight4').textContent,
        lat: globalLat,
        lon: globalLon,
    };

    dataList.push(data);

    localStorage.setItem('weatherData', JSON.stringify(dataList));
    addCityItem()
});


const listButton = document.querySelector('.listButton');
const escapeButton = document.querySelector('.escape');
const list = document.querySelector('.list');

listButton.addEventListener('click', () => {
    list.style.display = 'flex';
});
addCityItem()

escapeButton.addEventListener('click', () => {
    list.style.display = 'none';
});







 
  

  

  
  
