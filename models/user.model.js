const mongoose = require("mongoose");
const { isEmail } = require("validator");

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
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail, "invalid email"]
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
        }
    }
});

const User = mongoose.model("User", schema);

module.exports = User;