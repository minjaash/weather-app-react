import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export default function WeatherReport() {
  const { state } = useLocation();
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();

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
    <div>
          <div className="container mt-5 bg-warning p-4 rounded">
                  <h2 className="text-center bg-info py-3 rounded">
                    Weather in {state.name}, {state.country}
                  </h2>

                <div className="card m-3 text-center bg-light text-dark p-4 shadow">
                  <p><strong>Temperature:</strong> {weatherData.main.temp} °C</p>
                  <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
                  <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                  <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
                </div>
         </div>
                <button type="button" class="btn btn-outline-secondary position-relative start-50 mt-3" onClick={()=>navigate("/")}>go back</button>
    </div>
  );
}
