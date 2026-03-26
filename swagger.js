const swaggerAutogen = require("swagger-autogen");
const fs = require("fs")

const doc = {
    info: {
        title: "My API",
        description: "Project 2 "
    },
    host: "https://cse341-project2-l43n.onrender.com/",
};

const outputFile = "./swagger.json";
const endpointFiles = ["./app.js"]

swaggerAutogen(outputFile, endpointFiles, doc)
