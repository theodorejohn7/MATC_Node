require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const renderUrl = process.env.RENDER_URL;
const currPort= process.env.CURR_PORT;


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

const corsOptions ={
    origin:`${renderUrl}`, 
credentials:true,          
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// app.use(cors())
app.use(express.json());

const routes = require('./routes/routes');

app.use('/api', routes)

app.listen(`${currPort}`, () => {
    console.log(`Server Started at ${currPort}`)
})

module.exports = app;
