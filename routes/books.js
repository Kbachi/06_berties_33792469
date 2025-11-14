var express = require('express');
var router = express.Router();

// Note: Assumes `db` is available in scope (e.g. app.locals.db or global)

// --------------------------------------------
// /books/ — index page
// --------------------------------------------
router.get('/', function(req, res) {
    res.render('index.ejs');
});

// --------------------------------------------
// /books/list — show all books
// --------------------------------------------
router.get('/list', function(req, res, next) {
    let sqlquery = "SELECT * FROM books";
    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        res.render('list.ejs', { availableBooks: result });
    });
});

// --------------------------------------------
// /books/addbook — page containing the Add Book form
// renders views/addbooks.ejs (note plural)
// --------------------------------------------
router.get('/addbook', function(req, res) {
    res.render('addbooks.ejs');
});

// --------------------------------------------
// /books/bookadded — handles form submission
// renders views/bookadded.ejs
// --------------------------------------------
    router.post('/', function(req, res, next) {
        let sqlquery = "INSERT INTO books (name, price) VALUES (?, ?)";
        let newrecord = [req.body.name, req.body.price];

        db.query(sqlquery, newrecord, (err, result) => {
            if (err) return next(err);
            res.render('bookadded.ejs', { 
                name: req.body.name, 
                price: req.body.price, 
                insertId: result.insertId 
            });
        });
    });

// --------------------------------------------
// /books/bargainbooks — show books cheaper than £20
// renders views/bargainbooks.ejs
// --------------------------------------------
router.get('/bargainbooks', function(req, res, next) {
    let sqlquery = "SELECT name, price FROM books WHERE price < 20.00";

    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        // Pass variable as `bargainBooks` to match EJS template
        res.render('bargainbooks.ejs', { bargainBooks: result });
    });
});

// --------------------------------------------
// /books/search — search page + results (single view)
// If ?term provided, performs exact match search and renders views/search.ejs
// --------------------------------------------
router.get('/search', function(req, res, next) {
    let term = req.query.term;
    if (!term) {
        // render empty search page/form
        return res.render('search.ejs', { results: [], searchTerm: '' });
    }

    let sqlquery = "SELECT name, price FROM books WHERE name = ?";
    db.query(sqlquery, [term], (err, result) => {
        if (err) return next(err);
        res.render('search.ejs', { results: result, searchTerm: term });
    });
});

// --------------------------------------------
// /books/search-advanced — partial match search (uses same search view)
// /books/search-advanced?term=an
// --------------------------------------------
router.get('/search-advanced', function(req, res, next) {
    let term = req.query.term;
    if (!term) {
        return res.render('search.ejs', { results: [], searchTerm: '' });
    }

    let sqlquery = "SELECT name, price FROM books WHERE name LIKE ?";
    db.query(sqlquery, [`%${term}%`], (err, result) => {
        if (err) return next(err);
        res.render('search.ejs', { results: result, searchTerm: term });
    });
});

// --------------------------------------------
// /books/about — about page
// --------------------------------------------
router.get('/about', function(req, res) {
    res.render('about.ejs');
});

// --------------------------------------------
// /books/register — registration page
// --------------------------------------------
router.get('/register', function(req, res) {
    res.render('register.ejs');
});

module.exports = router;
