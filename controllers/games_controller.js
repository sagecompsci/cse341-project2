const mongodb = require("../db/connect")
const { ObjectId } = require("mongodb")
const db = "project2"
const collection = "games"


module.exports.getAllGames = async (req, res) => {
    try{
        const result = await mongodb.getDb().db(db).collection(collection).find();
        result.toArray().then((lists) => {
            res.setHeader("Content-type", "application/json");
            res.status(200).json(lists)
        })
    } catch(err) {
        res.status(500).json("Could not connect to database")
    }
}

module.exports.getOneGame = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)){
            res.status(400).json("Must use a valid id")
        }
        const id = new ObjectId(req.params.id)

        const result = await mongodb.getDb().db(db).collection(collection).find({_id: id})
        result.toArray().then((lists) => {
            res.setHeader("Content-type", "application/json")
            res.status(200).json(lists)
        })

    } catch (err) {
        res.status(500).json("Could not connect to database")
    }
}

module.exports.createGame = async (req, res) => {
    try {
        const game = {
            name: req.body.name,
            description: req.body.description,
            releaseDate: req.body.releaseDate,
            developer: req.body.developer,
            publisher: req.body.publisher,
            cost: req.body.cost,
            discount: req.body.discount
        }
        const response = await mongodb.getDb().db(db).collection(collection).insertOne(game)
        if (response.acknowledged) {
            res.status(204).send(response);
        } else {
            res.status(500).json(response.error || `An error occurred while creating the user.`)
        }

    } catch(err) {
        res.status(500).json(`An error occurred while creating the user`)
    }
}

module.exports.updateGame = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)){
            res.status(400).json("Must use a valid id")
        }
        const id = new ObjectId(req.params.id)

        const game = {
            name: req.body.name,
            description: req.body.description,
            releaseDate: req.body.releaseDate,
            developer: req.body.developer,
            publisher: req.body.publisher,
            cost: req.body.cost,
            discount: req.body.discount
        }

        const response = await mongodb.getDb().db(db).collection(collection).replaceOne({_id: id}, game)
        if (response.modifiedCount > 0) {
            res.status(204).send()
        }

    } catch (err) {
        res.status(500).json(`An error occurred while updating the user`)
    }
}

module.exports.deleteGame = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)){
            res.status(400).json("Must use a valid id")
        }
        const id = new ObjectId(req.params.id)
        const response = await mongodb.getDb().db(db).collection(collection).deleteOne({_id: id})
        if (response.deletedCount > 0) {
            res.status(204).send()
        } else {
            res.status(500).json(response.error || "An error occurred while deleting the user")
        }
    } catch (err) {
        res.status(500).json("An error occurred while deleting the user")
    }
}