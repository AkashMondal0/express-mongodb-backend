const router = require('express').Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const MiddlewareAuth = require('../middleware/middlewareAuth');

//register user
router.post('/register', async (req, res) => {

    let findUser = await User.findOne({ email: req.body.email })

    if (findUser) {
        return res.json({ message: "User Already Exists", status: false })
    } else {
        try {
            // generate new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            //Create a new user
            let user = new User(
                {
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    coverPicture: req.body.coverPicture,
                    profilePicture: req.body.profilePicture,
                }
            )

            //save user and respond
            await user.save()
            const data = {
                user: { id: user._id, }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET)
            res.json({ token: token, message: "Register Success", status: true })
        } catch (error) {

        }
    }
})

//login user
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.json("User Not Found")
        }
        else {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) {
                return res.json({ userData: null, message: "Not Correct User Credentials", status: false })
            }
            const data = {
                user: { id: user._id, }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET)
            return res.json({ token: token, message: "Login Success", status: true })
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post("/getUserData", MiddlewareAuth, async (req, res) => {
    try {
        const id = req.userVerified.id // this is the id of the user from the token which is coming from the middleware
        const user = await User.findById(id).select("-password")
        res.json({ userData: user, message: "User Data", status: true })
    } catch (error) {
        res.status(400).json(error)
    }
});


module.exports = router;