import { useState, useEffect } from "react";
import { generateItineraryPlan } from "../services/aiService";
import { Calendar, Compass, Sun, Moon, Sparkles, CheckSquare, Square, Printer, Copy, Check } from "lucide-react";

function Itinerary({ destination }) {
  const [daysCount, setDaysCount] = useState(3);
  const [travelStyle, setTravelStyle] = useState("Balanced");
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [completedActivities, setCompletedActivities] = useState({});
  const [copied, setCopied] = useState(false);

  const stylesList = ["Balanced", "Cultural", "Adventure", "Luxury", "Budget Friendly", "Family"];

  const buildPlan = async () => {
    setLoading(true);
    try {
      const plan = await generateItineraryPlan(destination, daysCount, travelStyle);
      setItinerary(plan);
    } catch (err) {
      console.error("Failed to generate itinerary:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (destination) {
      buildPlan();
    }
  }, [destination, daysCount, travelStyle]);

  const toggleCheck = (dayIdx, key) => {
    const itemKey = `${dayIdx}-${key}`;
    setCompletedActivities((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  const handleCopy = () => {
    if (!itinerary || itinerary.length === 0) return;
    const text = itinerary
      .map(
        (day) =>
          `DAY ${day.day}: ${day.title}\n• Morning: ${day.morning}\n• Afternoon: ${day.afternoon}\n• Evening: ${day.evening}\n• Insider Tip: ${day.tip}\n`
      )
      .join("\n");

    navigator.clipboard.writeText(`Wander Travel Itinerary for ${destination?.name || "Trip"}\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="itinerary-section">
      <div className="itinerary-header">
        <div className="itinerary-title-box">
          <span className="section-eyebrow-badge">
            <Calendar size={14} /> TRIP PLANNER & ITINERARY
          </span>
          <h2>
            Your Custom Day-by-Day Plan for <em className="glow-text">{destination?.name || "Destination"}</em>
          </h2>
          <p className="itinerary-subtitle">
            Generate an interactive, structured daily itinerary tailored to your duration and travel style.
          </p>
        </div>

        <div className="itinerary-actions">
          <button onClick={handleCopy} className="itinerary-action-btn">
            {copied ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
            <span>{copied ? "Copied!" : "Copy Plan"}</span>
          </button>
          <button onClick={handlePrint} className="itinerary-action-btn print-btn">
            <Printer size={16} />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="itinerary-controls-card">
        <div className="control-group">
          <label>Trip Duration:</label>
          <div className="button-segmented">
            {[3, 5, 7].map((num) => (
              <button
                key={num}
                className={daysCount === num ? "segment-btn active" : "segment-btn"}
                onClick={() => setDaysCount(num)}
              >
                {num} Days
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label>Travel Style:</label>
          <div className="style-chips-scroll">
            {stylesList.map((style) => (
              <button
                key={style}
                className={travelStyle === style ? "style-chip active" : "style-chip"}
                onClick={() => setTravelStyle(style)}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rendered Itinerary Plan Cards */}
      {loading ? (
        <div className="itinerary-loading-skeleton">
          <div className="skeleton-day-card"></div>
          <div className="skeleton-day-card"></div>
          <div className="skeleton-day-card"></div>
        </div>
      ) : (
        <div className="itinerary-days-grid">
          {itinerary.map((dayItem, idx) => (
            <article key={idx} className="day-card">
              <div className="day-card-header">
                <div className="day-badge">DAY 0{dayItem.day}</div>
                <h3>{dayItem.title}</h3>
              </div>

              <div className="day-activities-list">
                {/* Morning Activity */}
                <div
                  className={
                    completedActivities[`${idx}-morning`]
                      ? "activity-block completed"
                      : "activity-block"
                  }
                  onClick={() => toggleCheck(idx, "morning")}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      toggleCheck(idx, "morning");
                    }
                  }}
                  tabIndex={0}
                  role="checkbox"
                  aria-checked={Boolean(completedActivities[`${idx}-morning`])}
                  aria-label={`Morning activity: ${dayItem.morning}`}
                >
                  <div className="activity-icon-col">
                    {completedActivities[`${idx}-morning`] ? (
                      <CheckSquare className="check-icon checked" size={18} />
                    ) : (
                      <Square className="check-icon" size={18} />
                    )}
                    <Sun size={16} className="time-icon morning" />
                  </div>
                  <div className="activity-text-col">
                    <span className="time-label">MORNING</span>
                    <p>{dayItem.morning}</p>
                  </div>
                </div>

                {/* Afternoon Highlight */}
                <div
                  className={
                    completedActivities[`${idx}-afternoon`]
                      ? "activity-block completed"
                      : "activity-block"
                  }
                  onClick={() => toggleCheck(idx, "afternoon")}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      toggleCheck(idx, "afternoon");
                    }
                  }}
                  tabIndex={0}
                  role="checkbox"
                  aria-checked={Boolean(completedActivities[`${idx}-afternoon`])}
                  aria-label={`Afternoon activity: ${dayItem.afternoon}`}
                >
                  <div className="activity-icon-col">
                    {completedActivities[`${idx}-afternoon`] ? (
                      <CheckSquare className="check-icon checked" size={18} />
                    ) : (
                      <Square className="check-icon" size={18} />
                    )}
                    <Compass size={16} className="time-icon afternoon" />
                  </div>
                  <div className="activity-text-col">
                    <span className="time-label">AFTERNOON</span>
                    <p>{dayItem.afternoon}</p>
                  </div>
                </div>

                {/* Evening Experience */}
                <div
                  className={
                    completedActivities[`${idx}-evening`]
                      ? "activity-block completed"
                      : "activity-block"
                  }
                  onClick={() => toggleCheck(idx, "evening")}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      toggleCheck(idx, "evening");
                    }
                  }}
                  tabIndex={0}
                  role="checkbox"
                  aria-checked={Boolean(completedActivities[`${idx}-evening`])}
                  aria-label={`Evening activity: ${dayItem.evening}`}
                >
                  <div className="activity-icon-col">
                    {completedActivities[`${idx}-evening`] ? (
                      <CheckSquare className="check-icon checked" size={18} />
                    ) : (
                      <Square className="check-icon" size={18} />
                    )}
                    <Moon size={16} className="time-icon evening" />
                  </div>
                  <div className="activity-text-col">
                    <span className="time-label">EVENING & DINING</span>
                    <p>{dayItem.evening}</p>
                  </div>
                </div>
              </div>

              {/* Day Footer Insider Tip */}
              <div className="day-card-footer">
                <div className="day-tip">
                  <Sparkles size={14} className="sparkle-gold" />
                  <span><strong>Insider Tip:</strong> {dayItem.tip}</span>
                </div>
                {dayItem.food && (
                  <div className="day-food">
                    <span>🍽️ <strong>Culinary Highlight:</strong> {dayItem.food}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Itinerary;
