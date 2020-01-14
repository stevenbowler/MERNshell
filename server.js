//const Joi = require('@hapi/joi');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const gamesRoute = require('./routes/games');
const path = require('path');


//Middelware
app.use(bodyParser.json());
app.use(cors());

//Import routes
app.use('/api/movies', postsRoute);
app.use('/api/users', usersRoute);
app.use('/api/games', gamesRoute);



// connect to Mongo DB
//  mongodb+srv://sbowler:sbowler@cluster0-z0lp4.gcp.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect(
    process.env.DB_CONNECTION,  // pull from .env file in react folder
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('connected to Mongo DB') }
);

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('joggle/build'));  // should this be app.use and app.get
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'joggle', 'build', 'index.html'));
    });

}


// listen to PORT, default 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port: ${port}`));