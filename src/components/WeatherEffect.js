import React from "react";
import "./WeatherEffect.css";

const WeatherEffect = ({ type }) => {
  const generateElements = (count, className) => {
    return [...Array(count)].map((_, i) => {
      const style = {
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 80}vh`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        opacity: Math.random() * 0.5 + 0.3,
        width: `${Math.random() * 15 + 5}px`,
        height: `${Math.random() * 15 + 5}px`,
      };
      return <div key={i} className={className} style={style}></div>;
    });
  };

  switch (type.toLowerCase()) {
    case "clouds":
      return <div className="clouds">{generateElements(5, "cloud")}</div>;
    case "rain":
    case "drizzle":
      return <div className="rain">{generateElements(70, "raindrop")}</div>;
    case "snow":
      return <div className="snow">{generateElements(50, "snowflake")}</div>;
    case "thunderstorm":
      return <div className="thunderstorm">{generateElements(1, "lightning")}</div>;
    default:
      return null;
  }
};

export default WeatherEffect;
