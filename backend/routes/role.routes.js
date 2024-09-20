const express = require("express");

const router = express.Router();
const roleController = require("../controller/roleController");
const authenticate = require("../middleware/authenticate.middleware");

router.post("/", authenticate, roleController.createRole);

module.exports = router;
