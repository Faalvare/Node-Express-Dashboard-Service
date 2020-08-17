const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { debug } = require('dotenv/lib/env-options');

//Get ALL
router.get('/',async(req,res)=>{
    try {  
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({message:error});
    }
})

//Get Specific
router.get('/:postId',async (req,res)=>{
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (error) {
        res.json({message:error});
    }});

//Delete post
router.delete('/:postId',async (req,res)=>{
    try {
        const removedPost = await Post.remove({_id:req.params.postId});
        res.json({
            message:"Post Removed successfully",
            removedPost: removedPost
        });
    } catch (error) {
        res.json({message:error});
    }});

//Update post
router.patch('/:postId',async(req,res)=>{
    const updatedPost = await Post.updateOne(
        {_id:req.params.postId},
        { $set: {
            title: req.body.title,
        } }
        );
        res.json({message:"Post updated successfully",
        updatedPost:updatedPost
        });
})

//Submit
router.post('/', async(req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message:err});
    };
});
module.exports = router;