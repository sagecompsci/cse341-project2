const validator = require('../helpers/validator');

module.exports.users = (req, res, next) => {
    const validationRule = {
        username: "required|string",
        level: "required|numeric",
        recentActivity: "required|numeric",
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
