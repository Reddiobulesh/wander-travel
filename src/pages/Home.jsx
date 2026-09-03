import Hero from "../components/Hero";
import LocationBanner from "../components/LocationBanner";
import DestinationCard from "../components/DestinationCard";
import destinations from "../data/destinations";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Compass, ShieldCheck, Zap, HeartHandshake } from "lucide-react";

function Home() {
  const featured = destinations.slice(0, 6);

  return (
    <div className="home-page">
      {/* 01. Landing Experience Hero */}
      <Hero />

      {/* 02. Location Awareness & Geolocation Banner */}
      <LocationBanner />

      {/* 03. Featured Destinations Section */}
      <section className="home-featured-section">
        <div className="section-header-container">
          <div>
            <span className="section-eyebrow">CURATED DISCOVERIES</span>
            <h2 className="section-main-title">
              Popular <em className="glow-text">destinations.</em>
            </h2>
          </div>
          <Link to="/explore" className="section-see-all-btn">
            View All {destinations.length} Destinations <ArrowRight size={16} />
          </Link>
        </div>

        <div className="destination-grid">
          {featured.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 04. App Features Banner */}
      <section className="home-highlights-banner">
        <div className="highlights-container">
          <div className="highlight-card">
            <Compass size={28} className="highlight-icon" />
            <h3>Destination Explorer</h3>
            <p>Search and filter destinations across continents, curated with famous places & local culture.</p>
          </div>

          <div className="highlight-card">
            <Zap size={28} className="highlight-icon" />
            <h3>Real-Time Weather</h3>
            <p>Live temperatures, humidity, wind speeds, and 5-day forecasts via Open-Meteo API integration.</p>
          </div>

          <div className="highlight-card">
            <Sparkles size={28} className="highlight-icon" />
            <h3>AI Itinerary Planner</h3>
            <p>Conversational assistant powered by Google Gemini API rendering structured day-by-day trip plans.</p>
          </div>

          <div className="highlight-card">
            <ShieldCheck size={28} className="highlight-icon" />
            <h3>Location Awareness</h3>
            <p>Browser geolocation support with Haversine distance calculations to find closest places.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
