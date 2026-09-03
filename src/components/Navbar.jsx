import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Compass, MapPin, Sparkles, Menu, X } from "lucide-react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Compass className="logo-icon" size={26} />
          <span>WANDER<span className="logo-dot">.</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links">
          <Link
            to="/"
            className={location.pathname === "/" ? "nav-link active" : "nav-link"}
          >
            Home
          </Link>

          <Link
            to="/explore"
            className={location.pathname === "/explore" ? "nav-link active" : "nav-link"}
          >
            Explore Destinations
          </Link>
        </nav>

        {/* Right Call-to-action */}
        <div className="navbar-actions">
          <Link to="/explore" className="nav-explore-btn">
            <Sparkles size={16} /> Start Exploring
          </Link>

          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav-links">
            <Link to="/" className="mobile-nav-link">
              Home
            </Link>
            <Link to="/explore" className="mobile-nav-link">
              Explore Destinations
            </Link>
            <Link to="/destination/tokyo" className="mobile-nav-link">
              Featured: Tokyo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
