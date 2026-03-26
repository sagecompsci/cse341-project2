const express = require("express");
router = express.Router();

const controller = require("../controllers/users_controller");
const validation = require("../middleware/users_validator")

router.get("/", controller.getAllUsers)

router.get("/:id", controller.getOneUser)

router.post("/", validation.users, controller.createUser)

router.put("/:id", validation.users, controller.updateUser)

router.delete("/:id", controller.deleteUser)

module.exports = router