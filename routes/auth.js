const { loginFor } = require("../controller/authController");

const router = require("express").Router();

router.route("/login/admin").post(loginFor("admin"));

router.route("/login/volunteer").post(loginFor("volunteer"));

router.route("/login/institute").post(loginFor("institute"));

module.exports = router;
