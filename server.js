import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import passport from './auth.js';
import db from './db.js';  // 👈 make sure db.js is ESM too
import personRoutes from './routes/personRoutes.js';
import menuItemRoutes from './routes/menuItemRoutes.js';

const app = express();
dotenv.config();

app.use(bodyParser.json()); // req.body

const PORT = process.env.PORT || 3000;

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); // Move on to the next phase
};
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', (req, res) => {
  res.send('Welcome to our Hotel');
});

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
