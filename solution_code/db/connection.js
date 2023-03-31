require("dotenv").config();
const mongoose = require("mongoose")

const connectionString = process.env.DATABASE_URL

mongoose.connect(connectionString)

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to mongoDB")
})

mongoose.connection.on("error", (error) => {
    console.log("mongoDB Connection Error:", error)
})

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
})
