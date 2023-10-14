
const { post } = require("../app");
const Post = require("../models/post.model");

module.exports.create = (req, res) => {
    Post.create(req.body).then((post) => {
        res.status(201).json(post);
    }).catch(() => {
        res.status(400).json({ message: "Error creating post" });
    });
}

module.exports.list = (req, res) => {
    Post.find().then((posts) => {
        res.json(posts);
    });
}

module.exports.detail = (req, res) => {
    Post.findById(req.params.id).then((post) => {
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    });
}

module.exports.update = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
        .then((post) => {
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({ message: "Post not found" });
            }
        }).catch(() => {
            res.status(400).json({ message: "Error creating post" });
        });
}

module.exports.delete = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then((post) => {
            if (post) {
                res.status(204).json();
            } else {
                res.status(404).json({ message: "Post not found" });
            }
        });
}
