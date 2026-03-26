const validator = require('../helpers/validator');

module.exports.games = (req, res, next) => {
    const validationRule = {
        name: "required|string",
        description: "required|string",
        releaseDate: "required|string",
        developer: "required|string",
        publisher: "required|string",
        cost: "required|numeric",
        discount: "required|numeric"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

