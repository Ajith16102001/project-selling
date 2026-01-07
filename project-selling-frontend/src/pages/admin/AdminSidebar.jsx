export default function AdminSidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="admin-sidebar">
      <h2>Admin Panel</h2>

      <button
        className={activeTab === "dashboard" ? "active" : ""}
        onClick={() => setActiveTab("dashboard")}
      >
        Dashboard
      </button>

      <button
        className={activeTab === "projects" ? "active" : ""}
        onClick={() => setActiveTab("projects")}
      >
        Projects
      </button>

      <button
        className={activeTab === "analytics" ? "active" : ""}
        onClick={() => setActiveTab("analytics")}
      >
        Analytics
      </button>

      <button
        className="logout"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </aside>
  );
}
