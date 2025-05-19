const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db'); // if you created it, otherwise remove
const authRoutes = require('./routes/auth');

const app = express();
const timetableRoutes = require('./routes/timetable');
app.use('/api/timetable', timetableRoutes);

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API running ✅'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
