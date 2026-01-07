import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

const ProjectCharts = ({ projects }) => {
  const sold = projects.filter(p => p.status === "sold").length;
  const available = projects.filter(p => p.status === "available").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      
      {/* PIE */}
      <div className="bg-gray-900 p-4 rounded">
        <h3 className="mb-2">Project Status</h3>
        <Pie
          data={{
            labels: ["Sold", "Available"],
            datasets: [{
              data: [sold, available],
              backgroundColor: ["#ef4444", "#22c55e"],
            }],
          }}
        />
      </div>

      {/* BAR */}
      <div className="bg-gray-900 p-4 rounded">
        <h3 className="mb-2">Sales Count</h3>
        <Bar
          data={{
            labels: projects.map(p => p.title),
            datasets: [{
              label: "Sales",
              data: projects.map(p => p.status === "sold" ? 1 : 0),
              backgroundColor: "#3b82f6",
            }],
          }}
        />
      </div>
    </div>
  );
};

export default ProjectCharts;
