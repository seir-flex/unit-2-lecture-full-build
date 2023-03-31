const { mongoose } = require('../db/connection');

const fruitsSchema = new mongoose.Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

const Fruit = mongoose.model('Fruit', fruitsSchema)

module.exports = Fruit