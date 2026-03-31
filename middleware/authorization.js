const jwt = require("jsonwebtoken")

module.exports.isLoggedIn = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({error: "Missing or Invalid Authorization Header"})
    }

    const token = authHeader.split(" ")[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch(err){
        return res.status(401).json({error: "Invalid or expired token"})
    }

}