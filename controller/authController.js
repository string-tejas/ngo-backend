const asyncHandler = require("express-async-handler");
const { comparePassword } = require("../utils/hash");
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const Institue = require("../model/Institute");
const Volunteer = require("../model/Volunteer");

const loginLogic = async (email, password, Collection, userType) => {
    const entity = await Collection.findOne({ email }).lean().exec();

    if (!entity)
        return {
            success: false,
            status: 404,
            message: "Not found",
        };

    if (await comparePassword(password, entity.password)) {
        delete entity.password;
        const token = jwt.sign(
            {
                _id: entity._id,
                email: entity.email,
                userType,
            },
            process.env.JWT_SECRET
        );

        return {
            success: true,
            token,
            user: entity,
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
                result = await loginLogic(email, password, Admin, userType);
                break;

            case "volunteer":
                result = await loginLogic(email, password, Volunteer, userType);
                break;

            case "institute":
                result = await loginLogic(email, password, Institue, userType);
        }

        if (!result.success) {
            return res.status(result.status).json({ message: result.message });
        }

        res.cookie(`token`, result.token, {
            sameSite: "None",
            httpOnly: true,
            secure: true,
        });

        res.json({
            message: "Login successful",
            token: result.token,
            userType,
            user: result.user,
        });
    });
};

const checkUser = asyncHandler(async (req, res) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(403).json({
            message: "Not logged In",
        });
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    if (!decoded) {
        return res.status(403).json({
            message: "Not logged In",
        });
    }

    if (decoded.userType === "admin") {
        const user = await Admin.findById(decoded._id)
            .select("-password")
            .lean()
            .exec();
        return res.json({
            user,
        });
    } else if (decoded.userType === "volunteer") {
        const user = await Volunteer.findById(decoded._id)
            .select("-password")
            .lean()
            .exec();
        return res.json({
            user,
        });
    } else if (decoded.userType === "institute") {
        const user = await Institue.findById(decoded._id)
            .select("-password")
            .lean()
            .exec();
        return res.json({
            user,
        });
    }

    return res.status(401).json({
        message: "Not logged in",
    });
});

module.exports = {
    loginFor,
    checkUser,
};
