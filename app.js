const express = require('express');
const mongoose = require('mongoose');
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');
const app = express();

app.use(express.json()); 


const connectDB = require('./config');
connectDB();


app.use('/api', playerRoutes);
app.use('/api', teamRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
