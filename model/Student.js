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
    gender: {
        type: String,
        required: true,
    },
    instituteallotment: {
        type: Boolean,
        default: false,
    },
    instituteAlloted: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "institute",
        default: null,
    },
});

module.exports = mongoose.model("volunteers", Students);
