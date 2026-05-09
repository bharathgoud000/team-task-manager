import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks =
      JSON.parse(
        localStorage.getItem("tasks")
      ) || [];

    setTasks(storedTasks);
  }, []);

  const today = new Date();

  return (
    <div>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="tasks-page">
          <div className="tasks-header">
            <div>
              <h1>Tasks</h1>

              <p>
                Assigned tasks and overdue work
              </p>
            </div>
          </div>

          <div className="tasks-grid">
            {tasks.map((task) => {
              const overdue =
                new Date(task.deadline) <
                today;

              return (
                <div
                  className="task-card"
                  key={task.id}
                >
                  <div className="task-top">
                    <h2>{task.title}</h2>

                    <span>
                      {task.priority}
                    </span>
                  </div>

                  <div className="task-details">
                    <p>
                      Deadline:
                      <strong>
                        {" "}
                        {task.deadline}
                      </strong>
                    </p>

                    <p>
                      Status:
                      <strong>
                        {" "}
                        {task.status}
                      </strong>
                    </p>

                    {overdue && (
                      <p className="overdue">
                        Overdue Task
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}