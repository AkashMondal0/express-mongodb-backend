const router = require('express').Router();
const message = require('../models/Message');

// add
router.post('/', async (req, res) => {
    const newMessage = new message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get

router.get('/', async (req, res) => {
    try {
        const messages = await message.find({
            conversationId: req.body.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;