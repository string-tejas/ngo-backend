const router = require("express").Router();
const volunteerController = require("../controller/volunteerController");
const isLoggedIn = require("../middleware/isLoggedIn");

router
    .route("/")
    .get(volunteerController.getAllVolunteers)
    .post(volunteerController.createVolunteer);

router
    .route("/contribution")
    .get(isLoggedIn, volunteerController.getNumOfStudAddedByVolunteer);

router
    .route("/enrolled")
    .get(isLoggedIn, volunteerController.getStudentEnrolledByVolunteer);

module.exports = router;
