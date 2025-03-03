const express = require('express');
const authRoutes = require('./routes/auth');

const cors = require('cors');
const path = require('path');

//import api routes
const personalitiesRoutes = require('./routes/personalities');
const categoryRoutes = require('./routes/categories');

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);


// Routes
app.use('/api/personalities', personalitiesRoutes);
app.use('/api/categories', categoryRoutes);


// start server
app.listen(PORT, () => {
    console.log(`✅ Serveri është duke punuar në http://localhost:${PORT}`);
});