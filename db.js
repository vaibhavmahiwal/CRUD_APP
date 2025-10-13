// db.js
import dotenv from 'dotenv'; 
dotenv.config();
import mongoose from 'mongoose';

//const mongoURL = 'mongodb://127.0.0.1:27017/hotels';
const mongoURL = process.env.DB_URL; 

// ✅ Just call connect without extra options
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
  console.log("MongoDB connected successfully");
});

db.on('error', (err) => {
  console.error("MongoDB connection failed:", err);
});

db.on('disconnected', () => {
  console.log("MongoDB disconnected");
});

export default db;
