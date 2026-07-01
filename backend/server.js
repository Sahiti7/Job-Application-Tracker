const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI);

// routes
app.get('/', (req, res) => res.send('Job Tracker Backend Running'));
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
