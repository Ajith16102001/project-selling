export default function AdminMobileBar({ active, setActive, onLogout }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#020617] flex justify-around p-3 border-t border-gray-800 z-50">
      <button 
        onClick={() => setActive("dashboard")}
        className={`flex flex-col items-center gap-1 text-sm transition-all ${
          active === "dashboard" ? "text-blue-500 scale-110" : "text-gray-400"
        }`}
      >
        <span className="text-2xl">📊</span>
        <span className="text-xs">Dashboard</span>
      </button>
      
      <button 
        onClick={() => setActive("projects")}
        className={`flex flex-col items-center gap-1 text-sm transition-all ${
          active === "projects" ? "text-blue-500 scale-110" : "text-gray-400"
        }`}
      >
        <span className="text-2xl">📦</span>
        <span className="text-xs">Projects</span>
      </button>
      
      <button 
        onClick={() => setActive("analytics")}
        className={`flex flex-col items-center gap-1 text-sm transition-all ${
          active === "analytics" ? "text-blue-500 scale-110" : "text-gray-400"
        }`}
      >
        <span className="text-2xl">📈</span>
        <span className="text-xs">Analytics</span>
      </button>
      
      <button 
        onClick={onLogout}
        className="flex flex-col items-center gap-1 text-sm text-red-400"
      >
        <span className="text-2xl">🚪</span>
        <span className="text-xs">Logout</span>
      </button>
    </div>
  );
}
