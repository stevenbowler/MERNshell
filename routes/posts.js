const express = require('express');
const router = express();
const Post = require('../models/Post');
const verify = require('../privateRoutesAuth');



// get all including handle query
router.get('/', verify, async (req, res) => {
    try {
        const posts = await Post.find(req.query);  // will handle query ..api/movies?genre=horror etc
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});


/// get genre
router.get('/genre/:genreID', verify, async (req, res) => {
    try {
        const posts = await Post.find({ genre: req.params.genreID });
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});


//submit a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        genre: req.body.genre
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
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