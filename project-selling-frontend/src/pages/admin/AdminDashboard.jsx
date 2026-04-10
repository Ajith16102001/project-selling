import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminProjects from "./AdminProjects";
import AdminAnalytics from "./AdminAnalytics";
import AdminMobileBar from "./AdminMobileBar";

const API = "https://project-selling-backend.onrender.com/api/projects";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR - DESKTOP ONLY */}
      <aside className="sidebar">
        <h2 className="logo">Admin Panel</h2>

        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Dashboard
        </button>

        <button
          className={activeTab === "projects" ? "active" : ""}
          onClick={() => setActiveTab("projects")}
        >
          📦 Projects
        </button>

        <button
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          📈 Analytics
        </button>

        <button className="logout" onClick={logout}>
          🚪 Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        {activeTab === "dashboard" && <DashboardHome />}
        {activeTab === "projects" && <AdminProjects />}
        {activeTab === "analytics" && <AdminAnalytics />}
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <AdminMobileBar active={activeTab} setActive={setActiveTab} onLogout={logout} />

      <style>{`
        /* Desktop styles -保持不变 */
        .admin-layout {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          width: 260px;
          background: #0f172a;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
        }

        .logo {
          color: #fff;
          font-size: 20px;
          margin-bottom: 24px;
          padding-left: 12px;
        }

        .sidebar button {
          background: transparent;
          border: none;
          color: #94a3b8;
          padding: 12px 16px;
          text-align: left;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .sidebar button.active {
          background: #3b82f6;
          color: #fff;
        }

        .sidebar button.logout {
          margin-top: auto;
          color: #ef4444;
        }

        .content {
          flex: 1;
          margin-left: 260px;
          background: #020617;
          min-height: 100vh;
        }

        /* Stats container */
        .stats {
          display: flex;
          gap: 20px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .stat-card {
          flex: 1;
          background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 25px 60px rgba(0,0,0,.6);
          min-width: 180px;
        }

        .stat-card h4 {
          color: #94a3b8;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .stat-card h2 {
          color: #fff;
          font-size: 36px;
          margin: 0;
        }

        h1 {
          color: #fff;
          font-size: 28px;
          margin: 0;
          padding: 0;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }
          
          .content {
            margin-left: 0;
            padding: 16px;
            padding-bottom: 80px;
          }
          
          h1 {
            font-size: 24px;
            margin-bottom: 16px;
          }
          
          /* Make stats stack vertically on mobile */
          .stats {
            flex-direction: column;
            gap: 12px;
          }
          
          .stat-card {
            width: 100%;
            padding: 20px;
            min-width: auto;
          }
          
          .stat-card h2 {
            font-size: 32px;
          }
          
          .stat-card h4 {
            font-size: 14px;
          }
        }
        
        @media (min-width: 769px) {
          .sidebar {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}

/* ================= DASHBOARD ================= */

function DashboardHome() {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    sold: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(API);
      const projects = res.data || [];

      setStats({
        total: projects.length,
        available: projects.filter(p => p.status === "available").length,
        sold: projects.filter(p => p.status === "sold").length,
      });
    } catch (err) {
      console.error("Dashboard fetch error", err);
    }
  };

  return (
    <>
      <h1>Dashboard</h1>
      <div className="stats">
        <Stat title="Total Projects" value={stats.total} />
        <Stat title="Available" value={stats.available} />
        <Stat title="Sold" value={stats.sold} />
      </div>
    </>
  );
}

function Stat({ title, value }) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}
