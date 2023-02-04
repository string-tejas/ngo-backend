const router = require("express").Router();
const studentController = require("../controller/studentController");

router.route("/").get(studentController.getAllStudents);

router.route("/add").post(studentController.addStudent);

router.route("/add-many").post(studentController.addManyStudents);

module.exports = router;
