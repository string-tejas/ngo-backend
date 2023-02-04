const mongoose = require("mongoose");

const InstituteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  cityMapUrl: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("institute", InstituteSchema);
