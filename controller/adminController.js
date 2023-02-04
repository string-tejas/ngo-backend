const asyncHandler = require("express-async-handler");
const Admin = require("../model/Admin");
const { hashPassword } = require("../utils/hash");

// * create admin
const createAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password || !age) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    //   check if admin exists
    const exists = await Admin.findOne({ email }).lean().exec();

    if (exists) {
        return res
            .status(409)
            .json({ message: `Admin with email ${email} already exists` });
    }

    //   create
    const userObj = {
        name,
        email,
        password: await hashPassword(password),
        age,
    };

    const result = await Admin.create(userObj);

    return res.json({
        message: "Admin created",
        // todo for testing only remove later,
        // result,
    });
});

// * read admin
const getAllAdmin = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const admin = await Admin.find().select("-password").lean().exec();

    if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
    }

    return res.json(admin);
});

module.exports = {
    createAdmin,
    getAllAdmin,
};
