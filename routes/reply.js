const router = require('express').Router();
const Comment = require('../models/Comment');

//Create a comment

router.post("/", async (req, res) => {
    const newComment = new Comment(req.body)
    try {
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    } catch (error) {
        res.status(404).json(error)
    }
})

//read the comment from the post

router.get("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update the comment in the post

router.put("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.userId === req.body.userId) {

        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete the comment from the post

router.delete("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.userId === req.body.userId) {}
    } catch (error) {
        res.status(500).json(error)
    }
})

//like / dislike the comment

router.put("/:id/like", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
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