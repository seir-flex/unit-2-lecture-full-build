
// import mongoose
const mongoose = require('mongoose')

// database configuration 
const DATABASE_URL =
	'mongodb+srv://admin:9qXBcu7n9JccCqZ@cluster0.yxzesjt.mongodb.net/carina?retryWrites=true&w=majority';

// mongoose connect to url
mongoose.connect(DATABASE_URL)

// export mongoose 
module.exports = { mongoose }

// const mongoose = require("mongoose")

// const connectionString = process.env.DATABASE_URL

// mongoose.connect(connectionString)

// mongoose.connection.on("connected", () => {
//     console.log("Mongoose connected to mongoDB")
// })

// mongoose.connection.on("error", (error) => {
//     console.log("mongoDB Connection Error:", error)
// })

// mongoose.connection.on("disconnected", () => {
//     console.log("mongoDB disconnected")
// })
