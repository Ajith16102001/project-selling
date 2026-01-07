function AdminProjectCard({ project, onToggle }) {
  const isAvailable = project.status === "available";

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      
      <h3 className="text-xl font-semibold mb-2">
        {project.title}
      </h3>

      <p className="text-gray-400 text-sm mb-4">
        {project.description}
      </p>

      <div className="flex justify-between items-center">
        <span
          className={`text-sm font-medium ${
            isAvailable ? "text-green-400" : "text-red-400"
          }`}
        >
          {isAvailable ? "Available" : "Sold"}
        </span>

        <button
          onClick={() => onToggle(project.id, project.status)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            isAvailable
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Mark {isAvailable ? "Sold" : "Available"}
        </button>
      </div>
    </div>
  );
}

export default AdminProjectCard;
