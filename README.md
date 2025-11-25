# 🌦 Weather App — README

## 1. 📌 Project Overview

This Weather App is a React-based application that allows users to:  
1. Enter a city name  
2. Fetch its geographic coordinates using the OpenWeather Geocoding API  
3. Retrieve real-time weather data (temperature, weather description, humidity, wind speed)  
4. Display the weather in a clean UI  

The app uses:  
- **React** (functional components + hooks)  
- **Axios** for making API requests  
- **React Router** for navigation between pages  
- **OpenWeather API** for all weather and location data  

---

## 2. 🚀 Features

1. Search any city worldwide  
2. Auto-fetch latitude and longitude from the OpenWeather Geocoding API  
3. Fetch real-time weather from the OpenWeather Current Weather API  
4. Navigation between screens using React Router  
5. Error handling for invalid city names or API issues  
6. Clean Bootstrap-based UI  

---

## 3. 📂 Folder Structure

```
/src
  |-- App.js
  |-- components/
        |-- WeatherReport.js
  |-- index.js
  |-- styles (optional)
```

---

## 4. 🔧 How to Run the Project

### **Step 1: Install Dependencies**
```
npm install
```

### **Step 2: Create Environment Variable**
Create a `.env` file in the root folder:

```
REACT_APP_OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
```

### **Step 3: Start the App**
```
npm start
```

---

## 5. 🧠 How the App Works (Step-by-Step Flow)

1. User enters a city name.  
2. On clicking **Search**, the Home component calls the Geocoding API:  
   `http://api.openweathermap.org/geo/1.0/direct`
3. API returns an array containing city details → latitude & longitude.  
4. These coordinates are passed to the WeatherReport component via React Router `state`.  
5. WeatherReport fetches real weather data from:  
   `https://api.openweathermap.org/data/2.5/weather`
6. Weather details are displayed on screen.  

---

## 6. 📘 Detailed Code Explanation

---

# **A. App.js**

This file sets up routing for the entire application.

### **1. React Router Setup**
- `/` → Home component  
- `/weather` → WeatherReport component  

```
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/weather" element={<WeatherReport />} />
  </Routes>
</Router>
```

---

# **B. Home Component (Searching + Routing)**

### **2. Local State Variables**
| Variable | Purpose |
|---------|----------|
| `city` | Stores the user's input (city name) |

```
const [city, setCity] = useState('');
```

---

### **3. handleSearch() Function**

This function fires when the user clicks **Search**.  
It performs these tasks:

1. Ensures input is not empty  
2. Sends a request to OpenWeather **Geocoding API**  
3. Extracts `lat`, `lon`, `name`, `country`  
4. Navigates to `/weather` and passes the data via `state`

```
axios.get('http://api.openweathermap.org/geo/1.0/direct', {
  params: {
    q: city,
    limit: 1,
    appid: API_KEY
  }
})
```

---

### **4. Navigation Using useNavigate**
```
navigate('/weather', { state: { lat, lon, name, country } });
```

Sends selected city data to WeatherReport.

---

# **C. WeatherReport Component (Displaying Weather)**

### **5. useLocation Hook**
Used to retrieve the `state` passed from the Home component.

```
const { state } = useLocation();
```

---

### **6. weatherData State**
Stores weather API response:

```
const [weatherData, setWeatherData] = useState(null);
```

---

### **7. useEffect Fetching Weather**
When the component loads:

1. Reads the passed `lat` and `lon`  
2. Calls OpenWeather **Current Weather API**  
3. Saves response to `weatherData`  

```
axios.get('https://api.openweathermap.org/data/2.5/weather', {
  params: {
    lat: state.lat,
    lon: state.lon,
    units: 'metric',
    appid: API_KEY
  }
})
```

---

### **8. Weather Display**
The weather card shows:

- Temperature → `weatherData.main.temp`  
- Description → `weatherData.weather[0].description`  
- Humidity → `weatherData.main.humidity`  
- Wind Speed → `weatherData.wind.speed`

---

## 7. 🔑 Environment Variable

The API key is imported like this:

```
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
```

Important:  
- React requires env vars to start with `REACT_APP_`  
- `.env` must be in the project root  

---

## 8. 🛠 APIs Used

### **1. Geocoding API**  
To convert city name → coordinates:  
```
http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={API_KEY}
```

### **2. Current Weather API**
To fetch real-time weather:  
```
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={API_KEY}
```

---

## 9. ✔ Summary of Important Variables & Their Roles

 | Variable                | Location            | Purpose                           |
 |-------------------------|---------------------|-----------------------------------|
 | `city`                  | Home                | Stores input city name            |
 | `navigate`              | Home                | Redirects to weather page         |
 | `state.lat`, `state.lon`| WeatherReport       | Coordinates of selected city      |
 | `weatherData`           | WeatherReport       | Stores weather result             |
 | `API_KEY`               | Both components     | Stores OpenWeather API key        |
--------------------------------------------------------------------------------------

---

## 10. 📦 Dependencies

Install these automatically via `npm install`:

- `react`
- `react-router-dom`
- `axios`
- `bootstrap` 

---


