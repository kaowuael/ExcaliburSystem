const connectDB = require('./db');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); // Parsowanie JSON-ów

// Testowy endpoint
app.get('/ping', (req, res) => res.send('pong!'));
// Połączenie do bazy mongo db
connectDB();
// Uruchomienie serwera
app.listen(4000, '0.0.0.0', () => {
  console.log('✅ Backend działa na porcie 3000');
});
