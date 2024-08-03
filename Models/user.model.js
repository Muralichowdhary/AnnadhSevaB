const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  location: {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  phone: { type: Number, required: true },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
