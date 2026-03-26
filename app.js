const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const usersRoute = require("./routes/users_route");
const gamesRoute = require("./routes/games_route");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json")

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/users", usersRoute)
app.use("/games", gamesRoute)

mongodb.initDb((err, mongodb) => {
    if (err){
        console.log(err)
    } else{
        app.listen(8000)
        console.log(`Listening on 8000`)
    }
})