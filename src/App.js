import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import WeatherEffect from "./components/WeatherEffect";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [fade, setFade] = useState(true);

  const API_KEY = "a600a595dcc8c1fe6e520155b6498b13";

  const fetchWeather = async () => {
    if (!city) return;

    // fade-out
    setFade(false);

    setTimeout(async () => {
      try {
        const resWeather = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const dataWeather = await resWeather.json();

        const resForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        const dataForecast = await resForecast.json();

        if (dataWeather.cod === 200 && dataForecast.cod === "200") {
          setWeather(dataWeather);
          const dailyForecast = dataForecast.list.filter((item) =>
            item.dt_txt.includes("12:00:00")
          );
          setForecast(dailyForecast);
          setError("");
        } else {
          setError("City not found");
          setWeather(null);
          setForecast([]);
        }
      } catch (err) {
        setError("Failed to fetch data");
        setWeather(null);
        setForecast([]);
      }

      // fade-in
      setFade(true);
    }, 300);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  const getBackground = () => {
    if (!weather)
      return "linear-gradient(-45deg, #00c6ff, #0072ff, #00c6ff, #0072ff)";
    const main = weather.weather[0].main.toLowerCase();
    switch (main) {
      case "clear":
        return "linear-gradient(-45deg, #fceabb, #f8b500, #fceabb, #f8b500)";
      case "clouds":
        return "linear-gradient(-45deg, #d7d2cc, #304352, #d7d2cc, #304352)";
      case "rain":
      case "drizzle":
        return "linear-gradient(-45deg, #4e54c8, #8f94fb, #4e54c8, #8f94fb)";
      case "thunderstorm":
        return "linear-gradient(-45deg, #434343, #000000, #434343, #000000)";
      case "snow":
        return "linear-gradient(-45deg, #83a4d4, #b6fbff, #83a4d4, #b6fbff)";
      case "mist":
      case "fog":
        return "linear-gradient(-45deg, #757f9a, #d7dde8, #757f9a, #d7dde8)";
      default:
        return "linear-gradient(-45deg, #00c6ff, #0072ff, #00c6ff, #0072ff)";
    }
  };

  return (
    <div className="app" style={{ background: getBackground() }}>
      <h1>Weather Dashboard</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className={`fade-container ${fade ? "fade-in" : "fade-out"}`}>
        {weather && <WeatherEffect type={weather.weather[0].main} />}
        {weather && <WeatherCard weather={weather} />}
        {forecast.length > 0 && (
          <div className="forecast-container">
            {forecast.map((day) => (
              <ForecastCard key={day.dt} data={day} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
