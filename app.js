const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const usersRoute = require("./routes/users_route");
const gamesRoute = require("./routes/games_route");
const authRoute = require("./routes/auth_route")
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json")

require("dotenv").config();
const session = require("express-session")
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy;


app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GoogleStrategy ({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://cse341-project2-l43n.onrender.com/auth/google/callback"
}, (accessToke, refreshToken, profile, done) => {
    return done(null, profile);
}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/users", usersRoute)
app.use("/games", gamesRoute)
app.use("/auth", authRoute)

mongodb.initDb((err, mongodb) => {
    if (err){
        console.log(err)
    } else{
        app.listen(8000)
        console.log(`Listening on 8000`)
    }
})