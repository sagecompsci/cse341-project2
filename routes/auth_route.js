const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/auth_controller");

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth/failed" }),
    controller.login
)

router.get("/logout", controller.logout);

router.get("/failed", (req, res) => {
    res.status(401).json({ error: "Google login failed" });
});

module.exports = router;