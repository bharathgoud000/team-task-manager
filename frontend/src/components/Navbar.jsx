import "../styles/navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <h2>Task Manager</h2>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}