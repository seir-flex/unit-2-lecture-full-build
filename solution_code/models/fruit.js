const { mongoose } = require('../db/connection');

const fruitsSchema = new mongoose.Schema({
    name: String,
    color: String,
    readyToEat: Boolean
}, {timestamps: true})

const Fruit = mongoose.model('Fruit', fruitsSchema)

module.exports = Fruit