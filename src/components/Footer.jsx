import { Compass, Heart, Globe, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand-col">
          <Link to="/" className="footer-logo">
            <Compass className="logo-icon" size={24} />
            <span>WANDER<span className="logo-dot">.</span></span>
          </Link>
          <p className="footer-tagline">
            An editorial travel application crafted for exploring world destinations, real-time weather, famous landmarks, and AI itinerary planning.
          </p>
        </div>

        <div className="footer-links-col">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home Landing</Link></li>
            <li><Link to="/explore">Destination Explorer</Link></li>
            <li><Link to="/destination/tokyo">Tokyo Experience</Link></li>
            <li><Link to="/destination/paris">Paris Experience</Link></li>
          </ul>
        </div>

        <div className="footer-tech-col">
          <h4>Tech & Integrations</h4>
          <ul>
            <li>React 19 & Vite 8</li>
            <li>Open-Meteo Weather API</li>
            <li>Unsplash API Engine</li>
            <li>Google Gemini AI Concierge</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>© 2026 WANDER Travel. All rights reserved.</p>
        <div className="footer-credit">
          <span>Crafted with <Heart size={14} className="heart-icon" /> for Design Excellence</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
