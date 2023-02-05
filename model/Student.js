const mongoose = require("mongoose");

const Students = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    age: {
        type: Number,
    },
    instituteAlloted: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "institute",
        default: null,
    },
    stream: {
        type: String,
        default: null,
    },
    addedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "volunteers",
    },
    addedByIns: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "institute",
    },
});

module.exports = mongoose.model("students", Students);
