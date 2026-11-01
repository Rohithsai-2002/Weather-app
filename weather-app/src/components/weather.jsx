import React, { useState } from "react";
import "./weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    if (!API_KEY) {
      setError("Please configure your Weather API");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch weather");
      }

      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-box">

        <h1>🌤️ Weather App</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") getWeather();
            }}
          />

          <button onClick={getWeather}>
            Search
          </button>
        </div>

        {loading && (
          <p className="loading-message">
            Loading weather...
          </p>
        )}

        {error && (
          <p className="error-message">{error}</p>
        )}

        {weather && (
          <div className="weather-card">

            <h2>
              {weather.name}, {weather.sys.country}
            </h2>

            <p className="temperature">
              {Math.round(weather.main.temp)}°C
            </p>

            <p className="description">
              {weather.weather[0].description}
            </p>

            <div className="weather-details">

              <div className="detail-item">
                <p>🌡️ Feels Like</p>
                <strong>
                  {Math.round(weather.main.feels_like)}°C
                </strong>
              </div>

              <div className="detail-item">
                <p>💧 Humidity</p>
                <strong>{weather.main.humidity}%</strong>
              </div>

              <div className="detail-item">
                <p>💨 Wind Speed</p>
                <strong>{weather.wind.speed} m/s</strong>
              </div>

              <div className="detail-item">
                <p>🌡️ Pressure</p>
                <strong>{weather.main.pressure} hPa</strong>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Weather;
