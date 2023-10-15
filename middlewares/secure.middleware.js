const jwt = require("jsonwebtoken");

module.exports.checkAuth = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization.split("Bearer ")[1];
        jwt.verify(token, "$uper-secr3t0");
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized", error: err });
    }
};