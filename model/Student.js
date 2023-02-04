const mongoose = require("mongoose");

const Students = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    addresss: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    // instituteAlloted: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "institute",
    //     default: null,
    // },
});

module.exports = mongoose.model("volunteers", Students);
