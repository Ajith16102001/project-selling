import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://project-selling-backend.onrender.com/api/projects";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showMobileForm, setShowMobileForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    techStack: "",
    price: "",
    video: null,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get(API);
    setProjects(res.data || []);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    Object.keys(form).forEach((k) => {
      if (form[k]) fd.append(k, form[k]);
    });

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, fd);
      } else {
        await axios.post(API, fd);
      }
      fetchProjects();
      resetForm();
      setShowMobileForm(false);
    } catch {
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      title: "",
      shortDescription: "",
      description: "",
      techStack: "",
      price: "",
      video: null,
    });
  };

  const editProject = (p) => {
    setEditId(p.id);
    setForm({
      title: p.title,
      shortDescription: p.shortDescription,
      description: p.description,
      techStack: p.techStack,
      price: p.price,
      video: null,
    });
    setShowMobileForm(true);
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete project?")) return;
    await axios.delete(`${API}/${id}`);
    fetchProjects();
  };

  const toggleStatus = async (id, status) => {
    await axios.patch(`${API}/${id}/status`, {
      status: status === "available" ? "sold" : "available",
    });
    fetchProjects();
  };

  return (
    <div className="admin-projects-container">
      {/* DESKTOP FORM - Only visible on desktop */}
      <div className="desktop-form">
        <div className="form-card">
          <h2>{editId ? "✏️ Edit Project" : "➕ Add New Project"}</h2>
          <form onSubmit={submit}>
            <div className="form-row">
              <input
                className="form-input"
                placeholder="Project Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <input
                className="form-input"
                placeholder="Price (₹)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>
            <input
              className="form-input"
              placeholder="Short Description"
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              required
            />
            <input
              className="form-input"
              placeholder="Tech Stack (React, Node.js, etc.)"
              value={form.techStack}
              onChange={(e) => setForm({ ...form, techStack: e.target.value })}
            />
            <textarea
              className="form-textarea"
              placeholder="Full Description"
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <label className="file-upload">
              📹 Upload Demo Video
              <input
                type="file"
                hidden
                accept="video/*"
                onChange={(e) => setForm({ ...form, video: e.target.files[0] })}
              />
              {form.video && <span className="file-name">{form.video.name}</span>}
            </label>
            <div className="form-actions">
              {editId && (
                <button type="button" className="btn-cancel" onClick={resetForm}>
                  Cancel
                </button>
              )}
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Saving..." : editId ? "Update Project" : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* MOBILE ADD BUTTON - Floating action button */}
      <button className="mobile-fab" onClick={() => setShowMobileForm(true)}>
        +
      </button>

      {/* MOBILE FORM MODAL */}
      {showMobileForm && (
        <div className="mobile-modal" onClick={() => setShowMobileForm(false)}>
          <div className="mobile-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-modal-header">
              <h3>{editId ? "Edit Project" : "New Project"}</h3>
              <button className="modal-close" onClick={() => setShowMobileForm(false)}>✕</button>
            </div>
            <form onSubmit={submit}>
              <input
                className="mobile-input"
                placeholder="Project Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <input
                className="mobile-input"
                placeholder="Price (₹)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
              <input
                className="mobile-input"
                placeholder="Short Description"
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                required
              />
              <input
                className="mobile-input"
                placeholder="Tech Stack"
                value={form.techStack}
                onChange={(e) => setForm({ ...form, techStack: e.target.value })}
              />
              <textarea
                className="mobile-textarea"
                placeholder="Full Description"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <label className="mobile-file">
                📹 Upload Video
                <input
                  type="file"
                  hidden
                  accept="video/*"
                  onChange={(e) => setForm({ ...form, video: e.target.files[0] })}
                />
              </label>
              <div className="mobile-form-buttons">
                {editId && (
                  <button type="button" className="mobile-cancel" onClick={resetForm}>
                    Cancel
                  </button>
                )}
                <button type="submit" className="mobile-submit" disabled={loading}>
                  {loading ? "Saving..." : editId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECTS LIST */}
      <div className="projects-list-card">
        <div className="projects-header">
          <h2>📋 All Projects ({projects.length})</h2>
          <button className="mobile-header-add" onClick={() => setShowMobileForm(true)}>
            + Add
          </button>
        </div>

        {/* DESKTOP TABLE VIEW */}
        <div className="desktop-table">
          <table className="projects-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Tech Stack</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td className="project-title">{p.title}</td>
                  <td className="project-price">₹{p.price}</td>
                  <td className="project-stack">{p.techStack || "—"}</td>
                  <td>
                    <button
                      className={`status-btn ${p.status}`}
                      onClick={() => toggleStatus(p.id, p.status)}
                    >
                      {p.status}
                    </button>
                  </td>
                  <td className="action-buttons">
                    <button className="edit-btn" onClick={() => editProject(p)}>
                      ✏️ Edit
                    </button>
                    <button className="delete-btn" onClick={() => deleteProject(p.id)}>
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty-row">
                    No projects yet. Add your first project!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="mobile-cards">
          {projects.map((p) => (
            <div key={p.id} className="project-card">
              <div className="card-row">
                <span className="card-label">Title:</span>
                <span className="card-value">{p.title}</span>
              </div>
              <div className="card-row">
                <span className="card-label">Price:</span>
                <span className="card-price">₹{p.price}</span>
              </div>
              <div className="card-row">
                <span className="card-label">Tech Stack:</span>
                <span className="card-value">{p.techStack || "—"}</span>
              </div>
              <div className="card-row">
                <span className="card-label">Status:</span>
                <button
                  className={`mobile-status-btn ${p.status}`}
                  onClick={() => toggleStatus(p.id, p.status)}
                >
                  {p.status}
                </button>
              </div>
              <div className="card-actions">
                <button className="mobile-edit-btn" onClick={() => editProject(p)}>
                  ✏️ Edit Project
                </button>
                <button className="mobile-delete-btn" onClick={() => deleteProject(p.id)}>
                  🗑️ Delete Project
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="mobile-empty">
              <div className="empty-emoji">📭</div>
              <p>No projects yet</p>
              <button className="empty-add-btn" onClick={() => setShowMobileForm(true)}>
                + Add Your First Project
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* ========== BASE CONTAINER ========== */
        .admin-projects-container {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
          color: #fff;
        }

        /* ========== FORM STYLES (DESKTOP) ========== */
        .form-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 25px 60px rgba(0,0,0,.6);
        }

        .form-card h2 {
          font-size: 20px;
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .form-input, .form-textarea {
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          padding: 12px 16px;
          color: #fff;
          font-size: 14px;
          width: 100%;
          margin-bottom: 16px;
          box-sizing: border-box;
        }

        .form-textarea {
          resize: vertical;
        }

        .file-upload {
          display: block;
          padding: 12px 16px;
          border: 1px dashed rgba(255,255,255,0.25);
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
          font-size: 14px;
          background: rgba(0,0,0,0.3);
          margin-bottom: 16px;
        }

        .file-name {
          display: block;
          font-size: 11px;
          color: #22c55e;
          margin-top: 6px;
        }

        .form-actions {
          display: flex;
          gap: 12px;
        }

        .btn-submit {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          background: linear-gradient(135deg,#3b82f6,#2563eb);
          border: none;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }

        .btn-cancel {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }

        /* ========== PROJECTS LIST CARD ========== */
        .projects-list-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 25px 60px rgba(0,0,0,.6);
        }

        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .projects-header h2 {
          font-size: 20px;
          margin: 0;
        }

        /* ========== DESKTOP TABLE ========== */
        .projects-table {
          width: 100%;
          border-collapse: collapse;
        }

        .projects-table th {
          text-align: left;
          padding: 12px 8px;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          color: #94a3b8;
          font-weight: 600;
          font-size: 13px;
        }

        .projects-table td {
          padding: 14px 8px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          font-size: 14px;
        }

        .project-title {
          font-weight: 500;
        }

        .project-price {
          color: #22c55e;
          font-weight: 600;
        }

        .project-stack {
          font-size: 12px;
          color: #94a3b8;
        }

        .status-btn {
          border: none;
          padding: 6px 16px;
          border-radius: 20px;
          color: #fff;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .status-btn.available {
          background: #22c55e;
        }

        .status-btn.sold {
          background: #ef4444;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        .edit-btn {
          background: #f59e0b;
          border: none;
          padding: 6px 14px;
          border-radius: 6px;
          color: #fff;
          cursor: pointer;
          font-size: 12px;
        }

        .delete-btn {
          background: #ef4444;
          border: none;
          padding: 6px 14px;
          border-radius: 6px;
          color: #fff;
          cursor: pointer;
          font-size: 12px;
        }

        .empty-row {
          text-align: center;
          padding: 40px;
          color: #64748b;
        }

        /* ========== MOBILE FAB BUTTON ========== */
        .mobile-fab {
          display: none;
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 56px;
          height: 56px;
          border-radius: 28px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border: none;
          color: #fff;
          font-size: 32px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          z-index: 100;
          align-items: center;
          justify-content: center;
        }

        /* ========== MOBILE HEADER ADD BUTTON ========== */
        .mobile-header-add {
          display: none;
          background: #3b82f6;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
        }

        /* ========== MOBILE MODAL ========== */
        .mobile-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          z-index: 1000;
          display: none;
          align-items: flex-end;
        }

        .mobile-modal-content {
          background: linear-gradient(145deg, #0f172a, #020617);
          border-radius: 24px 24px 0 0;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          padding: 20px;
        }

        .mobile-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .mobile-modal-header h3 {
          font-size: 20px;
          margin: 0;
        }

        .modal-close {
          background: rgba(255,255,255,0.1);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 18px;
          color: #fff;
          font-size: 20px;
          cursor: pointer;
        }

        .mobile-input, .mobile-textarea {
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          padding: 14px;
          color: #fff;
          font-size: 15px;
          width: 100%;
          margin-bottom: 12px;
          box-sizing: border-box;
        }

        .mobile-textarea {
          resize: vertical;
        }

        .mobile-file {
          display: block;
          padding: 14px;
          border: 1px dashed rgba(255,255,255,0.25);
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
          font-size: 14px;
          background: rgba(0,0,0,0.3);
          margin-bottom: 16px;
        }

        .mobile-form-buttons {
          display: flex;
          gap: 12px;
        }

        .mobile-submit {
          flex: 1;
          padding: 14px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border: none;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          font-size: 15px;
        }

        .mobile-cancel {
          flex: 1;
          padding: 14px;
          border-radius: 12px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          font-size: 15px;
        }

        /* ========== MOBILE CARD VIEW ========== */
        .mobile-cards {
          display: none;
          flex-direction: column;
          gap: 16px;
        }

        .project-card {
          background: rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 16px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .card-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .card-row:last-of-type {
          border-bottom: none;
        }

        .card-label {
          font-size: 13px;
          color: #94a3b8;
          font-weight: 500;
        }

        .card-value {
          font-size: 14px;
          font-weight: 500;
          text-align: right;
          word-break: break-word;
          max-width: 60%;
        }

        .card-price {
          font-size: 16px;
          font-weight: 700;
          color: #22c55e;
        }

        .mobile-status-btn {
          border: none;
          padding: 6px 20px;
          border-radius: 20px;
          color: #fff;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .mobile-status-btn.available {
          background: #22c55e;
        }

        .mobile-status-btn.sold {
          background: #ef4444;
        }

        .card-actions {
          display: flex;
          gap: 12px;
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .mobile-edit-btn {
          flex: 1;
          background: #f59e0b;
          border: none;
          padding: 12px;
          border-radius: 10px;
          color: #fff;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        }

        .mobile-delete-btn {
          flex: 1;
          background: #ef4444;
          border: none;
          padding: 12px;
          border-radius: 10px;
          color: #fff;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        }

        .mobile-empty {
          text-align: center;
          padding: 50px 20px;
          background: rgba(255,255,255,0.03);
          border-radius: 16px;
        }

        .empty-emoji {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .empty-add-btn {
          margin-top: 20px;
          background: #3b82f6;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }

        /* ========== RESPONSIVE BREAKPOINTS ========== */
        @media (max-width: 768px) {
          .admin-projects-container {
            padding: 16px;
          }

          .desktop-form {
            display: none;
          }

          .desktop-table {
            display: none;
          }

          .mobile-cards {
            display: flex;
          }

          .mobile-fab {
            display: flex;
          }

          .mobile-modal {
            display: flex;
          }

          .mobile-header-add {
            display: block;
          }

          .projects-list-card {
            padding: 16px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        @media (min-width: 769px) {
          .desktop-form {
            display: block;
          }

          .desktop-table {
            display: block;
          }

          .mobile-cards {
            display: none;
          }

          .mobile-fab {
            display: none;
          }

          .mobile-modal {
            display: none;
          }

          .mobile-header-add {
            display: none;
          }
        }

        /* Touch-friendly for all buttons on mobile */
        @media (max-width: 768px) {
          button {
            cursor: pointer;
            min-height: 44px;
          }

          .mobile-edit-btn, .mobile-delete-btn {
            min-height: 48px;
          }

          .mobile-status-btn {
            min-height: 36px;
          }
        }
      `}</style>
    </div>
  );
}
