import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Compass, ChevronDown, Sparkles, Video, Globe2, SunMedium, Bot, Volume2, VolumeX } from "lucide-react";

function Hero() {
  const [query, setQuery] = useState("");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const videoSources = [
    {
      title: "🌴 Tropical Coast",
      url: "https://assets.mixkit.co/videos/preview/mixkit-tropical-beach-with-palm-trees-and-turquoise-water-41221-large.mp4",
      poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    },
    {
      title: "🏙️ Metropolis Lights",
      url: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-41549-large.mp4",
      poster: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=80",
    },
    {
      title: "🌊 Ocean Waves",
      url: "https://assets.mixkit.co/videos/preview/mixkit-top-aerial-view-of-the-sea-waves-41537-large.mp4",
      poster: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80",
    },
  ];

  // Enforce autoplay & handle mute/unmute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Auto-play fallback:", error);
        });
      }
    }
  }, [currentVideoIndex, isMuted]);

  const toggleAudio = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/explore");
    }
  };

  const handleRegionClick = (region) => {
    navigate(`/explore?region=${encodeURIComponent(region)}`);
  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight - 70,
      behavior: "smooth",
    });
  };

  return (
    <section className="hero-section">
      {/* Background Video Stream */}
      <div className="hero-video-container">
        <video
          ref={videoRef}
          key={videoSources[currentVideoIndex].url}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={videoSources[currentVideoIndex].poster}
          className="hero-background-video"
        >
          <source src={videoSources[currentVideoIndex].url} type="video/mp4" />
        </video>
        <div className="hero-gradient-overlay"></div>
      </div>

      {/* Hero Video Ambience Switcher & Audio Controls */}
      <div className="hero-ambience-switcher">
        <span className="ambience-label">
          <Video size={13} /> AMBIENCE:
        </span>
        {videoSources.map((source, index) => (
          <button
            key={index}
            className={currentVideoIndex === index ? "ambience-btn active" : "ambience-btn"}
            onClick={() => setCurrentVideoIndex(index)}
          >
            {source.title}
          </button>
        ))}

        {/* Mute/Unmute Audio Toggle */}
        <button
          onClick={toggleAudio}
          className="video-audio-btn"
          title={isMuted ? "Unmute Video Audio" : "Mute Video Audio"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} color="#10B981" />}
        </button>
      </div>

      {/* Hero Central Content Wrapper */}
      <div className="hero-content-wrapper">
        <div className="hero-badge">
          <Sparkles size={14} className="sparkle-gold" />
          <span>EDITORIAL TRAVEL CONCIERGE</span>
        </div>

        <h1 className="hero-title">
          Find somewhere
          <br />
          <em className="serif-italic glow-text">worth going.</em>
        </h1>

        <p className="hero-subtitle">
          Discover remarkable world destinations, check live weather, explore iconic landmarks,
          and generate tailored AI day-by-day itineraries.
        </p>

        {/* Hero Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="hero-search-box">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search Tokyo, Paris, Bali, beaches, historical places..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="hero-search-btn">
            Explore <Compass size={18} />
          </button>
        </form>

        {/* Quick Region Pills */}
        <div className="hero-regions-pills">
          <span className="pills-label">Popular Continents:</span>
          {["Asia", "Europe", "Americas", "Oceania", "Africa"].map((region) => (
            <button
              key={region}
              onClick={() => handleRegionClick(region)}
              className="hero-region-pill"
            >
              {region}
            </button>
          ))}
        </div>

        {/* Floating Quick Stats Bar */}
        <div className="hero-stats-ticker">
          <div className="ticker-stat">
            <Globe2 size={16} className="ticker-icon" />
            <span>10+ World Destinations</span>
          </div>
          <div className="ticker-divider"></div>
          <div className="ticker-stat">
            <SunMedium size={16} className="ticker-icon" />
            <span>Live Weather API</span>
          </div>
          <div className="ticker-divider"></div>
          <div className="ticker-stat">
            <Bot size={16} className="ticker-icon" />
            <span>Gemini AI Concierge</span>
          </div>
        </div>
      </div>

      {/* Interactive Scroll Down Indicator */}
      <div className="hero-scroll-indicator" onClick={scrollToNextSection}>
        <span>SCROLL TO DISCOVER</span>
        <div className="scroll-mouse-icon">
          <div className="scroll-mouse-wheel"></div>
        </div>
        <ChevronDown size={18} className="bounce-arrow" />
      </div>
    </section>
  );
}

export default Hero;
