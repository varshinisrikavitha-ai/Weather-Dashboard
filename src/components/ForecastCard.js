import React from "react";
import "./ForecastCard.css";

const ForecastCard = ({ data }) => {
  const date = new Date(data.dt_txt).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="forecast-card">
      <h3>{date}</h3>
      <img src={iconUrl} alt={data.weather[0].description} />
      <p>{data.weather[0].main}</p>
      <p>{Math.round(data.main.temp)}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
    </div>
  );
};

export default ForecastCard;
