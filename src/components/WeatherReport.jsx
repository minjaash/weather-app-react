import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export default function WeatherReport() {
  const { state } = useLocation();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (state?.lat && state?.lon) {
      axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: state.lat,
          lon: state.lon,
          units: 'metric',
          appid: API_KEY
        }
      })
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error(error);
        alert('Error fetching weather data');
      });
    }
  }, [state]);

  if (!weatherData) return <div className="container text-center mt-5">Loading weather...</div>;

  return (
    <div className="container mt-5  bg-warning">
        <div className='m-2'>
      <h2 className="my-4 p-3 text-center bg-info">
        Weather in {state.name}, {state.country}
      </h2></div>
      <div className="card m-3 p-2 bg-secondary">
        <p><strong> Temperature:</strong> {weatherData.main.temp} °C</p>
        <p><strong> Weather:</strong> {weatherData.weather[0].description}</p>
        <p><strong> Humidity:</strong> {weatherData.main.humidity}%</p>
        <p><strong> Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
      </div>
    </div>
  );
}
