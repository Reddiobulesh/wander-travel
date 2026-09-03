import { Link } from "react-router-dom";
import useImage from "../hooks/useImage";
import { ArrowRight, Star, Clock, MapPin, Sparkles } from "lucide-react";

function DestinationCard({ destination }) {
  const { image, loading } = useImage(
    destination.imageQuery || destination.name
  );

  return (
    <article className="destination-card">
      <div className="destination-image">
        {loading ? (
          <div className="image-loading"></div>
        ) : image ? (
          <img
            src={image}
            alt={`${destination.name}, ${destination.country}`}
            loading="lazy"
          />
        ) : (
          <div className="image-fallback">
            <span>{destination.name}</span>
          </div>
        )}

        <div className="card-top-badges">
          <span className="destination-region-badge">{destination.region}</span>
          <span className="destination-rating-badge">
            <Star size={12} fill="#F59E0B" color="#F59E0B" /> 4.9
          </span>
        </div>

        {destination.category && (
          <span className="destination-category-tag">{destination.category}</span>
        )}
      </div>

      <div className="destination-card-content">
        <div className="card-meta-top">
          <span className="destination-country">
            <MapPin size={13} className="pin-icon-country" /> {destination.country}
          </span>
          {destination.idealDays && (
            <span className="card-duration">
              <Clock size={13} /> {destination.idealDays}
            </span>
          )}
        </div>

        <h2 className="card-destination-title">{destination.name}</h2>

        <p className="destination-description">{destination.description}</p>

        <div className="card-footer-action">
          <Link
            to={`/destination/${destination.id}`}
            className="explore-card-btn"
          >
            <span>Explore Now</span>
            <ArrowRight size={16} className="card-arrow-icon" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DestinationCard;
