const express = require("express");
router = express.Router();

const controller = require("../controllers/games_controller");
const validation = require("../middleware/games_validator.js")

router.get("/", controller.getAllGames)

router.get("/:id", controller.getOneGame)

router.post("/", validation.games, controller.createGame)

router.put("/:id", validation.games, controller.updateGame)

router.delete("/:id", controller.deleteGame)

module.exports = router
