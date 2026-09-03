import { useState, useEffect } from "react";
import {
  calculateDistance,
  calculateFlightHours,
  calculateCompassDirection,
} from "../utils/distance";
import destinations from "../data/destinations";
import { Navigation, MapPin, Compass, AlertCircle, ArrowRight, Search, Plane, Globe2, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

function LocationBanner() {
  const [status, setStatus] = useState("idle"); // 'idle' | 'locating' | 'granted' | 'denied'
  const [userCoords, setUserCoords] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]); // default to Tokyo
  const [searchQuery, setSearchQuery] = useState("");
  const [calculatedDistance, setCalculatedDistance] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const popularPlaces = [
    { name: "Tokyo", country: "Japan", flag: "🇯🇵" },
    { name: "Paris", country: "France", flag: "🇫🇷" },
    { name: "Bali", country: "Indonesia", flag: "🇮🇩" },
    { name: "Rome", country: "Italy", flag: "🇮🇹" },
    { name: "Dubai", country: "UAE", flag: "🇦🇪" },
    { name: "New York", country: "USA", flag: "🇺🇸" },
    { name: "London", country: "UK", flag: "🇬🇧" },
    { name: "Sydney", country: "Australia", flag: "🇦🇺" },
  ];

  // Request browser geolocation
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus("denied");
      setErrorMsg("Geolocation is not supported by your browser.");
      return;
    }

    setStatus("locating");
    setErrorMsg("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setUserCoords({ lat, lon });
        setStatus("granted");

        if (selectedDestination) {
          const dist = calculateDistance(lat, lon, selectedDestination.latitude, selectedDestination.longitude);
          setCalculatedDistance(dist);
        }
      },
      (err) => {
        setStatus("denied");
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMsg("Location permission was denied. You can still calculate distance manually below!");
        } else {
          setErrorMsg("Could not retrieve current coordinates.");
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // When user selects a destination or types in search
  const handleSelectDestination = (dest) => {
    setSelectedDestination(dest);
    setSearchQuery(dest.name);

    if (userCoords) {
      const dist = calculateDistance(userCoords.lat, userCoords.lon, dest.latitude, dest.longitude);
      setCalculatedDistance(dist);
    } else {
      requestLocation();
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    const match = destinations.find(
      (d) =>
        d.name.toLowerCase().includes(val.toLowerCase().trim()) ||
        d.country.toLowerCase().includes(val.toLowerCase().trim())
    );

    if (match) {
      setSelectedDestination(match);
      if (userCoords) {
        const dist = calculateDistance(userCoords.lat, userCoords.lon, match.latitude, match.longitude);
        setCalculatedDistance(dist);
      }
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!userCoords) {
      requestLocation();
    }
  };

  // Re-calculate distance when userCoords or selectedDestination changes
  useEffect(() => {
    if (userCoords && selectedDestination) {
      const dist = calculateDistance(
        userCoords.lat,
        userCoords.lon,
        selectedDestination.latitude,
        selectedDestination.longitude
      );
      setCalculatedDistance(dist);
    }
  }, [userCoords, selectedDestination]);

  const flightHours = calculatedDistance ? calculateFlightHours(calculatedDistance) : null;
  const bearing =
    userCoords && selectedDestination
      ? calculateCompassDirection(
          userCoords.lat,
          userCoords.lon,
          selectedDestination.latitude,
          selectedDestination.longitude
        )
      : null;

  // Find country flag for selected destination
  const matchedFlag = popularPlaces.find(
    (p) => p.name.toLowerCase() === selectedDestination?.name?.toLowerCase()
  )?.flag || "🌍";

  return (
    <section className="location-banner">
      <div className="location-banner-container">
        {/* Left Control Panel */}
        <div className="location-info-side">
          <div className="location-badge">
            <Compass size={16} />
            <span>REAL-TIME LOCATION RADAR</span>
          </div>

          <h2 className="location-heading">
            Calculate distance <br />
            <em className="glow-text">to any place.</em>
          </h2>

          <div className="location-status-row">
            {status === "granted" ? (
              <div className="location-connected-pill">
                <span className="pulse-green-dot"></span>
                <span>Location: <strong>Connected</strong></span>
              </div>
            ) : status === "locating" ? (
              <div className="location-connected-pill locating">
                <span className="pulse-cyan-dot"></span>
                <span>Connecting to GPS...</span>
              </div>
            ) : (
              <button onClick={requestLocation} className="location-connect-btn">
                <Navigation size={16} />
                <span>Click to Connect Location</span>
              </button>
            )}

            {status === "denied" && (
              <div className="location-denied-badge">
                <AlertCircle size={14} />
                <span>GPS Permission Denied</span>
              </div>
            )}
          </div>

          <p className="location-description">
            Search or choose any destination below to measure direct geodesic distance in kilometers,
            view compass headings, and check commercial jet flight duration from your position.
          </p>

          {/* Place Search Bar */}
          <form onSubmit={handleSearchSubmit} className="location-search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search Tokyo, Paris, Bali, Rome, New York..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-action-btn">
              Measure
            </button>
          </form>

          {/* Quick Destination Cards Grid (matches screenshot UI) */}
          <div className="location-destinations-picker">
            <span className="picker-label">QUICK DESTINATIONS:</span>
            <div className="picker-grid">
              {popularPlaces.map((item) => {
                const dest = destinations.find((d) => d.name.toLowerCase() === item.name.toLowerCase());
                if (!dest) return null;
                const isSelected = selectedDestination?.id === dest.id;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleSelectDestination(dest)}
                    className={isSelected ? "picker-card active" : "picker-card"}
                  >
                    <span className="picker-flag">{item.flag}</span>
                    <span className="picker-name">{item.name}, {item.country}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Distance Radar Scope Card (matches radar-preview.jpg) */}
        <div className="radar-display-card">
          <div className="radar-top-meta">
            <div className="radar-city-flag">
              <span className="radar-flag-circle">{matchedFlag}</span>
              <div>
                <h3>{selectedDestination?.name || "Tokyo, Japan"}</h3>
                <span className="radar-subcountry">{selectedDestination?.country} · {selectedDestination?.region}</span>
              </div>
            </div>
            <span className="radar-pill-tag">GEODESIC RADAR</span>
          </div>

          <div className="radar-core-body">
            {calculatedDistance !== null ? (
              <div className="radar-readout-row">
                <div className="radar-metric-left">
                  <div className="radar-km-hero">
                    <span className="km-big glow-text">{calculatedDistance.toLocaleString()}</span>
                    <span className="km-unit">km</span>
                  </div>
                  <span className="radar-metric-title">Geodesic Distance</span>

                  <div className="radar-flight-box">
                    <Plane size={18} className="flight-icon" />
                    <div>
                      <span className="flight-label">Est. Flight Duration</span>
                      <strong>~{flightHours} hrs</strong>
                    </div>
                  </div>

                  <div className="radar-flight-box">
                    <Compass size={18} className="heading-icon" />
                    <div>
                      <span className="flight-label">Compass Heading</span>
                      <strong>{bearing || "Direct"}</strong>
                    </div>
                  </div>
                </div>

                {/* Animated Circular Radar Scope Graphic */}
                <div className="radar-scope-container">
                  <div className="radar-scope-circle">
                    <div className="radar-crosshair-h"></div>
                    <div className="radar-crosshair-v"></div>
                    <div className="radar-concentric ring-1"></div>
                    <div className="radar-concentric ring-2"></div>
                    <div className="radar-concentric ring-3"></div>
                    <div className="radar-sweep-beam"></div>
                    <div className="radar-target-ping"></div>
                    <span className="radar-compass-label north">N</span>
                    <span className="radar-compass-label east">E</span>
                    <span className="radar-compass-label south">S</span>
                    <span className="radar-compass-label west">W</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="radar-empty-state">
                <div className="radar-scope-circle empty">
                  <div className="radar-crosshair-h"></div>
                  <div className="radar-crosshair-v"></div>
                  <div className="radar-concentric ring-2"></div>
                  <div className="radar-sweep-beam"></div>
                </div>
                <h4>Radar Ready to Measure</h4>
                <p>Click "Click to Connect Location" above to see the real-time distance from your coordinates to {selectedDestination?.name}.</p>
                <button onClick={requestLocation} className="radar-activate-button">
                  <Navigation size={16} /> Enable Geodesic Radar
                </button>
              </div>
            )}
          </div>

          <div className="radar-card-action">
            <Link
              to={`/destination/${selectedDestination?.id}`}
              className="radar-explore-button"
            >
              <span>Explore Destination</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationBanner;
