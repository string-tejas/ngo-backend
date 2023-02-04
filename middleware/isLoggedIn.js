const expressAsyncHandler = require("express-async-handler");

const isLoggedIn = expressAsyncHandler(async (req, res, next) => {
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
        req.user = { ...user, userType };
        next();
    } else if (decoded.userType === "volunteer") {
        const user = await Volunteer.findById(decoded._id)
            .select("-password")
            .lean()
            .exec();
        req.user = { ...user, userType };
        next();
    } else if (decoded.userType === "institute") {
        const user = await Institue.findById(decoded._id)
            .select("-password")
            .lean()
            .exec();
        req.user = { ...user, userType };
        next();
    }

    return res.status(401).json({
        message: "Not logged in",
    });
});

export default isLoggedIn;
