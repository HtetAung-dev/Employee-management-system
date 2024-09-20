const express = require("express");

const router = express.Router();
const staffController = require("../controller/staffController");
const authenticate = require("../middleware/authenticate.middleware");

router.post("/create", authenticate, staffController.createStaff);
router.get("/detail/:id", authenticate, staffController.getStaffDetail)

module.exports = router;
