import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/projects.css";

export default function Projects() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [projects, setProjects] =
    useState([]);

  const [form, setForm] = useState({
    name: "",
    deadline: "",
    members: "",
    status: "",
  });

  useEffect(() => {
    const storedProjects =
      JSON.parse(
        localStorage.getItem("projects")
      ) || [];

    setProjects(storedProjects);
  }, []);

  const addProject = () => {
    if (
      !form.name ||
      !form.deadline ||
      !form.members
    ) {
      return alert("Fill all fields");
    }

    const updatedProjects = [
      ...projects,
      {
        id: Date.now(),
        ...form,
      },
    ];

    setProjects(updatedProjects);

    localStorage.setItem(
      "projects",
      JSON.stringify(updatedProjects)
    );

    setForm({
      name: "",
      deadline: "",
      members: "",
      status: "",
    });
  };

  const deleteProject = (id) => {
    const updatedProjects =
      projects.filter(
        (project) => project.id !== id
      );

    setProjects(updatedProjects);

    localStorage.setItem(
      "projects",
      JSON.stringify(updatedProjects)
    );
  };

  return (
    <div>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="projects-page">
          <div className="projects-header">
            <div>
              <h1>Projects</h1>

              <p>
                Team projects and deadlines
              </p>
            </div>
          </div>

          <div className="horizontal-projects">
            {projects.map((project) => (
              <div
                className="horizontal-project-card"
                key={project.id}
              >
                <div className="left-project">
                  <h2>{project.name}</h2>

                  <p>
                    Deadline:
                    <strong>
                      {" "}
                      {project.deadline}
                    </strong>
                  </p>

                  <p>
                    Members:
                    <strong>
                      {" "}
                      {project.members}
                    </strong>
                  </p>
                </div>

                <div className="right-project">
                  <span>
                    {project.status}
                  </span>

                  {user?.role ===
                    "ADMIN" && (
                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteProject(
                          project.id
                        )
                      }
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {user?.role === "ADMIN" && (
            <div className="project-form">
              <h2>Create New Project</h2>

              <input
                type="text"
                placeholder="Project Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

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

              <input
                type="number"
                placeholder="Members"
                value={form.members}
                onChange={(e) =>
                  setForm({
                    ...form,
                    members:
                      e.target.value,
                  })
                }
              />

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
                  Planning
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Completed
                </option>
              </select>

              <button onClick={addProject}>
                Create Project
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}