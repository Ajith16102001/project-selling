import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function AdminAnalytics() {
  return (
    <>
      <h1 style={styles.title}>Analytics</h1>

      <div style={styles.chartsContainer}>
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Available vs Sold</h3>
          <div style={styles.pieWrapper}>
            <Pie
              data={{
                labels: ["Available", "Sold"],
                datasets: [{ 
                  data: [3, 2], 
                  backgroundColor: ["#22c55e", "#ef4444"],
                  borderWidth: 0,
                }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: "#fff", font: { size: 12 } }
                  }
                }
              }}
            />
          </div>
        </div>

        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Sales</h3>
          <div style={styles.barWrapper}>
            <Bar
              data={{
                labels: ["Jan", "Feb", "Mar"],
                datasets: [{ 
                  label: "Sales", 
                  data: [2, 5, 3],
                  backgroundColor: "#3b82f6",
                  borderRadius: 8,
                }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    labels: { color: "#fff", font: { size: 12 } }
                  }
                },
                scales: {
                  y: {
                    ticks: { color: "#94a3b8" },
                    grid: { color: "rgba(255,255,255,0.1)" }
                  },
                  x: {
                    ticks: { color: "#94a3b8" },
                    grid: { color: "rgba(255,255,255,0.1)" }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .charts-container {
            flex-direction: column;
            gap: 16px;
          }
          .chart-card {
            padding: 16px;
          }
          .pie-wrapper {
            max-width: 250px;
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  );
}

const styles = {
  title: {
    fontSize: "28px",
    marginBottom: "24px",
  },
  chartsContainer: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
  },
  chartCard: {
    flex: 1,
    minWidth: "250px",
    background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 25px 60px rgba(0,0,0,.6)",
  },
  chartTitle: {
    fontSize: "18px",
    marginBottom: "20px",
    textAlign: "center",
  },
  pieWrapper: {
    maxWidth: "300px",
    margin: "0 auto",
  },
  barWrapper: {
    width: "100%",
  },
};
