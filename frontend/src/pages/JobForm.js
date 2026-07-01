import "./JobForm.css";
import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';

const JobForm = ({ edit }) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (edit && id) {
      API.get('/jobs').then(res => {
        const job = res.data.find(j => j._id === id);
        if (job) {
          setCompany(job.company);
          setRole(job.role);
          setStatus(job.status);
          setDeadline(job.deadline ? job.deadline.split('T')[0] : '');
          setNotes(job.notes || '');
        }
      });
    }
  }, [edit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await API.put(`/jobs/${id}`, { company, role, status, deadline, notes });
      } else {
        await API.post('/jobs', { company, role, status, deadline, notes });
      }

      navigate('/dashboard');   // 👉 After save → Dashboard
    } catch (error) {
      alert('Failed to save job');
    }
  };

  return (
    <div className="form-container">
      <h2>{edit ? ' Edit Application' : ' Add New Application'}</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} required />
        <input placeholder="Role" value={role} onChange={e => setRole(e.target.value)} required />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>Applied</option>
          <option>Screening</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
        <textarea placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default JobForm;
