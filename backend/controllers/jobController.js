const Job = require('../models/Job');

const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) { next(err); }
};

const createJob = async (req, res, next) => {
  try {
    const { company, role, status, deadline, notes } = req.body;
    const job = await Job.create({ user: req.user._id, company, role, status, deadline, notes });
    res.status(201).json(job);
  } catch (err) { next(err); }
};

const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });
    job.company = req.body.company || job.company;
    job.role = req.body.role || job.role;
    job.status = req.body.status || job.status;
    job.deadline = req.body.deadline || job.deadline;
    job.notes = req.body.notes || job.notes;
    const updated = await job.save();
    res.json(updated);
  } catch (err) { next(err); }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });
    await job.remove();
    res.json({ message: 'Job removed' });
  } catch (err) { next(err); }
};

module.exports = { getJobs, createJob, updateJob, deleteJob };
