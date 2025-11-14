var express = require('express');
var router = express.Router();

// --------------------------------------------
// /books/list — show all books
// --------------------------------------------
router.get('/list', function(req, res, next) {
    let sqlquery = "SELECT * FROM books";
    db.query(sqlquery, (err, result) => {
        if (err) next(err);
        res.render('list.ejs', { availableBooks: result });
    });
});

// --------------------------------------------
// /books/addbook — page containing the Add Book form
// --------------------------------------------
router.get('/addbook', function(req, res) {
    res.render('addbook.ejs');
});

// --------------------------------------------
// /books/bookadded — handles form submission
// --------------------------------------------
router.post('/bookadded', function(req, res, next) {
    let sqlquery = "INSERT INTO books (name, price) VALUES (?, ?)";
    let newrecord = [req.body.name, req.body.price];

    db.query(sqlquery, newrecord, (err, result) => {
        if (err) next(err);
        res.send(`Book added: ${req.body.name} (£${req.body.price})`);
    });
});

// --------------------------------------------
// /books/bargainbooks — show books cheaper than £20
// --------------------------------------------
router.get('/bargainbooks', function(req, res, next) {
    let sqlquery = "SELECT name, price FROM books WHERE price < 20.00";

    db.query(sqlquery, (err, result) => {
        if (err) next(err);
        res.render('bargain.ejs', { bargains: result });
    });
});

// --------------------------------------------
// /books/search — basic exact match search
// /books/search?term=Something
// --------------------------------------------
router.get('/search', function(req, res, next) {
    let term = req.query.term;

    let sqlquery = "SELECT name, price FROM books WHERE name = ?";
    db.query(sqlquery, [term], (err, result) => {
        if (err) next(err);
        res.render('searchresults.ejs', { results: result, searchTerm: term });
    });
});

// --------------------------------------------
// /books/search-advanced — partial match search
// /books/search-advanced?term=an
// --------------------------------------------
router.get('/search-advanced', function(req, res, next) {
    let term = req.query.term;

    let sqlquery = "SELECT name, price FROM books WHERE name LIKE ?";
    db.query(sqlquery, [`%${term}%`], (err, result) => {
        if (err) next(err);
        res.render('searchresults.ejs', { results: result, searchTerm: term });
    });
});

module.exports = router;
