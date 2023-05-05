const router = require('express').Router();
const Conversation = require('../models/Conversation');

// new conversation
router.post('/', async (req, res) => {
    let senderId = req.body.senderId //TODO --- me
    let receiverId = req.body.receiverId // TODO --- friend

    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId, { time: req.body.time }],
        lastTime: req.body.lastTime,
        lastMessage: req.body.lastMessage,
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        console.log(error);
    }
});

// update time of conversation
router.put('/', async (req, res) => {
    // console.log(req.body);
    let conversationId = req.body.conversationId
    const update = await Conversation.findByIdAndUpdate(conversationId, { $set: { lastTime: req.body.lastTime, lastMessage: req.body.lastMessage } });
    res.status(200).json(update);
});


// get all conversation of a user

router.get('/:userId', async (req, res) => {
    // let userId = req.body.userId // TODO --- me
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }, // TODO --- me
        });
        // conversation.
        res.status(200).json(conversation);
    } catch (error) {
        console.log(error);
    }
});


// get one conversation of a user

router.post('/inChat', async (req, res) => {
    let senderId = req.body.senderId //TODO --- me
    let receiverId = req.body.receiverId // TODO --- friend

    try {
        const conversation = await Conversation.find({
            members: { $in: [senderId, receiverId] }
        });
        conversation.map((user) => {
            if (user.members.includes(senderId) && user.members.includes(receiverId)) {
                return res.status(200).json(user);
            }
        })
        res.status(200).json("no conversation");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;