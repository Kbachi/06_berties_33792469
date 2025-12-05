require('dotenv').config();

// Import the modules we need
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var session = require('express-session');

// Create the express application object
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

// Set up css
app.use(express.static(__dirname + '/public'));

// Set the directory where Express will pick up HTML files
app.set('views', __dirname + '/views');

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Tells Express how we should process html files
app.engine('html', ejs.renderFile);

app.locals.shopData = { shopName: "Bertie's Books" };

// Set up the database connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Make the database available everywhere
global.db = db;


// sets up the session
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 600000, secure: false } // secure:false to work on localhost
}));


// NOW load routes (after session)
require('./users')(app);

// Define our data
var shopData = { shopName: "Bertie's Books" };

// Routes
require("./routes/main")(app, shopData);

var weatherRouter = require('./routes/weather');
app.use('/', weatherRouter);

var booksRouter = require('./routes/books');
app.use('/books', booksRouter);

var apiRouter = require('./routes/api');
app.use('/', apiRouter);


// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
