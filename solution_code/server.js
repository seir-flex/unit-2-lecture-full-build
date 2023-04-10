// Dependencies
require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); 
const methodOverride = require('method-override');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');


app.use(
    session({
        // The store needs to know that it's a mongo database and it needs access to the databases' connection
        store: MongoStore.create({ 
            mongoUrl: process.env.DATABASE_URL 
        }),
        // The secret ensures it's not some outside attack and it signs every session
        secret: process.env.SECRET,
        // No resaving the same same session and saving unitialized sessions
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30
            // This set the cookie to last for 30 days because it's in milliseconds
        }
    }),
)
/////////////////////////////////////////////////////
// Middleware  req => middleware => res
/////////////////////////////////////////////////////
app.set('view engine', 'ejs')
app.use(morgan("tiny")) //logging// 
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically

app.get('/', (req, res) => {
    res.render('home')
})

const fruitsController = require('./controllers/fruits');
const userController = require('./controllers/users')
app.use('/fruits', fruitsController);
app.use('', userController);

// Listener
app.listen(process.env.PORT, () =>
	console.log(`express is listening on port: ${process.env.PORT}`)
);