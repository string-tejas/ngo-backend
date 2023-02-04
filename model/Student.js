const mongoose = require("mongoose");

const Students = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    instituteAlloted: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "institute",
        default: null,
    },
    stream: {
        type: String,
        required: true,
    },
    addedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "volunteers",
    },
});

module.exports = mongoose.model("students", Students);
