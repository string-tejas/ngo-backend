const asyncHandler = require("express-async-handler");
const { comparePassword } = require("../utils/hash");
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const Institue = require("../model/Institute");
const Volunteer = require("../model/Volunteer");

const loginLogic = async (email, password, Collection) => {
    const entity = await Collection.findOne({ email }).lean().exec();

    if (!entity)
        return {
            success: false,
            status: 404,
            message: "Not found",
        };

    if (await comparePassword(password, entity.password)) {
        const token = jwt.sign(
            {
                _id: entity._id,
                email: entity.email,
            },
            process.env.JWT_SECRET
        );

        return {
            success: true,
            token,
        };
    }
    return {
        success: false,
        status: 403,
        message: "Invalid Password",
    };
};

const loginFor = (userType) => {
    return asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Enter all credentials" });

        let result;
        switch (userType) {
            case "admin":
                result = await loginLogic(email, password, Admin);
                break;

            case "volunteer":
                result = await loginLogic(email, password, Volunteer);
                break;

            case "institute":
                result = await loginLogic(email, password, Institue);
        }

        if (!result.success) {
            return res.status(result.status).json({ message: result.message });
        }

        res.cookie(`${userType}-token`, result.token, {
            sameSite: "None",
            httpOnly: true,
            // secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.json({
            message: "Login successful",
            token: result.token,
        });
    });
};

module.exports = {
    loginFor,
};
