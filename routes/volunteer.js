const router = require("express").Router();
const volunteerController = require("../controller/volunteerController");
const studentController = require("../controller/studentController");

router
    .route("/")
    .get(volunteerController.getAllVolunteers)
    .post(volunteerController.createVolunteer);

router.route("/add-student").post(studentController.addStudent);

module.exports = router;
