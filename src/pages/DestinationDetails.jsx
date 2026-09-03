import { useParams, Link } from "react-router-dom";
import destinations from "../data/destinations";
import useImage from "../hooks/useImage";
import WeatherCard from "../components/WeatherCard";
import PlaceCard from "../components/PlaceCard";
import AIChat from "../components/AIChat";
import Itinerary from "../components/Itinerary";
import { ArrowLeft, Calendar, Coins, Globe, MapPin, Clock, DollarSign, Sparkles } from "lucide-react";

function DestinationDetails() {
  const { id } = useParams();

  const destination = destinations.find((item) => item.id === id);
  const { image, loading } = useImage(destination ? destination.imageQuery || destination.name : "");

  if (!destination) {
    return (
      <div className="destination-not-found-container">
        <MapPin size={48} className="not-found-icon" />
        <h2>Destination Not Found</h2>
        <p>The destination you are looking for does not exist or has moved.</p>
        <Link to="/explore" className="back-explore-btn">
          <ArrowLeft size={16} /> Back to Explorer
        </Link>
      </div>
    );
  }

  return (
    <div className="destination-detail-page">
      {/* 01. Hero Banner */}
      <section className="detail-hero-banner">
        <div className="detail-hero-backdrop">
          {image ? (
            <img src={image} alt={destination.name} className="detail-hero-img" />
          ) : (
            <div className="detail-hero-fallback"></div>
          )}
          <div className="detail-hero-gradient"></div>
        </div>

        <div className="detail-hero-content">
          <Link to="/explore" className="detail-back-link">
            <ArrowLeft size={16} /> Back to All Destinations
          </Link>

          <div className="detail-tags-row">
            <span className="detail-region-badge">{destination.region}</span>
            <span className="detail-category-badge">{destination.category}</span>
          </div>

          <h1 className="detail-title">{destination.name}</h1>
          <p className="detail-tagline">{destination.tagline || destination.description}</p>
        </div>
      </section>

      {/* 02. Quick Facts Bar */}
      <section className="detail-facts-bar">
        <div className="fact-item">
          <Globe size={18} className="fact-icon" />
          <div>
            <span>Country</span>
            <strong>{destination.country}</strong>
          </div>
        </div>

        <div className="fact-item">
          <Calendar size={18} className="fact-icon" />
          <div>
            <span>Best Months</span>
            <strong>{destination.bestMonths || "Year-round"}</strong>
          </div>
        </div>

        <div className="fact-item">
          <Clock size={18} className="fact-icon" />
          <div>
            <span>Recommended Stay</span>
            <strong>{destination.idealDays || "3-5 Days"}</strong>
          </div>
        </div>

        <div className="fact-item">
          <Coins size={18} className="fact-icon" />
          <div>
            <span>Currency</span>
            <strong>{destination.currency || "Local Currency"}</strong>
          </div>
        </div>

        <div className="fact-item">
          <DollarSign size={18} className="fact-icon" />
          <div>
            <span>Budget Level</span>
            <strong>{destination.budget || "Moderate"}</strong>
          </div>
        </div>
      </section>

      {/* Main Details Body */}
      <div className="detail-body-container">
        {/* Left Column: Overview & Famous Places */}
        <div className="detail-left-column">
          {/* Overview Card */}
          <section className="detail-overview-section">
            <span className="section-eyebrow">ABOUT {destination.name.toUpperCase()}</span>
            <h2>
              A place worth <em className="glow-text">experiencing.</em>
            </h2>
            <p className="overview-paragraph">{destination.description}</p>
          </section>

          {/* Real-time Weather Section */}
          <section className="detail-weather-section">
            <WeatherCard
              latitude={destination.latitude}
              longitude={destination.longitude}
              locationName={destination.name}
            />
          </section>

          {/* Famous Places Section */}
          <section className="detail-places-section">
            <div className="places-section-header">
              <span className="section-eyebrow">MUST-SEE LANDMARKS</span>
              <h2>Famous Places in {destination.name}</h2>
              <p>Top iconic spots, architectural wonders, and natural highlights worth visiting.</p>
            </div>

            <div className="places-cards-grid">
              {destination.places.map((place, index) => (
                <PlaceCard
                  key={index}
                  place={place}
                  index={index}
                  destinationName={destination.name}
                />
              ))}
            </div>
          </section>

          {/* Itinerary Planner Section */}
          <section className="detail-itinerary-wrapper">
            <Itinerary destination={destination} />
          </section>
        </div>

        {/* Right Column: AI Assistant Concierge */}
        <div className="detail-right-column">
          <div className="sticky-sidebar-wrapper">
            <AIChat destinationName={destination.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationDetails;