const router = require("express").Router();
const adminController = require("../controller/adminController");

router
    .route("/")
    .get(adminController.getAllAdmin)
    .post(adminController.createAdmin);

router.route("/issue-cert").post(adminController.sendCertificate);

module.exports = router;
