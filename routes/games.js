//@ts-nocheck
/**@module
 * @requires express
 * @requires router
 * @requires Game
 * @requires verify
 */

const express = require('express');
const router = express();
const Game = require('../models/Game');
const verify = require('../privateRoutesAuth');



// get all games listed including handle query
router.get('/', verify, async (req, res) => {
    try {
        const games = await Game.find(req.query);  // will handle query ..api/movies?genre=horror etc
        res.json(games);
    } catch (err) {
        res.json({ message: err });
    }
});


// 
/**
 * get top 5 scores games sorted in descending order, including handle query .sort({score, -1})
 * @function
 * @name get/leaders
 * @memberof module:routes/games
 * @param {string} path - / to get you home.
 * @returns {URL} Returns url to index.handlebars
 */
router.get('/leaders', verify, async (req, res) => {
    try {
        const games = await Game.find(req.query).sort({ score: -1 }).limit(5);  // will handle query ..api/movies?genre=horror etc
        res.json(games);
    } catch (err) {
        res.json({ message: err });
    }
});


// get top 2 scores games sorted in descending order, including handle query .sort({score, -1})
/**
 * get top score for this player, including handle query .sort({score, -1})
 * @function
 * @name get/leaders
 * @memberof module:routes/games
 * @param {string} path - / to get you home.
 * @returns {URL} Returns url to index.handlebars
 */
router.get('/best', verify, async (req, res) => {
    try {
        const games = await Game.find(req.query).sort({ score: -1 }).limit(1);  // will handle query ..api/movies?genre=horror etc
        res.json(games);
    } catch (err) {
        res.json({ message: err });
    }
});


// get all games listed including handle query
/**
 * get top score for this player, including handle query .sort({score, -1})
 * @function
 * @name get/leaders
 * @memberof module:routes/games
 * @param {string} path - / to get you home.
 * @returns {URL} Returns url to index.handlebars
 */
router.post('/personalbest', verify, async (req, res) => {
    console.log("personalbest req.body: " + req.body);
    console.log("personalbest req.body.email: " + req.body.email);
    try {
        //        const games = await Game.find({ email: req.body.email }).sort({ score: -1 }).limit(1);  // will handle query ..api/movies?genre=horror etc
        const games = await Game.find({ email: req.body.email }).sort({ score: -1 }).limit(1);  // will handle query ..api/movies?genre=horror etc
        res.json(games);
    } catch (err) {
        res.json({ message: err });
    }
});


/// get genre not yet used for games
router.get('/email/:emailID', verify, async (req, res) => {
    try {
        const games = await Game.find({ email: req.params.emailID }).sort({ score: -1 }).limit(1);
        res.json(games);
    } catch (err) {
        res.json({ message: err });
    }
});

// header: { "auth-token": req.headers.token },

//submit a new game result to game DB
/**
 * Post this score for this player, including handle query .sort({score, -1})
 * @function
 * @name post/postscore
 * @memberof module:routes/games
 * @param {string} path - / to get you home.
 * @returns {URL} Returns url to index.handlebars
 */
router.post('/postscore', verify, async (req, res) => {
    // console.log("postGameScore Email: " + req.body.email + " score: " + req.body.score + "req.body.name: " + req.body.name);
    const game = new Game({
        name: req.body.name,
        email: req.body.email,
        score: req.body.score,
        level: req.body.level
    });
    try {
        const savedGame = await game.save();
        res.json(savedGame);
        console.log("post score savedGame: " + savedGame);
    } catch (err) {
        res.json({ message: err });
        console.log("post score err: " + err);
    }
});


// get specific id
router.get('/:gameId', async (req, res) => {
    try {
        const game = await Game.findById(req.params.postId);
        res.json(game);
    } catch (err) {
        res.json(err);
    }

});


//Delete specific id
router.delete('/:gameId', async (req, res) => {
    try {
        const removedGame = await Game.remove({ _id: req.params.postId });
        res.json(removedGame);
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