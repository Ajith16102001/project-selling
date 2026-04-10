import { useState } from "react";

export default function ProjectForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    stack: "",
    description: "",
  });

  const submit = (e) => {
    e.preventDefault();
    onAdd({
      id: Date.now(),
      ...form,
      status: "available",
    });
    setForm({ title: "", price: "", stack: "", description: "" });
  };

  return (
    <form onSubmit={submit} className="bg-[#111827] p-6 rounded-xl mb-8">
      <h2 className="font-semibold mb-4">➕ Add New Project</h2>

      <input
        className="input"
        placeholder="Project Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <input
        className="input"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />

      <input
        className="input"
        placeholder="Tech Stack"
        value={form.stack}
        onChange={(e) => setForm({ ...form, stack: e.target.value })}
        required
      />

      <textarea
        className="input"
        placeholder="Description"
        rows="4"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      <button className="bg-blue-600 px-6 py-2 rounded mt-4 w-full md:w-auto">
        Add Project
      </button>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .input {
            font-size: 14px;
            padding: 10px 12px;
          }
          
          form {
            padding: 16px !important;
          }
          
          h2 {
            font-size: 18px;
            margin-bottom: 12px;
          }
        }
      `}</style>
    </form>
  );
}
