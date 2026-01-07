import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <nav className="w-full px-8 py-5 flex items-center justify-between bg-black text-white border-b border-white/10">
      {/* Logo */}
      <h1 className="text-2xl font-bold tracking-wide">
        AK Tech <span className="text-purple-500">Solution</span>
      </h1>

      {/* Links */}
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
          // If already on Home → scroll
          <a
            href="#contact"
            className="hover:text-purple-400 transition cursor-pointer"
          >
            Contact
          </a>
        ) : (
          // If not on Home → go Home then scroll
          <Link
            to="/#contact"
            className="hover:text-purple-400 transition"
          >
            Contact
          </Link>
        )}
      </div>
    </nav>
  );
}
