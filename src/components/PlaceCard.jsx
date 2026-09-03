import { useState, useEffect } from "react";
import useImage from "../hooks/useImage";
import { MapPin, Info, X, Sparkles } from "lucide-react";

function PlaceCard({ place, index, destinationName }) {
  const [showModal, setShowModal] = useState(false);
  const searchQuery = `${destinationName} ${place.name}`;
  const { image, loading } = useImage(searchQuery);

  const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal]);

  return (
    <>
      <article className="place-card">
        <div className="place-image-container">
          {loading ? (
            <div className="place-image-skeleton"></div>
          ) : image ? (
            <img
              src={image}
              alt={place.name}
              className="place-image"
              loading="lazy"
            />
          ) : (
            <div className="place-image-fallback">
              <span>{place.name}</span>
            </div>
          )}

          <div className="place-overlay">
            <span className="place-index-badge">{formattedIndex}</span>
            {place.tag && <span className="place-tag">{place.tag}</span>}
          </div>
        </div>

        <div className="place-content">
          <div className="place-header">
            <MapPin size={16} className="place-pin-icon" />
            <h3>{place.name}</h3>
          </div>

          <p className="place-description">{place.description}</p>

          <button
            onClick={() => setShowModal(true)}
            className="place-tip-btn"
            aria-haspopup="dialog"
          >
            <Info size={14} /> Visitor Guide
          </button>
        </div>
      </article>

      {/* Place Details Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)} role="presentation">
          <div
            className="modal-content-box"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`place-modal-title-${formattedIndex}`}
          >
            <button
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {image && (
              <div className="modal-hero-image">
                <img src={image} alt={place.name} />
                <span className="modal-tag-badge">{place.tag || "Must Visit"}</span>
              </div>
            )}

            <div className="modal-body">
              <span className="modal-eyebrow">{destinationName} Famous Place #{formattedIndex}</span>
              <h2>{place.name}</h2>
              <p className="modal-desc">{place.description}</p>

              <div className="modal-tip-box">
                <div className="modal-tip-header">
                  <Sparkles size={18} />
                  <span>INSIDER VISITOR TIP</span>
                </div>
                <p>
                  Visit early in the morning right around 8:00 AM or near sunset for the best lighting, fewer crowds, and stunning photo opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PlaceCard;
