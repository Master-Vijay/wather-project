// API Key for OpenWeatherMap (replace with your actual API key)
const API_KEY = 'YOUR_API_KEY'; // Get your API key from https://openweathermap.org/api
const weatherInfo = document.getElementById('weather-info');
const searchButton = document.getElementById('search-btn');
const cityNameInput = document.getElementById('city-name');
const errorMessage = document.getElementById('error-message');

// Function to fetch weather data
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === '404') {
            showError("City not found");
            return;
        }

        showWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError("Failed to fetch weather data.");
    }
}

// Function to display weather information
function showWeather(data) {
    const { name, weather, main } = data;
    const weatherDescription = weather[0].description;
    const temperature = main.temp;
    const humidity = main.humidity;
    const windSpeed = data.wind.speed;

    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Weather:</strong> ${weatherDescription}</p>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;
    errorMessage.style.display = 'none'; // Hide error message
}

// Function to show error message
function showError(message) {
    weatherInfo.innerHTML = ''; // Clear any previous weather data
    errorMessage.style.display = 'block';
    errorMessage.textContent = message;
}

// Event listener for search button click
searchButton.addEventListener('click', () => {
    const city = cityNameInput.value.trim();

    if (city) {
        getWeatherData(city);
    } else {
        showError("Please enter a city name.");
    }
});

// Optional: Trigger search when the user presses Enter
cityNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});
