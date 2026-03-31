const jwt = require("jsonwebtoken")

module.exports.login = (req, res) => {
    const token = jwt.sign(
        {
            id: req.user.id,
            name: req.user.displayName,
            email: req.user.emails[0].value
        },
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );
    res.json({
        message: "Login Successful! Copy your token and use it as is: Authorization: Bearer <token>",
        token: token
    });
};

module.exports.logout = (req, res) => {
    res.json({message: "Logged Out"})
}