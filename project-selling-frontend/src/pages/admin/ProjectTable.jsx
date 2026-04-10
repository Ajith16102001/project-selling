import { useState, useEffect } from "react";

export default function ProjectTable({ projects, onDelete, onStatusChange }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="bg-[#020617] p-6 rounded-xl">
      <h2 className="font-semibold mb-4">📋 Projects ({projects.length})</h2>

      {/* Desktop Table View */}
      <div className="desktop-table">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Title</th>
              <th className="py-2">Price</th>
              <th className="py-2">Status</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-gray-800">
                <td className="py-3">{p.title}</td>
                <td className="py-3">₹{p.price}</td>
                <td className="py-3">
                  <select
                    value={p.status}
                    onChange={(e) => onStatusChange(p.id, e.target.value)}
                    className="bg-gray-800 p-1 rounded text-sm"
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                  </select>
                </td>
                <td className="py-3">
                  <button
                    onClick={() => onDelete(p.id)}
                    className="text-red-500 hover:text-red-400 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-cards">
        {projects.map((p) => (
          <div key={p.id} className="mobile-card">
            <div className="card-header">
              <span className="card-title">{p.title}</span>
              <span className="card-price">₹{p.price}</span>
            </div>
            <div className="card-body">
              <div className="card-status">
                <span className="status-label">Status:</span>
                <select
                  value={p.status}
                  onChange={(e) => onStatusChange(p.id, e.target.value)}
                  className="status-select"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
              <button
                onClick={() => onDelete(p.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="empty-state">No projects yet. Add your first project!</div>
        )}
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-table {
            display: none;
          }
          
          .mobile-cards {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          
          .mobile-card {
            background: rgba(255,255,255,0.05);
            border-radius: 12px;
            padding: 12px;
            border: 1px solid rgba(255,255,255,0.1);
          }
          
          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          
          .card-title {
            font-size: 16px;
            font-weight: 600;
            color: white;
          }
          
          .card-price {
            font-size: 16px;
            font-weight: 700;
            color: #22c55e;
          }
          
          .card-body {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .card-status {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .status-label {
            font-size: 12px;
            color: #94a3b8;
          }
          
          .status-select {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 6px;
            padding: 4px 8px;
            color: white;
            font-size: 12px;
            cursor: pointer;
          }
          
          .delete-btn {
            background: #ef4444;
            border: none;
            padding: 6px 12px;
            border-radius: 6px;
            color: white;
            font-size: 12px;
            cursor: pointer;
          }
          
          .empty-state {
            text-align: center;
            padding: 20px;
            color: #94a3b8;
            font-size: 14px;
          }
          
          h2 {
            font-size: 18px;
          }
        }
        
        @media (min-width: 769px) {
          .desktop-table {
            display: block;
          }
          
          .mobile-cards {
            display: none;
          }
          
          table th, table td {
            padding: 12px 8px;
          }
        }
      `}</style>
    </div>
  );
}
