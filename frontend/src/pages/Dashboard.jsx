import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Statcard from "../components/Statcard";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  useEffect(() => {
    updateDashboard();
  }, []);

  const updateDashboard = () => {
    const tasks =
      JSON.parse(
        localStorage.getItem("tasks")
      ) || [];

    const totalTasks = tasks.length;

    const completed = tasks.filter(
      (task) =>
        task.status === "Completed"
    ).length;

    const pending = tasks.filter(
      (task) =>
        task.status === "Pending"
    ).length;

    const overdue = tasks.filter(
      (task) =>
        new Date(task.deadline) <
          new Date() &&
        task.status !== "Completed"
    ).length;

    setStats({
      totalTasks,
      completed,
      pending,
      overdue,
    });
  };

  return (
    <div>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="dashboard-content">
          <h1>Dashboard</h1>

          <div className="stats-grid">
            <Statcard
              title="Total Tasks"
              value={stats.totalTasks}
            />

            <Statcard
              title="Completed"
              value={stats.completed}
            />

            <Statcard
              title="Pending"
              value={stats.pending}
            />

            <Statcard
              title="Overdue"
              value={stats.overdue}
            />
          </div>
        </div>
      </div>
    </div>
  );
}