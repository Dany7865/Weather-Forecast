
const API_KEY = "4379397dcb714dd2b48154842260511";

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const message = document.getElementById("message");

// When user clicks Get Weather
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        message.innerText = "Please enter a city name!";
        return;
    }

    getWeather(city);
});


// Function to fetch weather data
async function getWeather(city) {

    message.innerText = "Loading weather information...";
    weatherCard.style.display = "none";

    try {

        // WeatherAPI forecast endpoint
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=1&aqi=yes`;

        const response = await fetch(url);

        const data = await response.json();

        // Check API errors
        if (!response.ok) {
            throw new Error(data.error?.message || "Unable to fetch weather data");
        }

        // Get current weather
        const current = data.current;

        // Get today's forecast
        const today = data.forecast.forecastday[0].day;

        // Display city name
        document.getElementById("cityName").innerText =
            `${data.location.name}, ${data.location.country}`;

        // Display local date
        document.getElementById("date").innerText =
            data.location.localtime.split(" ")[0];

        // Display temperature
        document.getElementById("temperature").innerText =
            current.temp_c + "°C";

        // Display weather condition
        document.getElementById("condition").innerText =
            current.condition.text;

        // Display weather icon
        document.getElementById("weatherIcon").src =
            "https:" + current.condition.icon;

        // Display feels-like temperature
        document.getElementById("feelsLike").innerText =
            current.feelslike_c + "°C";

        // Display humidity
        document.getElementById("humidity").innerText =
            current.humidity + "%";

        // Display wind speed
        document.getElementById("wind").innerText =
            current.wind_kph + " km/h";

        // Today's maximum temperature
        document.getElementById("maxTemp").innerText =
            today.maxtemp_c + "°C";

        // Today's minimum temperature
        document.getElementById("minTemp").innerText =
            today.mintemp_c + "°C";

        // Chance of rain
        document.getElementById("rain").innerText =
            today.daily_chance_of_rain + "%";

        // Show weather card
        weatherCard.style.display = "block";

        message.innerText = "";

    }
    catch (error) {

        message.innerText = error.message;
        weatherCard.style.display = "none";

    }
}
