const mongoose = require('mongoose');

const Conversation = new mongoose.Schema({
      members: {
            type: Array,
      },
      lastTime: {
            type: String,
      },
      lastMessage: {
            type: String,
      },
}, { timestamps: true });

module.exports = mongoose.model("Conversation", Conversation);