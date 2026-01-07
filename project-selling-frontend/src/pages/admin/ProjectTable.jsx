export default function ProjectTable({ projects, onDelete, onStatusChange }) {
  return (
    <div className="bg-[#020617] p-6 rounded-xl">
      <h2 className="font-semibold mb-4">📋 Projects</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="border-b border-gray-800">
              <td>{p.title}</td>
              <td>₹{p.price}</td>
              <td>
                <select
                  value={p.status}
                  onChange={(e) =>
                    onStatusChange(p.id, e.target.value)
                  }
                  className="bg-gray-800 p-1 rounded"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => onDelete(p.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
