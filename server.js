// server.js
import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import Person from './models/person.js'; 
import menuitems from './models/menuitems.js';

const app = express();

app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send('Welcome to my app...');
});


import menuRoutes from './routes/menuitemRoutes.js';
app.use('/menuitems', menuRoutes);
import personRoutes from './routes/personRoutes.js';
app.use('/person',personRoutes);

//use environment variable for port
const PORT=process.env.PORT||3000;
db.on('connected',()=>{
  console.log("db connected starting server");
app.listen(PORT, () => {
  console.log('LISTENING ON port ');
});
});
