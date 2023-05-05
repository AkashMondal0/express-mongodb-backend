const router = require('express').Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');

//Create a comment ✅

router.post("/", async (req, res) => {
    const newComment = new Comment({
        postId: req.body.postId,
        userId: req.body.userId,
        text: req.body.text,
    })
    try {
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    } catch (error) {
        res.status(404).json(error)
    }
})

//read the comment from the post

router.get("/", async (req, res) => {
    const PostId = req.body.postId // post id from the post

    try {
        const comments = await Comment.find({ postId: PostId })
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update the comment in the post

router.put("/", async (req, res) => {
    const commentId = req.body.commentId // comment from the post
    // const updateComment = req.body // post id from the post
    try {
        const comments = await Comment.findById(commentId)
        const update = await comments.updateOne({ $set: req.body })
        res.status(200).json(update)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

//delete the comment from the post

router.delete("/", async (req, res) => {

    try {
        await Comment.deleteOne({ _id: req.body.commentId })
        res.status(200).json("deleteComment")

    } catch (error) {
        res.status(500).json(error)
    }
})

//like / dislike the comment

router.put("/like", async (req, res) => {
    try {
        const comment = await Comment.findById(req.body.commentId);
        if (!comment.likes.includes(req.body.userId)) {
            await comment.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json("the comment has been liked")
        } else {
            await comment.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json("the comment has been disliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router;