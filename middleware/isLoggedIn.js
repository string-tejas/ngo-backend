const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const Institute = require("../model/Institute");
const Volunteer = require("../model/Volunteer");

const isLoggedIn = async (req, res, next) => {
    const token = req.cookies?.token;
    console.log(req.cookies);

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
        req.user = { ...user, userType: decoded.userType };
        next();
    } else if (decoded.userType === "volunteer") {
        const user = await Volunteer.findById(decoded._id)
            .select("-password")
            .lean()
            .exec();
        req.user = { ...user, userType: decoded.userType };
        next();
    } else if (decoded.userType === "institute") {
        const user = await Institute.findById(decoded._id)
            .select("-password")
            .lean()
            .exec();
        req.user = { ...user, userType: decoded.userType };
        next();
    } else
        return res.status(401).json({
            message: "Not logged in",
        });
};

module.exports = isLoggedIn;
