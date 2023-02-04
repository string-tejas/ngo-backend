const asyncHandler = require("express-async-handler");
const Admin = require("../model/Admin");

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
});

module.exports = {
  loginAdmin,
};
