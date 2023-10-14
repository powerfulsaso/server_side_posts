const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    id: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    title: {
        type: String,
        required: true,
        minlength: 5
    },
    text: {
        type: String,
        required: true,
        minlength: 5
    },
    author: {
        type: String,
        required: true
    }
});

const Post = mongoose.model("Post", schema);

module.exports = Post;