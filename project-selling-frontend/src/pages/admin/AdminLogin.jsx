import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ HARD ADMIN CREDENTIALS
    if (
      email === "admin@aktechsolution.com" &&
      password === "ajith0018"
    ) {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      
      {/* Glow Background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20"></div>

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl animate-fadeIn"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Admin Login
        </h2>
        <p className="text-gray-400 text-center mb-8">
          AK Tech Solution – Secure Access
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="text-gray-400 text-sm">Admin Email</label>
          <input
            type="email"
            className="w-full mt-1 px-4 py-3 rounded-xl bg-black/60 text-white border border-gray-700 focus:outline-none focus:border-blue-500 transition"
            placeholder="admin@aktechsolution.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="text-gray-400 text-sm">Password</label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-3 rounded-xl bg-black/60 text-white border border-gray-700 focus:outline-none focus:border-blue-500 transition"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all duration-300 shadow-lg hover:scale-[1.02]"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          © 2025 AK Tech Solution
        </p>
      </form>

      {/* Animation */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AdminLogin;
