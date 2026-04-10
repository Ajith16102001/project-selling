// Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <nav className="w-full px-8 py-5 flex items-center justify-between bg-black text-white border-b border-white/10">
      {/* Logo - Hide on mobile */}
      {!isMobile && (
        <h1 className="text-2xl font-bold tracking-wide">
          AK Tech <span className="text-purple-500">Solution</span>
        </h1>
      )}

      {/* Links - Hide on mobile (will use hamburger menu) */}
      {!isMobile && (
        <div className="space-x-6 text-sm font-medium">
          {/* Home */}
          <Link
            className="hover:text-purple-400 transition"
            to="/"
          >
            Home
          </Link>

          {/* Projects */}
          <Link
            className="hover:text-purple-400 transition"
            to="/projects"
          >
            Projects
          </Link>

          {/* Contact */}
          {isHome ? (
            <a
              href="#contact"
              className="hover:text-purple-400 transition cursor-pointer"
            >
              Contact
            </a>
          ) : (
            <Link
              to="/#contact"
              className="hover:text-purple-400 transition"
            >
              Contact
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
