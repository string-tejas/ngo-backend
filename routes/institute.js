const router = require("express").Router();
const instituteController = require("../controller/instituteController");

router
    .route("/")
    .get(instituteController.getAllInstitute)
    .post(instituteController.createInstitute);

module.exports = router;
