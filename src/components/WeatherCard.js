import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ weather }) => {
  const { name, main, weather: details, wind } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${details[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <img src={iconUrl} alt={details[0].description} />
      <p>{details[0].main}</p>
      <p>Temperature: {Math.round(main.temp)}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind: {wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;
