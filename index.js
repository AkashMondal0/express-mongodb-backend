const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require("cors");

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const conversation = require('./routes/conversation');
const Message = require('./routes/messages');
const Comment = require('./routes/comment');

// Middleware
app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// Connect to MongoDB
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log('Connected to MongoDB');
});


// Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);
app.use('/api/conversation', conversation);
app.use('/api/messages', Message);
app.use('/api/comment', Comment);



app.get("/", (req, res) => {
    res.send("chat app Server Online")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});