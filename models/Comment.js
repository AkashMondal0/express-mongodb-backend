const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);