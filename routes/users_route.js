const express = require("express");
router = express.Router();

const controller = require("../controllers/users_controller");
const validation = require("../middleware/users_validator")

const auth = require("../middleware/authorization")

router.get("/", auth.isLoggedIn, (req, res) => {
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.getAllUsers(req, res);
});

router.get("/:id", auth.isLoggedIn,
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.getOneUser)

router.post("/", validation.users, controller.createUser)

router.put("/:id", validation.users, controller.updateUser)

router.delete("/:id", controller.deleteUser)

module.exports = router