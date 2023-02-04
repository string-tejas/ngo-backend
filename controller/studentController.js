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
        addedBy,
    };

    const result = await Student.create(obj);

    if (result) {
        return res.json({ message: "Student successfully created" });
    }

    return res.json(400).json({ message: "Student not created" });
});

const addManyStudents = expressAsyncHandler(async (req, res) => {
    const students = req.body;

    // for (let i = 0; i < students.length; i++) {
    //     students[i].addedBy = mongoose.Types.ObjectId(students[i].addedBy);
    // }

    const result = await Student.insertMany(students);

    if (result) {
        return res.json({ message: `${students.length} students added` });
    }
});

const getAllStudents = expressAsyncHandler(async (req, res) => {
    const students = await Student.find({})
        .populate("addedBy", "name")
        .lean()
        .exec();
    if (!students) return res.status(404).json({ message: "No student found" });
    return res.json(students);
});

module.exports = {
    addStudent,
    addManyStudents,
    getAllStudents,
};
