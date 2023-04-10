const Fruit = require('../models/fruit');

const isFruitOwner = async (req, res, next) => {
    const fruit = await Fruit.findById(req.params.id);
    if (fruit.user.equals(req.session.userId)) {
        next();
    } else {
        res.status(403).send("You are not authorized to perform this action.");
    }
}

function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        res.locals.userId = req.session.userId;
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    isFruitOwner,
    isAuthenticated
};