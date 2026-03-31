const swaggerAutogen = require("swagger-autogen");
const fs = require("fs");
require("dotenv").config();

const doc = {
    info: {
        title: "My API",
        description: "Project 2 "
    },
    host: process.env.PROD,
    schemes: [
        "https",
        "http"
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    }
};

const outputFile = "./swagger.json";
const endpointFiles = ["./app.js"]

swaggerAutogen(outputFile, endpointFiles, doc)
