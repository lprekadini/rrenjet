const express = require('express');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

const cors = require('cors');
const path = require('path');
const personalitiesRoutes = require('./routes/personalities');

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


// Rrugët (Routes)
app.use('/api/personalities', personalitiesRoutes);

// Starto serverin
app.listen(PORT, () => {
    console.log(`✅ Serveri është duke punuar në http://localhost:${PORT}`);
});


// app.get('/api/admin', authMiddleware(['admin']), (req, res) => {
//     res.json({ message: 'Mirësevini, admin!' });
// });