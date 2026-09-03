import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import destinations from "../data/destinations";
import DestinationCard from "../components/DestinationCard";
import { Search, Filter, X, MapPin, Compass } from "lucide-react";

function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialRegion = searchParams.get("region") || "All";

  const [search, setSearch] = useState(initialSearch);
  const [activeRegion, setActiveRegion] = useState(initialRegion);
  const [activeCategory, setActiveCategory] = useState("All");

  const regions = ["All", "Asia", "Europe", "Americas", "Oceania", "Africa"];
  const categories = ["All", "Modern & Cultural", "Romantic & Historical", "Tropical & Beach", "Luxury & Futuristic", "Nature & Coastal"];

  useEffect(() => {
    const s = searchParams.get("search");
    const r = searchParams.get("region");
    if (s !== null) setSearch(s);
    if (r !== null) setActiveRegion(r);
  }, [searchParams]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        dest.name.toLowerCase().includes(q) ||
        dest.country.toLowerCase().includes(q) ||
        dest.description.toLowerCase().includes(q) ||
        dest.places.some((p) => p.name.toLowerCase().includes(q));

      const matchesRegion =
        activeRegion === "All" || dest.region === activeRegion;

      const matchesCategory =
        activeCategory === "All" || dest.category === activeCategory;

      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [search, activeRegion, activeCategory]);

  const clearFilters = () => {
    setSearch("");
    setActiveRegion("All");
    setActiveCategory("All");
    setSearchParams({});
  };

  return (
    <div className="explore-page-wrapper">
      {/* Rich Background Image Banner Header */}
      <section className="explore-hero-banner">
        <div className="explore-hero-backdrop">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
            alt="Scenic World Travel Landscapes"
            className="explore-hero-bg-img"
          />
          <div className="explore-hero-gradient"></div>
        </div>

        <div className="explore-hero-content">
          <header className="explore-header-box">
            <div className="explore-badge">
              <Compass size={16} />
              <span>WORLD DESTINATION EXPLORER</span>
            </div>

            <h1>
              Find somewhere <br />
              <em className="serif-italic glow-text">worth going.</em>
            </h1>

            <p className="explore-intro">
              Browse world destinations, filter by continent or travel vibe, and explore famous places and live weather.
            </p>

            {/* Controls Section */}
            <div className="explore-controls-card">
              <div className="explore-search-input-wrap">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by city, country, or landmark (e.g. Tokyo, Eiffel Tower)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button onClick={() => setSearch("")} className="clear-input-btn" aria-label="Clear search">
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Region Filters */}
              <div className="filter-group">
                <span className="filter-label">Continents:</span>
                <div className="filter-pills-row">
                  {regions.map((reg) => (
                    <button
                      key={reg}
                      className={activeRegion === reg ? "filter-pill active" : "filter-pill"}
                      onClick={() => setActiveRegion(reg)}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filters */}
              <div className="filter-group">
                <span className="filter-label">Travel Vibe:</span>
                <div className="filter-pills-row">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={activeCategory === cat ? "filter-pill active" : "filter-pill"}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </header>
        </div>
      </section>

      <div className="explore-page-container">

      {/* Destination Grid & Results Bar */}
      <section className="explore-results-section">
        <div className="results-stats-bar">
          <span>Showing <strong>{filteredDestinations.length}</strong> of {destinations.length} destinations</span>

          {(search || activeRegion !== "All" || activeCategory !== "All") && (
            <button onClick={clearFilters} className="reset-filters-link">
              <X size={14} /> Reset All Filters
            </button>
          )}
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="destination-grid">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        ) : (
          <div className="empty-state-card">
            <Search size={40} className="empty-icon" />
            <h3>No destinations match your filters</h3>
            <p>Try searching for another city, country, or selecting "All" continents.</p>
            <button onClick={clearFilters} className="empty-reset-btn">
              Clear Search & Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
    </div>
  );
}

export default Explore;
