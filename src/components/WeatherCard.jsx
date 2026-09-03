import { useEffect, useState } from "react";
import { fetchLiveWeather } from "../services/weatherService";
import { Cloud, Thermometer, Wind, Droplets, RefreshCw } from "lucide-react";

function WeatherCard({ latitude, longitude, locationName }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("C"); // 'C' or 'F'

  const loadWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLiveWeather(latitude, longitude);
      setWeather(data);
    } catch (err) {
      setError(err.message || "Failed to load live weather.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      loadWeather();
    }
  }, [latitude, longitude]);

  const convertTemp = (tempC) => {
    if (unit === "F") {
      return Math.round((tempC * 9) / 5 + 32);
    }
    return tempC;
  };

  if (loading) {
    return (
      <div className="weather-card weather-card-loading">
        <div className="weather-skeleton-header"></div>
        <div className="weather-skeleton-body"></div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="weather-card weather-card-error">
        <div className="weather-header">
          <Cloud className="weather-icon-svg" />
          <h4>Live Weather for {locationName}</h4>
        </div>
        <p className="weather-error-text">Weather data currently unavailable.</p>
        <button onClick={loadWeather} className="weather-retry-button">
          <RefreshCw size={14} /> Retry Weather
        </button>
      </div>
    );
  }

  return (
    <div className="weather-card">
      <div className="weather-top-bar">
        <div className="weather-location">
          <span className="weather-live-badge">LIVE WEATHER</span>
          <h3>{locationName}</h3>
        </div>
        <div className="weather-unit-toggle">
          <button
            className={unit === "C" ? "unit-btn active" : "unit-btn"}
            onClick={() => setUnit("C")}
          >
            °C
          </button>
          <button
            className={unit === "F" ? "unit-btn active" : "unit-btn"}
            onClick={() => setUnit("F")}
          >
            °F
          </button>
        </div>
      </div>

      <div className="weather-main-display">
        <div className="weather-hero-temp">
          <span className="weather-icon-emoji">{weather.icon}</span>
          <div className="weather-temp-number">
            {convertTemp(weather.tempC)}
            <span className="weather-degree">°{unit}</span>
          </div>
        </div>

        <div className="weather-meta-info">
          <p className="weather-condition">{weather.conditionText}</p>
          <div className="weather-stats-grid">
            <div className="weather-stat">
              <Thermometer size={16} />
              <span>Feels Like</span>
              <strong>{convertTemp(weather.feelsLikeC)}°{unit}</strong>
            </div>
            <div className="weather-stat">
              <Droplets size={16} />
              <span>Humidity</span>
              <strong>{weather.humidity}%</strong>
            </div>
            <div className="weather-stat">
              <Wind size={16} />
              <span>Wind</span>
              <strong>{weather.windKmH} km/h</strong>
            </div>
          </div>
        </div>
      </div>

      {weather.forecast && weather.forecast.length > 0 && (
        <div className="weather-forecast-strip">
          <p className="forecast-title">5-Day Forecast</p>
          <div className="forecast-items">
            {weather.forecast.map((item, idx) => (
              <div key={idx} className="forecast-item">
                <span className="forecast-day">{item.dayName}</span>
                <span className="forecast-icon">{item.icon}</span>
                <span className="forecast-temp">
                  {convertTemp(item.maxTempC)}° / {convertTemp(item.minTempC)}°
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
