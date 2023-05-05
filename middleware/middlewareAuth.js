const jwt = require('jsonwebtoken');

const MiddlewareAuth = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({ message: "Access Denied" })
    }
    else {
        try {
            const verify = jwt.verify(token, process.env.JWT_SECRET);
            req.userVerified = verify.user;
            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid Token" })
        }
    }
};

module.exports = MiddlewareAuth;