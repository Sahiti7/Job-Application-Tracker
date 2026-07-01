import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.name,
          email: data.email,
        })
      );

      navigate("/add");
    } catch (error) {
      setErr(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h1> JobTrack Pro</h1>
          <p>
            Track every application and
            manage your career journey.
          </p>
        </div>

        {err && (
          <p className="error">
            {err}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="📧 Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don't have an account?
          <Link to="/signup">
            {" "}Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;