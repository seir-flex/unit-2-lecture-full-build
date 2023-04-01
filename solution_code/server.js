// Dependencies
require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); 
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.set('view engine', 'ejs');
app.use(express.static("public")) // serve files from public statically

app.get('/', (req, res) => {
    res.render("index.ejs")
})

console.log('env',process.env.DATABASE_URL);
app.use(
	session({
		secret: process.env.SECRET,
		store: MongoStore.create({ mongoUrl: 'mongodb+srv://admin:9qXBcu7n9JccCqZ@cluster0.yxzesjt.mongodb.net/?retryWrites=true&w=majority' }),
		saveUninitialized: true,
		resave: false,
	})
);

const fruitsController = require('./controllers/fruits');
app.use('/fruits', fruitsController);

const UserRouter = require('./controllers/user');
app.use('/user', UserRouter);

// Listener
app.listen(process.env.PORT, () =>
	console.log(`express is listening on port: ${process.env.PORT}`)
);