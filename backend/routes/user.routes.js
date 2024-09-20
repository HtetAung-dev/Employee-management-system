const express = require("express");

const router = express.Router();
const userController = require("../controller/userController");
const authenticate = require("../middleware/authenticate.middleware");


router.post("/", authenticate, userController.createUser);
router.get("/", authenticate, userController.getAllUsers);
router.get("/get", authenticate, userController.getUserInfo);
router.get("/staff/info/:id", authenticate, userController.getAllStaffInfo);
router.post("/update/:id", authenticate,  userController.updateUser);
router.put("/delete/:id", authenticate, userController.deleteUser);
router.post("/assign/role", authenticate, userController.assignRolesToUser);

module.exports = router;
