const expressAsyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const Student = require("../model/Student");

const addStudent = expressAsyncHandler(async (req, res) => {
    const { name, address, age, stream, addedBy } = req.body;

    if (!name || !address || !age || !stream || !addedBy) {
        return res.status(400).json({
            message: "All fields are necessary",
        });
    }

    const obj = {
        name,
        address,
        age,
        stream,
        addedBy: mongoose.Types.ObjectId(addedBy),
    };

    const result = await Student.create(obj);

    if (result) {
        return res.json({ message: "Student successfully created" });
    }

    return res.json(400).json({ message: "Student not created" });
});

const addManyStudents = expressAsyncHandler(async (req, res) => {
    const students = req.body;

    const result = await Student.insertMany(students);

    if (result) {
        return res.json({ message: `${students.length} students added` });
    }
});

module.exports = {
    addStudent,
    addManyStudents,
};
