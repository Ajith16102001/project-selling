import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:scale-105 transition-all duration-300">
      <h3 className="text-xl font-semibold text-white mb-2">
        {project.title}
      </h3>

      <p className="text-gray-300 text-sm mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech?.split(",").map((t, index) => (
  <span
    key={index}
    className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300"
  >
    {t}
  </span>
))}

      </div>

      <Link
        to={`/projects/${project.id}`}
        className="inline-block mt-2 text-sm font-medium text-purple-400 hover:text-purple-300"
      >
        View Details →
      </Link>
    </div>
  );
};

export default ProjectCard;
