let cityInput = document.getElementById('city_input');
searchBtn = document.getElementById('searchBtn');
locationBtn = document.getElementById('locationBtn');
api_cle = 'c6dea39f86ea31dc114f0a4f0eec8fa9';
api_url = 'https://api.openweathermap.org/data/2.5/weather?q=';
currentWeatherCard = document.querySelectorAll('.weather-left .card')[0];
fiveDaysForecastCard = document.querySelector('.day-forecast');
aqiCard = document.querySelectorAll('.highlights .card')[0];
aqiList = ['Bonne', 'Correct', 'Mauvaise', 'Très Mauvaise', 'Dangereuse'];
sunriseCard = document.querySelectorAll('.highlights .card')[1];
humidityVal = document.getElementById('humidityVal');
windSpeedVal = document.getElementById('windSpeedVal');
feelsVal = document.getElementById('feelsVal');
hourlyForecastCard = document.querySelector('.hourly-forecast');


function getWeatherDetails(lat, lon, name, country, state) {
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_cle}&units=metric&lang=fr`;
    let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_cle}&units=metric&lang=fr`;
    let AIR_POLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_cle}&units=metric&lang=fr`;
    let days=["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    let months=["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    fetch(AIR_POLLUTION_API_URL).then(response => response.json()).then(data => {
        console.log(data);
        let {pm2_5,pm10,co,so2}= data.list[0].components;
        aqiCard.innerHTML = `
        <div class="card-head">
            <p>Qualité de l'air</p>
            <p class="air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].main.aqi - 1]}</p>
        </div>
        <div class="air-indices">
            <i class="fa-regular fa-wind fa-3x"></i>
            <div class="item">
                <p>PM2.5</p>
                <p>μg/m3</p>
                <h2>${pm2_5}</h2>
            </div>
            <div class="item">
                <p>PM10</p>
                <p>μg/m3</p>
                <h2>${pm10}</h2>
            </div>
            <div class="item">
                <p>CO</p>
                <p>ppb</p>
                <h2>${co}</h2>
            </div>
            <div class="item">
                <p>S0²</p>
                <p>ppb</p>
                <h2>${so2}</h2>
            </div>
        </div>`;
    }).catch(() => {
        alert(`Erreur de recherche de la pollution de l'air. Veuillez réessayer.`);
    });

    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        console.log(data);
        let date = new Date();
        currentWeatherCard.innerHTML = `
            <div class="current-weather">
                <div class="details">
                    <p>Actuellement</p>
                    <h2>${(data.main.temp).toFixed(1)}&deg;C</h2>
                    <p>${data.weather[0].description}</p>
                </div>
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""">
                </div>
            </div>
            <hr>
            <div class="card-footer">
                <p><i class="fa-light fa-calendar"></i>${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}</p>
                <p><i class="fa-light fa-location-dot"></i>${name},${country}</p>
            </div>`;
        let {sunrise, sunset} = data.sys;
        let {timezone} = data;
        let {humidity, feels_like} = data.main;
        let {speed} = data.wind;
        let sunRiseTime = moment.unix(sunrise).utc().add(timezone, 'seconds').format('HH:mm');
        let sunSetTime = moment.unix(sunset).utc().add(timezone, 'seconds').format('HH:mm');
        sunriseCard.innerHTML = `
            <div class="card-head">
                <p>Lever & Coucher de Soleil </p>
            </div>
            <div class="sunrise-sunset">
                <div class="item">
                    <div class="icon">
                        <i class="fa-light fa-sunrise fa-4x"></i>
                    </div>
                    <div>
                        <p>Lever</p>
                        <h2>${sunRiseTime}</h2>
                    </div>
                </div>
                <div class="item">
                    <div class="icon">
                        <i class="fa-light fa-sunset fa-4x"></i>
                    </div>
                    <div>
                        <p>Coucher</p>
                        <h2>${sunSetTime}</h2>
                    </div>
                </div>
            </div>
        `;
        humidityVal.innerHTML = `${humidity}%`;
        feelsVal.innerHTML = `${(feels_like).toFixed(1)}&deg;C`;
        windSpeedVal.innerHTML = `${(speed).toFixed(1)} km/h`;
    }).catch(() => {
        alert(`Erreur de recherche de la ville ${cityName}. Veuillez réessayer.`);
    });

    fetch(FORECAST_API_URL).then(response => response.json()).then(data => {
        console.log(data);
        let hourlyForecast = data.list;
        hourlyForecastCard.innerHTML = '';
        for(i= 0; i <= 7; i++){
            let hourForecastDate = new Date(hourlyForecast[i].dt_txt);
            let hour = hourForecastDate.getHours();
            let formattedHour = hour.toString().padStart(2, '0') + ' h';
            hourlyForecastCard.innerHTML += `
               <div class="card">
                        <p>${formattedHour}</p>
                        <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png" alt="">
                        <p>${(hourlyForecast[i].main.temp).toFixed(0)}&deg;C</p>
                    </div>
            `;

        }
        let uniqueForecastDays = [];
        let fiveDaysForecast = data.list.filter(forecast =>{
            let foreacstDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(foreacstDate)) {
                return uniqueForecastDays.push(foreacstDate);               
            }
        });
        console.log(fiveDaysForecast);
        fiveDaysForecastCard.innerHTML = '';
        for(i= 1; i < fiveDaysForecast.length; i++){
            let date = new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastCard.innerHTML += `
                <div class="forecast-item">
                    <div class="icon-wrapper">
                        <img src ="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png" alt="">
                        <span>${(fiveDaysForecast[i].main.temp).toFixed(0)}&deg;C</span>
                    </div>
                    <p>${date.getDate()} ${months[date.getMonth()]}</p>
                    <p>${days[date.getDay()]}</p>
                </div>
            `;
        }
    })
    .catch(() => {
        alert(`Erreur de prévisions. Veuillez réessayer.`);
    });
}

