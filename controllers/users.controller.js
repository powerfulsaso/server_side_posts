const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.create = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            req.body.password = hash;
            User.create(req.body).then((User) => {
                res.status(201).json(User);
            }).catch(() => {
                res.status(400).json({ message: "Error creating User" });
            });
        });
}

module.exports.login = (req, res) => {

    User.find().then((Users) => {
        const user = Users
            .find(x => x.email === req.body.email);
        if (user) {
            bcrypt.compare(req.body.password, user.password)
                .then((match) => {
                    if (match) {
                        //todo return jwt
                        const token = jwt.sign({
                            sub: user._id,
                            exp: Date.now() / 1000 + 3600
                        }, "$uper-secr3t0");

                        res.json({ token: token });
                    }
                    else {
                        res.status(401).json({ message: "invalid password" });
                    }
                })
                .catch(() => {
                    res.status(400).json();
                }
                );
        } else {
            res.status(400).json({ message: "user not found" });
        }
    });
}