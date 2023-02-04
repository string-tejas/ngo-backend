const expressAsyncHandler = require("express-async-handler");
const { loginFor, checkUser } = require("../controller/authController");

const router = require("express").Router();

router.route("/login/admin").post(loginFor("admin"));

router.route("/check-user").get(checkUser);

router.route("/login/volunteer").post(loginFor("volunteer"));

router.route("/login/institute").post(loginFor("institute"));

router.route("/logout").get(
    expressAsyncHandler(async (req, res) => {
        res.clearCookie("token");
        return res.sendStatus(200);
    })
);

module.exports = router;
