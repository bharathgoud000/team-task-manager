import { useState } from "react";
import api from "../api/api";
import "../styles/Login.css";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/signup", form);

      alert("Account Created Successfully");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Signup Failed"
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <div className="login-top">
          <h1>Signup</h1>

          <Link
            to="/"
            className="signup-top-btn"
          >
            Login
          </Link>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <select
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >
          <option value="MEMBER">
            Member
          </option>

          <option value="ADMIN">
            Admin
          </option>
        </select>

        <button type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}