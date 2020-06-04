//@ts-check
/**@module
 * @requires express
 * @requires mongoose
 * @requires dotenv
 * @requires bodyParser
 * @requires cors
 * @requires path
 * @requires usersRoute
 */

//const Joi = require('@hapi/joi');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRoute = require('./routes/users');
const gamesRoute = require('./routes/games');
const path = require('path');


//Middelware
app.use(bodyParser.json());
app.use(cors());

//Import routes
app.use('/api/users', usersRoute);
app.use('/api/games', gamesRoute);



// connect to Mongo DB
mongoose.connect(
    process.env.DB_CONNECTION,  // pull from .env file in react folder
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('connected to Mongo DB') }
);

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));  // should this be app.use and app.get
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}


// listen to PORT, default 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port: ${port}`));