function getCityCoordinate(){
    let cityName= cityInput.value.trim();
    console.log(cityName);
    if (!cityName) return;
    let GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_cle}`;
    fetch(GEOCODING_API_URL).then(response => response.json()).then(data => {
        console.log(data);
        let {name, lat ,lon, country, state} = data[0];
        getWeatherDetails(lat, lon, name, country, state);
    })
    .catch(() => {
            alert(`Erreur de recherche de la ville ${cityName}. Veuillez réessayer.`);
    });
}
let previousLatitude = null;
let previousLongitude = null;
let lastFetchTimestamp = null; // horodatage de la dernière requête réussie
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes en millisecondes

function getUserCoordinates(forceRefresh = false) {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const currentTime = new Date().getTime();

        const hasMoved = latitude !== previousLatitude || longitude !== previousLongitude;
        const isCacheExpired = !lastFetchTimestamp || (currentTime - lastFetchTimestamp > CACHE_DURATION);

        if (hasMoved || isCacheExpired || forceRefresh) {
            previousLatitude = latitude;
            previousLongitude = longitude;
            lastFetchTimestamp = currentTime; // met à jour le cache

            const REVERSE_GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_cle}`;

            fetch(REVERSE_GEOCODING_API_URL).then(response => response.json()).then(data => {
                const { name, country, state } = data[0];
                getWeatherDetails(latitude, longitude, name, country, state);
            })
            .catch(() => {
                alert(`Erreur de recherche de la localisation actuelle. Veuillez réessayer.`);
            });
        } else {
            console.log("Données en cache toujours valides, pas de nouvelle requête.");
        }
    }, error => {
        if (error.code === error.PERMISSION_DENIED) {
            alert('Veuillez autoriser la géolocalisation pour utiliser cette fonctionnalité.');
        }
    });

}

locationBtn.addEventListener('click', getUserCoordinates);
// locationBtn.addEventListener("click", () => {
//     locationBtn.classList.add("animate-pulse");

//     setTimeout(() => {
//         locationBtn.classList.remove("animate-pulse");
//     }, 400);
//     getUserCoordinates();
// });

// Appel au chargement de la page
getUserCoordinates();

// Vérification périodique toutes les 10 minutes 
setInterval(getUserCoordinates, 600000); // 10 minutes

// searchBtn.addEventListener('click', getCityCoordinate);
searchBtn.addEventListener("click", () => {
    searchBtn.classList.add("animate-pulse");

    setTimeout(() => {
        searchBtn.classList.remove("animate-pulse");
    }, 400);
    getCityCoordinate(); 
});


// https://api.openweathermap.org/data/2.5/weather?q=Bordeaux&appid=c6dea39f86ea31dc114f0a4f0eec8fa9&units=metric&lang=fr


// "lat, lon	requis"	
// "Coordonnées géographiques (latitude, longitude)"

// "appid	requis	
// "Votre clé API unique (vous pouvez toujours la trouver sur la page de votre compte sous le onglet "API key")"
// "exclude	facultatif"
// "En utilisant ce paramètre, vous pouvez exclure certaines parties des données météorologiques de la réponse de l'API. Il devrait s'agir d'une liste délimitée par des virgules (sans espaces).
// "Valeurs disponibles:

// "current
// "minutely
// "hourly"
// "daily
// "alerts


// "units	facultatif	
// "Unités de mesure. standard, metric et imperial unités sont disponibles. Si vous n'utilisez pas le units paramètre, standard les unités seront appliquées par défaut. En savoir plus

// "lang	facultatif	
// "Vous pouvez utiliser le lang paramètre pour obtenir la sortie dans votre langue"

// current.dt
// current.temp
// current.feels_like
// current.humidity
// current.uvi
// current.wind_speed
// current.weather.icon
// units=metric 
