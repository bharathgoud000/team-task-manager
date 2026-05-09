import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import "../styles/ManageTasks.css";

export default function ManageTasks() {
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    const storedTasks =
      JSON.parse(
        localStorage.getItem("tasks")
      ) || [];

    setTasks(storedTasks);
  }, []);

  const addTask = () => {
    if (
      !form.title ||
      !form.deadline ||
      !form.priority
    ) {
      return alert("Fill all fields");
    }

    const updatedTasks = [
      ...tasks,
      {
        id: Date.now(),
        ...form,
      },
    ];

    setTasks(updatedTasks);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );

    setForm({
      title: "",
      description: "",
      deadline: "",
      priority: "",
      status: "",
    });
  };

  const deleteTask = (id) => {
    const updatedTasks =
      tasks.filter(
        (task) => task.id !== id
      );

    setTasks(updatedTasks);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );
  };

  return (
    <div>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="manage-page">
          <div className="manage-header">
            <div>
              <h1>Manage Tasks</h1>

              <p>
                Admin controls all tasks
              </p>
            </div>
          </div>

          <div className="tasks-grid">
            {tasks.map((task) => (
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
                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  Delete Task
                </button>
              </div>
            ))}
          </div>

          <div className="manage-card">
            <h2>Create New Task</h2>

            <input
              type="text"
              placeholder="Task Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Task Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
            ></textarea>

            <input
              type="date"
              value={form.deadline}
              onChange={(e) =>
                setForm({
                  ...form,
                  deadline:
                    e.target.value,
                })
              }
            />

            <select
              value={form.priority}
              onChange={(e) =>
                setForm({
                  ...form,
                  priority:
                    e.target.value,
                })
              }
            >
              <option value="">
                Select Priority
              </option>

              <option>
                High
              </option>

              <option>
                Medium
              </option>

              <option>
                Low
              </option>
            </select>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status:
                    e.target.value,
                })
              }
            >
              <option value="">
                Select Status
              </option>

              <option>
                Pending
              </option>

              <option>
                Completed
              </option>
            </select>

            <button onClick={addTask}>
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}