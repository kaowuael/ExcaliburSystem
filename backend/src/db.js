require('dotenv').config(); 
// Ładuje zmienne z pliku .env i przypisuje je do process.env

const mongoose = require('mongoose'); 
// Ładuje bibliotekę mongoose

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Próbuje połączyć się z MongoDB na podstawie zmiennej z .env

    console.log('✅ Połączono z MongoDB');
  } catch (error) {
    console.error('❌ Błąd połączenia z MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
// Eksportujemy funkcję connectDB, żeby użyć jej np. w index.js

