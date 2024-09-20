const express = require("express");

const router = express.Router();
const deptController = require("../controller/departmentController");
const authenticate = require("../middleware/authenticate.middleware");
const authorize = require("../middleware/authorize.middleware");

router.post("/", authenticate, deptController.createDepartment);
router.get("/", authenticate, deptController.getAllDepts);
router.get("/get/:id", authenticate, deptController.getDeptInfo);
router.post("/update/:id", authenticate, deptController.updateDept);
router.put("/delete/:id", authenticate, deptController.deleteDept);

module.exports = router;
