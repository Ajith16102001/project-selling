export default function AdminMobileBar({ active, setActive, onLogout }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#020617] flex justify-around p-3 border-t border-gray-800 z-50">
      <button onClick={() => setActive("projects")}>
        📦
      </button>
      <button onClick={() => setActive("analytics")}>
        📊
      </button>
      <button onClick={onLogout}>
        🚪
      </button>
    </div>
  );
}
