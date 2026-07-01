import React, { useEffect, useState } from "react";
import API from "../api/api";
import JobCard from "../components/JobCard";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      const { data } = await API.get("/jobs");
      setJobs(data);
    } catch (error) {
      setErr("Failed to load jobs");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await API.delete(`/jobs/${id}`);
      setJobs(jobs.filter((j) => j._id !== id));
    } catch (e) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <div>
          <h1> JobTrack Pro</h1>
          <p>
            Track and manage all your job applications in one place.
          </p>
        </div>

        <Link to="/add" className="add-job-btn">
          + Add Job
        </Link>
      </div>

      {err && <p className="error">{err}</p>}

      <div className="stats-section">
        <div className="stat-card">
          <h2>{jobs.length}</h2>
          <span>Total Jobs</span>
        </div>

        <div className="stat-card">
          <h2>
            {jobs.filter((j) => j.status === "Applied").length}
          </h2>
          <span>Applied</span>
        </div>

        <div className="stat-card">
          <h2>
            {jobs.filter((j) => j.status === "Interview").length}
          </h2>
          <span>Interviews</span>
        </div>

        <div className="stat-card">
          <h2>
            {jobs.filter((j) => j.status === "Offer").length}
          </h2>
          <span>Offers</span>
        </div>
      </div>

      <div className="jobs-heading">
        <h2>Your Applications</h2>
      </div>

      <div className="grid">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onDelete={handleDelete}
          />
        ))}
      </div>

    </div>
  );
};

export default Dashboard;