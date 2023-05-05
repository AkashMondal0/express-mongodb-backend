const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({

    commentId: {
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

module.exports = mongoose.model("Comment", ReplySchema);