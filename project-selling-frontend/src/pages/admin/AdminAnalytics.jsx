import { Pie, Bar } from "react-chartjs-2";

export default function AdminAnalytics() {
  return (
    <>
      <h1>Analytics</h1>

      <div className="charts">
        <div className="chart">
          <h3>Available vs Sold</h3>
          <Pie
            data={{
              labels: ["Available", "Sold"],
              datasets: [{ data: [3, 2], backgroundColor: ["#22c55e", "#ef4444"] }],
            }}
          />
        </div>

        <div className="chart">
          <h3>Sales</h3>
          <Bar
            data={{
              labels: ["Jan", "Feb", "Mar"],
              datasets: [{ label: "Sales", data: [2, 5, 3] }],
            }}
          />
        </div>
      </div>
    </>
  );
}
