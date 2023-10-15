const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.create = (req, res) => {

    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            req.body.password = hash;
            User.create(req.body).then((User) => {
                const id = User._id;

                // Genera la URL completa
                const serverAddress = `http://${req.get('host')}`;
                const activationURL = `${serverAddress}/api/users/activate/${id}`;

                // Envía la URL en la respuesta
                res.status(201).json({ url: `${activationURL}` });

            }).catch(() => {
                res.status(400).json({ message: "Error creating User" });
            });
        }).catch((err) => {
            res.status(400).json({ message: `Password missing` });
        });
}

module.exports.login = (req, res) => {

    User.find().then((Users) => {
        const user = Users
            .find(x => x.email === req.body.email);
        if (user) {
            if (user.active) {
                bcrypt.compare(req.body.password, user.password)
                    .then((match) => {
                        if (match) {
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
                res.status(400).json({ message: "User is not active" });
            }
        }
        else {
            res.status(400).json({ message: "user not found" });
        }
    });
}

module.exports.activate = (req, res) => {
    const id = req.params.id;
    if (id) {
        User.findByIdAndUpdate(id, { active: true }, {
            new: true,
            runValidators: true,
        }).then((user) => {
            if (user) {
                res.status(200).json({ message: "User activated" });
            } else {
                res.status(400).json({ message: "User not found" });
            }
        }).catch((err) => {
            console.log(err);
        });
    } else {
        res.status(400).json({ message: "Invalid url" });
    }
}