// weather.js - Scotland Itinerary Weather

const API_KEY = '07d9c4ddf3c3bc6db5a965686564db90'

// Weather icon mapping
const weatherIcons = {
    '01d': 'wi-day-sunny',
    '02d': 'wi-day-cloudy',
    '03d': 'wi-cloud',
    '04d': 'wi-cloudy',
    '09d': 'wi-day-showers',
    '10d': 'wi-day-rain',
    '11d': 'wi-day-thunderstorm',
    '13d': 'wi-day-snow',
    '50d': 'wi-day-fog',
    '01n': 'wi-night-clear',
    '02n': 'wi-night-alt-cloudy',
    '03n': 'wi-cloud',
    '04n': 'wi-cloudy',
    '09n': 'wi-night-alt-showers',
    '10n': 'wi-night-alt-rain',
    '11n': 'wi-night-alt-thunderstorm',
    '13n': 'wi-night-alt-snow',
    '50n': 'wi-night-fog'
};

// Function to get weather for a specific city
async function getWeatherByCity(cityName, sectionId) {
    try {
        // Get coordinates for the city
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        
        if (geoData.length === 0) {
            console.log(`City ${cityName} not found`);
            return;
        }
        
        const { lat, lon } = geoData[0];
        
        // Get current weather
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        
        // Update the header with weather info
        updateSectionHeader(sectionId, weatherData);
        
    } catch (error) {
        console.log(`Error fetching weather for ${cityName}:`, error);
    }
}

// Function to update section header with weather
function updateSectionHeader(sectionId, weatherData) {
    const section = document.querySelector(`#${sectionId}`);
    if (!section) return;
    
    const sectionHeader = section.querySelector('.section-header h2');
    if (!sectionHeader) return;
    
    const temp = Math.round(weatherData.main.temp);
    const iconSymbol = weatherData.weather[0].icon;
    const iconClass = weatherIcons[iconSymbol] || 'wi-na';
    
    // Create weather element
    const weatherElement = document.createElement('div');
    weatherElement.className = 'weather-info';
    weatherElement.innerHTML = `
        <i class="wi ${iconClass}"></i>
        <span class="weather-temp">${temp}°F</span>
    `;
    
    // Add to header
    sectionHeader.appendChild(weatherElement);
}

// Load weather for all locations when page loads
window.addEventListener('DOMContentLoaded', () => {
    // Scotland locations mapped to your sections
    const locations = [
        { city: 'Edinburgh,Scotland', sectionId: 'day1' },
        { city: 'Inverness,Scotland', sectionId: 'day2' },
        { city: 'Isle of Skye,Scotland', sectionId: 'day3' },
        { city: 'Fort William,Scotland', sectionId: 'day4' },
        { city: 'Dublin,Ireland', sectionId: 'day5' }
    ];
    
    // Fetch weather for each location
    locations.forEach(location => {
        getWeatherByCity(location.city, location.sectionId);
    });
});