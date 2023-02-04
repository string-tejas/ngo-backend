const admin = require("./authAdminController");
const volunteer = require("./authVolunteerController");
const institute = require("./authInstituteController");

const controller = {
  admin,
  volunteer,
  institute,
};

module.exports = controller;
