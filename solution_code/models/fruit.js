const { mongoose } = require('../db/connection');
const User = require('./user.js')

const fruitsSchema = new mongoose.Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Fruit = mongoose.model('Fruit', fruitsSchema)

module.exports = Fruit