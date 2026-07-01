import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";
import "./JobCard.css";

const JobCard = ({ job, onDelete }) => {
  const getStatusClass = () => {
    switch (job.status) {
      case "Applied":
        return "status applied";

      case "Interview":
        return "status interview";

      case "Offer":
        return "status offer";

      case "Rejected":
        return "status rejected";

      default:
        return "status";
    }
  };

  return (
    <div className="job-card">

      <div className="card-header">
        <h3>{job.company}</h3>
        <span className={getStatusClass()}>
          {job.status}
        </span>
      </div>

      <p className="job-role">
        💼 {job.role}
      </p>

      <p className="deadline">
        <FaCalendarAlt />
        {" "}
        {job.deadline
          ? new Date(job.deadline).toLocaleDateString()
          : "No Deadline"}
      </p>

      <div className="actions">

        <Link
          to={`/edit/${job._id}`}
          className="edit-btn"
        >
          <FaEdit />
          Edit
        </Link>

        <button
          className="delete-btn"
          onClick={() => onDelete(job._id)}
        >
          <FaTrash />
          Delete
        </button>

      </div>

    </div>
  );
};

export default JobCard;