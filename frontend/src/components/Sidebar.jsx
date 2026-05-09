import { Link } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">
        Team Manager
      </h2>

      <div className="sidebar-links">
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/projects">
          Projects
        </Link>

        <Link to="/tasks">
          Tasks
        </Link>

        {user?.role === "ADMIN" && (
          <Link to="/manage-tasks">
            Manage Tasks
          </Link>
        )}
      </div>
    </div>
  );
}