// Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HeroSlider from "../components/HeroSlider";
import WhyChooseUs from "../components/WhyChooseUs";
import ContactSection from "../components/ContactSection";

const Home = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && !e.target.closest('.mobile-nav') && !e.target.closest('.hamburger')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Navigate to Projects page
  const goToProjects = () => {
    setMobileMenuOpen(false);
    navigate('/projects');
  };

  return (
    <MainLayout>
      {/* Mobile Header - Black Background */}
      <div className="mobile-header">
        <div className="header-left">
          <button 
            className="hamburger" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
          </button>
          <span className="project-selling-text">
            AK Tech <span className="purple-text">Solution</span>
          </span>
        </div>
      </div>

      {/* Mobile Navigation Menu - Slide Open */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
        <nav>
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            Home
          </a>
          <button 
            className="nav-link-btn"
            onClick={goToProjects}
          >
            Projects
          </button>
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            Contact
          </a>
        </nav>
      </div>

      {/* Add anchor sections for navigation */}
      <div id="home">
        <HeroSlider />
      </div>
      <div id="projects">
        <WhyChooseUs />
      </div>
      <div id="contact">
        <ContactSection />
      </div>

      <style jsx>{`
        /* Mobile Header Styles - Black Background */
        .mobile-header {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #000000;
          padding: 0.8rem 1rem;
          align-items: center;
          z-index: 1001;
          box-shadow: 0 2px 15px rgba(0,0,0,0.3);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Hamburger Button */
        .hamburger {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 1002;
          position: relative;
        }

        .hamburger-line {
          width: 28px;
          height: 3px;
          background: #ffffff;
          border-radius: 3px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger-line.open:nth-child(1) {
          transform: rotate(45deg) translate(6px, 7px);
        }

        .hamburger-line.open:nth-child(2) {
          opacity: 0;
          transform: translateX(-10px);
        }

        .hamburger-line.open:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -7px);
        }

        /* Stylish Text - AK Tech White, Solution Purple */
        .project-selling-text {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255,255,255,0.2);
          font-family: 'Poppins', 'Segoe UI', sans-serif;
        }

        .purple-text {
          background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 50%, #6c3483 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 15px rgba(155, 89, 182, 0.5);
          font-weight: 800;
          position: relative;
          display: inline-block;
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(155, 89, 182, 0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(155, 89, 182, 0.6);
          }
        }

        /* Hover effect */
        .project-selling-text:hover {
          transform: scale(1.02);
          transition: transform 0.3s ease;
        }

        /* Mobile Navigation Menu */
        .mobile-nav {
          position: fixed;
          top: 0;
          left: -100%;
          width: 75%;
          max-width: 300px;
          height: 100vh;
          background: #000000;
          box-shadow: 2px 0 30px rgba(0,0,0,0.5);
          z-index: 1000;
          transition: left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          padding-top: 80px;
          overflow-y: auto;
        }

        .mobile-nav.active {
          left: 0;
        }

        .mobile-nav nav {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .mobile-nav a,
        .nav-link-btn {
          padding: 1rem 1.8rem;
          text-decoration: none;
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 600;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          width: 100%;
          font-family: inherit;
        }

        .mobile-nav a::before,
        .nav-link-btn::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0;
          background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
          transition: width 0.3s ease;
          z-index: -1;
        }

        .mobile-nav a:hover::before,
        .nav-link-btn:hover::before {
          width: 100%;
        }

        .mobile-nav a:hover,
        .nav-link-btn:hover {
          color: white;
          padding-left: 2.2rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .mobile-header {
            display: flex;
          }

          /* Add padding to main content */
          :global(main), .main-content, [class*="MainLayout"] > div:first-child {
            padding-top: 70px !important;
            margin-top: 0 !important;
          }

          html, body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          #home, #contact {
            scroll-margin-top: 70px;
          }
        }

        /* Desktop view - hide mobile elements */
        @media (min-width: 769px) {
          .mobile-header,
          .mobile-nav {
            display: none;
          }
        }
      `}</style>
    </MainLayout>
  );
};

export default Home;
