/**
 * Open-Meteo Weather Service
 * Fetches real-time weather and 7-day forecast based on latitude & longitude.
 */

const WEATHER_CODE_MAP = {
  0: { label: "Clear Sky", icon: "☀️", category: "clear" },
  1: { label: "Mainly Clear", icon: "🌤️", category: "clear" },
  2: { label: "Partly Cloudy", icon: "⛅", category: "cloudy" },
  3: { label: "Overcast", icon: "☁️", category: "cloudy" },
  45: { label: "Foggy", icon: "🌫️", category: "fog" },
  48: { label: "Depositing Rime Fog", icon: "🌫️", category: "fog" },
  51: { label: "Light Drizzle", icon: "🌦️", category: "rain" },
  53: { label: "Moderate Drizzle", icon: "🌧️", category: "rain" },
  55: { label: "Dense Drizzle", icon: "🌧️", category: "rain" },
  61: { label: "Slight Rain", icon: "🌦️", category: "rain" },
  63: { label: "Moderate Rain", icon: "🌧️", category: "rain" },
  65: { label: "Heavy Rain", icon: "🌧️", category: "rain" },
  71: { label: "Light Snow", icon: "🌨️", category: "snow" },
  73: { label: "Moderate Snow", icon: "❄️", category: "snow" },
  75: { label: "Heavy Snow", icon: "❄️", category: "snow" },
  80: { label: "Rain Showers", icon: "🌦️", category: "rain" },
  81: { label: "Moderate Rain Showers", icon: "🌧️", category: "rain" },
  82: { label: "Violent Rain Showers", icon: "⛈️", category: "storm" },
  95: { label: "Thunderstorm", icon: "⛈️", category: "storm" },
  96: { label: "Thunderstorm with Hail", icon: "⛈️", category: "storm" },
};

export async function fetchLiveWeather(latitude, longitude) {
  if (!latitude || !longitude) {
    throw new Error("Latitude and Longitude are required for weather.");
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API failed with status ${response.status}`);
  }

  const data = await response.json();

  const current = data.current || {};
  const daily = data.daily || {};

  const code = current.weather_code ?? 0;
  const weatherInfo = WEATHER_CODE_MAP[code] || {
    label: "Sunny",
    icon: "☀️",
    category: "clear",
  };

  // Format 5-7 day forecast
  const forecast = (daily.time || []).slice(0, 5).map((dateStr, idx) => {
    const dayCode = daily.weather_code?.[idx] ?? 0;
    const dayInfo = WEATHER_CODE_MAP[dayCode] || { label: "Clear", icon: "☀️" };
    const dateObj = new Date(dateStr);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });

    return {
      dayName,
      maxTempC: Math.round(daily.temperature_2m_max?.[idx] ?? 25),
      minTempC: Math.round(daily.temperature_2m_min?.[idx] ?? 18),
      label: dayInfo.label,
      icon: dayInfo.icon,
    };
  });

  return {
    tempC: Math.round(current.temperature_2m ?? 22),
    feelsLikeC: Math.round(current.apparent_temperature ?? 22),
    humidity: current.relative_humidity_2m ?? 50,
    windKmH: Math.round(current.wind_speed_10m ?? 12),
    isDay: current.is_day === 1,
    conditionText: weatherInfo.label,
    icon: weatherInfo.icon,
    category: weatherInfo.category,
    forecast,
  };
}
