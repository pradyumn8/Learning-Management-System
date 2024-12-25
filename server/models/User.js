const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true, trim: true },
    userEmail: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
