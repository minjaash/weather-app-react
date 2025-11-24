import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WeatherReport from './components/WeatherReport';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

function Home() {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!city) return;

    axios.get('http://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: city,
        limit: 1,
        appid: API_KEY
      }
    })
    .then(response => {
      if (response.data.length === 0) {
        alert('City not found');
        return;
      }
      const { lat, lon, name, country } = response.data[0];
      navigate('/weather', { state: { lat, lon, name, country } });
    })
    .catch(error => {
      console.error(error);
      alert('Error fetching coordinates');
    });
  };

  return (
    <div className="container text-center mt-5 bg-warning">
      <h1 className="mb-4">🌦 Weather App</h1>
      <div className="input-group mb-3 w-50 mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<WeatherReport />} />
      </Routes>
    </Router>
  );
}
