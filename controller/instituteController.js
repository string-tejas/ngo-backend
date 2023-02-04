const asyncHandler = require("express-async-handler");
const Institute = require("../model/Institute");
const { hashPassword } = require("../utils/hash");

// * create volunteer
const createInstitute = asyncHandler(async (req, res) => {
    const { name, email, password, city } = req.body;

    if (!name || !email || !password || !city) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    //   check if admin exists
    const exists = await Institute.findOne({ email }).lean().exec();

    if (exists) {
        return res
            .status(409)
            .json({ message: `Institute with email ${email} already exists` });
    }

    //   create
    const insObj = {
        name,
        email,
        password: await hashPassword(password),
        city,
    };

    const result = await Institute.create(insObj);

    if (result) {
        return res.json({
            message: "Institue added",
            // todo for testing only remove later,
            // result,
        });
    }
    return res.status(400).json({
        message: "Institute not added",
    });
});

// * read user
const getAllInstitute = asyncHandler(async (req, res) => {
    const institutes = await Institute.find().select("-password").lean().exec();

    if (!institutes) {
        return res.status(404).json({ message: "No Institutes found" });
    }

    return res.json(institutes);
});

module.exports = {
    createInstitute,
    getAllInstitute,
};
