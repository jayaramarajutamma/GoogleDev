import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css"; // Import your CSS file here

const Weather = () => {
  const [location, setLocation] = useState("");
  const [result, setResult] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("grape");
  const [userPhoneNumber, setUserPhoneNumber] = useState(""); // Added state to store user's phone number

  const apiKey = "c902e933dd1c439e984153624252801"; // Replace with your weather API key
  const twilioSID = "AC0561fc36a1b05c7c60332aa4e95ed1ef"; // Replace with your Twilio SID
  const authToken = "9f3c5e3398513a179e58b0f90ef7b7c4"; // Replace with your Twilio Auth Token
  const twilioPhoneNumber = "+18455766782"; // Replace with your Twilio phone number

  const cropConditions = {
    grape: { minTemp: 15, maxTemp: 35, maxHumidity: 75, rainfallThreshold: 30 },
    potato: { minTemp: 10, maxTemp: 25, maxHumidity: 80, rainfallThreshold: 40 },
    tomato: { minTemp: 20, maxTemp: 30, maxHumidity: 70, rainfallThreshold: 20 },
    cherry: { minTemp: 5, maxTemp: 25, maxHumidity: 75, rainfallThreshold: 50 },
    strawberry: { minTemp: 15, maxTemp: 25, maxHumidity: 80, rainfallThreshold: 25 },
    corn: { minTemp: 18, maxTemp: 35, maxHumidity: 70, rainfallThreshold: 35 },
    orange: { minTemp: 15, maxTemp: 30, maxHumidity: 70, rainfallThreshold: 30 },
  };

  // Fetch weather data
  const fetchWeather = async () => {
    if (!location.trim()) {
      setResult("⚠ Please enter a location!");
      return;
    }

    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7`;

    try {
      const response = await axios.get(apiUrl);
      processWeatherData(response.data);
    } catch (error) {
      setResult("Error fetching weather data.");
      console.error(error);
    }
  };

  // Process the weather data
  const processWeatherData = (data) => {
    const forecast = data.forecast.forecastday;
    const locationName = data.location.name;
    const cropCondition = cropConditions[selectedCrop];
    const messages = [];

    forecast.forEach((day) => {
      if (day.day.avgtemp_c < cropCondition.minTemp || day.day.avgtemp_c > cropCondition.maxTemp) {
        messages.push(`🌡 Temperature out of range for ${selectedCrop}! (${day.day.avgtemp_c}°C)`);
      }
      if (day.day.avghumidity > cropCondition.maxHumidity) {
        messages.push(`💧 High humidity detected for ${selectedCrop}! (${day.day.avghumidity}%)`);
      }
      if (day.day.totalprecip_mm > cropCondition.rainfallThreshold) {
        messages.push(`🌧 Excessive rainfall detected for ${selectedCrop}! (${day.day.totalprecip_mm} mm)`);
      }
    });

    const weatherInfo = `
      <strong>Weather Information for ${locationName}:</strong><br>
      Temperature: ${forecast[0].day.avgtemp_c}°C<br>
      Humidity: ${forecast[0].day.avghumidity}%<br>
      Wind Speed: ${forecast[0].day.maxwind_kph} km/h<br>
      Rainfall: ${forecast[0].day.totalprecip_mm} mm<br><br>
      <strong>Suggestions:</strong><br>
      ${messages.length ? messages.join("<br>") : `✅ Weather is favorable for ${selectedCrop}.`}
    `;

    setResult(weatherInfo);

    // Store weather data in localStorage
    localStorage.setItem("weatherData", JSON.stringify(data));

    if (notificationsEnabled && userPhoneNumber) sendSMS(weatherInfo);
  };

  // Send SMS using Twilio
  const sendSMS = async (message) => {
    try {
      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${twilioSID}/Messages.json`,
        new URLSearchParams({
          From: twilioPhoneNumber,
          To: userPhoneNumber,
          Body: message.replace(/<[^>]+>/g, "") // Remove HTML tags for SMS
        }),
        {
          auth: { username: twilioSID, password: authToken },
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      console.log("SMS Sent: ", response.data);
    } catch (error) {
      console.error("Error sending SMS: ", error);
    }
  };

  // Request permission for notifications
  const requestNotificationPermission = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };

  // Send the notification
  const sendDailyWeatherNotification = () => {
    const weatherData = JSON.parse(localStorage.getItem('weatherData'));

    if (weatherData && Notification.permission === 'granted') {
      const notification = new Notification('Daily Weather Update', {
        body: `The current temperature is ${weatherData.current.temp_c}°C in ${weatherData.location.name}.`,
        icon: weatherData.current.condition.icon,
      });
    }
  };

  // Schedule notifications at a specific time (e.g., 2:20 PM daily)
  const startDailyNotifications = () => {
    const now = new Date();
    const timeToSend = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 20, 0); // Set the time (2:20 PM)
    
    // If the time has already passed, schedule for the next day
    const delay = timeToSend > now ? timeToSend - now : timeToSend.setDate(timeToSend.getDate() + 1) - now;
    
    setTimeout(() => {
      sendDailyWeatherNotification();  // Send the notification
      setInterval(sendDailyWeatherNotification, 24 * 60 * 60 * 1000);  // Repeat every 24 hours
    }, delay);
  };

  // Initialize the process
  useEffect(() => {
    requestNotificationPermission();
    getWeatherData().then(() => {
      startDailyNotifications();
    });
  }, []);

  // Fetch weather data from API and store it in local storage
  const getWeatherData = async () => {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
    const data = response.data;
    localStorage.setItem('weatherData', JSON.stringify(data));
    return data;
  };

  return (
    <div className="weather-container">
      <h2>🌾 Smart Farming Assistant</h2>
      <p>Enter your location (district,city, or coordinates):</p>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location (e.g., Rampur or 28.7041,77.1025)"
        className="location-input"
      />
      <button onClick={fetchWeather}>Get Weather Info</button>

      <div className="crop-selection">
        <label>
          Select Crop:
          <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
            <option value="grape">Grape</option>
            <option value="potato">Potato</option>
            <option value="tomato">Tomato</option>
            <option value="cherry">Cherry</option>
            <option value="strawberry">Strawberry</option>
            <option value="corn">Corn</option>
            <option value="orange">Orange</option>
          </select>
        </label>
      </div>

      <div className="phone-input">
        <label>
          Enter Your Phone Number:
          <input
            type="text"
            value={userPhoneNumber}
            onChange={(e) => setUserPhoneNumber(e.target.value)}
            placeholder="Enter phone number (e.g., +123456789)"
          />
        </label>
      </div>

      <div
        className="weather-info"
        dangerouslySetInnerHTML={{ __html: result }}
      ></div>

      <div style={{ marginTop: "20px" }}>
        <label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
          />
          Enable SMS Notifications
        </label>
      </div>
    </div>
  );
};

export default Weather;
