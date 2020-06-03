const express = require('express');
const router = express();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');
const jwt = require('jsonwebtoken');
const verify = require('../privateRoutesAuth');


//Register a new user
router.post('/register', async (req, res) => {
    // validate before creating user
    const { error } = registerValidation(req.body);
    if (error) return res.status(406).json({ message: error.details[0].message, });

    // check if user already in database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('email already exists');

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    console.log(hashedPassword);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        console.log("saved user: ", savedUser);
        res.send(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
});


//Login a user
router.post('/login', async (req, res) => {
    // validate login data before logging-in user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if email already in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ "statusCode": 400, "statusMessage": "email does not exist" });

    // check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password); // true
    if (!validPassword) return res.status(400).send('Invalid password');

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: 3600 });
    console.log("login route token: " + token + " user: " + user);
    res.header('auth-token', token).send({ "token": token, "user": user });

    //res.send(user.name + ' logged in');



});



// get all users including handle query
router.get('/', verify, async (req, res) => {
    try {
        const users = await User.find(req.query);  // will handle query ..api/movies?genre=horror etc
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});



/// get genre from Vidly is example of params
router.get('/genre/:genreID', async (req, res) => {
    try {
        const users = await User.find({ genre: req.params.genreID });
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});




// get specific id
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json(err);
    }
});


//Delete specific id
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });

    }
});


//Update specific id
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } },
            //{ $addFields: { genre: req.body.genre } }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;