const asyncHandler = require("express-async-handler");
const Volunteer = require("../model/Volunteer");
const { hashPassword } = require("../utils/hash");

// * create volunteer
const createVolunteer = asyncHandler(async (req, res) => {
    const { name, email, password, age, institute } = req.body;

    if (!name || !email || !password || !age || !institute) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    //   check if volunteer exists
    const exists = await Volunteer.findOne({ email }).lean().exec();

    if (exists) {
        return res
            .status(409)
            .json({ message: `Volunteer with email ${email} already exists` });
    }

    //   create
    const userObj = {
        name,
        email,
        password: await hashPassword(password),
        age,
        institute,
    };

    const result = await Volunteer.create(userObj);

    if (!result)
        return res.status(404).json({
            message: "User not found",
        });

    return res.json({
        message: "Volunteer created",
        // todo for testing only remove later,
        // result,
    });
});

// * read user
const getAllVolunteers = asyncHandler(async (req, res) => {
    const volunteers = await Volunteer.find().select("-password").lean().exec();

    if (!volunteers) {
        return res.status(404).json({ message: "Volunteer not found" });
    }

    return res.json(volunteers);
});

module.exports = {
    createVolunteer,
    getAllVolunteers,
};
