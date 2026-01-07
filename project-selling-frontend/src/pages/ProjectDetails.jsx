import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    api.get(`/projects/${id}`).then((res) => {
      setProject(res.data);
    });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading project...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen px-6 py-20 max-w-6xl mx-auto">
      
      <Link to="/projects" className="text-purple-400 hover:underline">
        ← Back to Projects
      </Link>

      <h1 className="text-4xl font-bold mt-6 mb-4">
        {project.title}
      </h1>

      <p className="text-gray-300 max-w-3xl mb-8">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-3 mb-10">
        {project.tech?.split(",").map((t, i) => (
          <span
            key={i}
            className="bg-gray-800 text-sm px-3 py-1 rounded"
          >
            {t}
          </span>
        ))}
      </div>

      {project.videoUrl && (
        <div className="mb-12">
          <div className="aspect-video rounded-xl overflow-hidden border border-gray-800">
            <iframe
              src={project.videoUrl}
              title={project.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20
        border border-white/10 rounded-xl p-6 flex flex-col md:flex-row
        items-center justify-between gap-6">

        <div>
          <h3 className="text-xl font-semibold mb-2">
            Interested in this project?
          </h3>
          <p className="text-gray-300 text-sm">
            Contact us to get full source code and setup support.
          </p>
        </div>

        <a
          href="https://wa.me/91XXXXXXXXXX"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 bg-green-600 hover:bg-green-700
            rounded-lg font-medium transition"
        >
          WhatsApp
        </a>
      </div>

    </section>
  );
}

export default ProjectDetails;
