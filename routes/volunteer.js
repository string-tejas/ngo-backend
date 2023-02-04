const router = require("express").Router();
const volunteerController = require("../controller/volunteerController");

router
    .route("/")
    .get(volunteerController.getAllVolunteers)
    .post(volunteerController.createVolunteer);

module.exports = router;
