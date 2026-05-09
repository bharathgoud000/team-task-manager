import { useState } from "react";
import api from "../api/api";
import "../styles/login.css";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <div className="login-top">
          <h1>Login</h1>

          <Link to="/signup" className="signup-top-btn">
            Signup
          </Link>
        </div>

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

        <button type="submit">
          Login
        </button>

        <div className="extra-links">
          <button
            type="button"
            className="forgot-btn"
          >
            Forgot Password
          </button>

          <Link
            to="/signup"
            className="bottom-signup"
          >
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
}