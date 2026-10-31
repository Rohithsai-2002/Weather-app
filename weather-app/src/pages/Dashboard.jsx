import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function searchWeather(e) {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    if (!apiKey) {
      setError("Please configure your weather API key in the .env file.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const url =
        `https://api.openweathermap.org/data/2.5/weather` +
        `?q=${encodeURIComponent(city.trim())}` +
        `&appid=${apiKey}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch weather.");
      }

      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="dashboard">
      <header className="navbar">
        <h2>🌦️ Weather App</h2>

        <div>
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="weather-container">
        <h1>Weather Dashboard</h1>
        <p>Find the current weather in any supported city.</p>

        <form className="search-form" onSubmit={searchWeather}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />

            <h1>{Math.round(weather.main.temp)}°C</h1>

            <h3>{weather.weather[0].description}</h3>

            <div className="weather-details">
              <div>
                <h4>Feels Like</h4>
                <p>{Math.round(weather.main.feels_like)}°C</p>
              </div>

              <div>
                <h4>Humidity</h4>
                <p>{weather.main.humidity}%</p>
              </div>

              <div>
                <h4>Wind Speed</h4>
                <p>{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}