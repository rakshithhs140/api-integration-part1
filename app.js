// Your OpenWeatherMap API Key
const API_KEY = '308855b29bd6cf1ae17d16eeca8cc2bc';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Get elements
const weatherDisplay = document.getElementById('weather-display');
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');


// 🌦️ Fetch Weather (Async/Await)
async function getWeather(city) {

    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    showLoading();
    searchBtn.disabled = true;

    try {
        const response = await axios.get(url);

        console.log('Weather Data:', response.data);
        displayWeather(response.data);

    } catch (error) {
        console.error('Error:', error);

        if (error.response && error.response.status === 404) {
            showError("City not found 😢");
        } else {
            showError("Something went wrong. Try again!");
        }
    }

    searchBtn.disabled = false;
}


// 🌡️ Display Weather
function displayWeather(data) {

    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const weatherHTML = `
        <div class="weather-info">
            <h2 class="city-name">${cityName}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <p class="description">${description}</p>
        </div>
    `;

    weatherDisplay.innerHTML = weatherHTML;
}


// ❌ Show Error
function showError(message) {
    weatherDisplay.innerHTML = `
        <p class="error">${message}</p>
    `;
}


// ⏳ Show Loading
function showLoading() {
    weatherDisplay.innerHTML = `
        <p class="loading">Loading... ⏳</p>
    `;
}


// 🔍 Search Button Click
searchBtn.addEventListener('click', () => {

    const city = cityInput.value.trim();

    if (city === "") {
        showError("Please enter a city name ⚠️");
        return;
    }

    getWeather(city);
    cityInput.value = "";
});


// ⌨️ Enter Key Support
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});


// 🌍 Initial Message (instead of auto London)
weatherDisplay.innerHTML = `
    <p class="loading">Enter a city to see weather 🌤️</p>
`;