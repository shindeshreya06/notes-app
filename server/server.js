require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://notes-app-taupe-two.vercel.app'],
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

//Test route
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected')).catch((err) => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));