import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      navigate("/");
    } catch (error) {
      setErr(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">

        <div className="signup-header">
          <h1> Join JobTrack Pro</h1>
          <p>
            Create your account and start
            tracking your job applications.
          </p>
        </div>

        {err && (
          <p className="error">
            {err}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="👤 Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

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
            Create Account
          </button>
        </form>

        <p className="login-link">
          Already have an account?
          <Link to="/">
            {" "}Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;