import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-center text-gray-500 py-6 text-sm">
      © 2025 AK Tech Solution. All rights reserved.
      <div className="mt-2">
        <Link to="/admin/login" className="hover:text-white">
          Admin Login
        </Link>
      </div>
    </footer>
  );
}
