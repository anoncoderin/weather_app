import React from "react";

export interface PredictWeather {
    date: string;
    temperature: string;
    weather: string;
    windSpeed: number;
  }
  

interface Props {
  forecastData: PredictWeather[];
}

const WeatherForecast: React.FC<Props> = ({ forecastData }) => {
  
  const groupedForecast = forecastData.reduce((acc: any, forecast: PredictWeather) => {
    const date = forecast.date.split(" ")[0]; 
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(forecast);
    return acc;
  }, {});

 
  return (
    <div>
      {Object.entries(groupedForecast).map(([date, forecasts]) => (
        <div key={date}>
          <h2>{date}</h2>
          <ul>
            {(forecasts as PredictWeather[]).map((forecast: PredictWeather, index: number) => (
              <li key={index}>
                <div>Date: {forecast.date}</div>
                <div>Temperature: {forecast.temperature}°C</div>
                <div>Weather: {forecast.weather}</div>
                <div>Wind Speed: {forecast.windSpeed}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
