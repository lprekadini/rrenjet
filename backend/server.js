// server.js
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 5000; // mund ta ndryshosh sipas dëshirës

// Krijimi i lidhjes me MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Përdoruesi për bazën e të dhënave
  password: '',  // Fjalëkalimi i përdoruesit
  database: 'event_management' // Emri i bazës së të dhënave
});

db.connect((err) => {
  if (err) {
    console.error('Gabim lidhjeje me bazën e të dhënave:', err);
  } else {
    console.log('Lidhja me bazën e të dhënave është e suksesshme!');
  }
});

// Endpoint për të marrë të dhënat nga baza
app.get('/api/events', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ka ndodhur një gabim' });
    }
    res.json(results);
  });
});

// Startimi i serverit
app.listen(port, () => {
  console.log(`Serveri po funksionon në portin ${port}`);
});