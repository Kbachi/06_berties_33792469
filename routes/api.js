var express = require('express');
var router = express.Router();

// GET /api/books
router.get('/api/books', function (req, res, next) {

    // Read query parameters
    let search = req.query.search;       // ?search=world
    let min = req.query.minprice;       // ?minprice=5
    let max = req.query.maxprice;       // ?maxprice=10
    let sort = req.query.sort;          // ?sort=name or ?sort=price

    // Build WHERE conditions
    let conditions = [];

    if (search) {
        conditions.push(`name LIKE '%${search}%'`);
    }

    if (min) {
        conditions.push(`price >= ${min}`);
    }

    if (max) {
        conditions.push(`price <= ${max}`);
    }

    // Start SQL
    let sqlquery = "SELECT * FROM books";

    // Add WHERE if we have any conditions
    if (conditions.length > 0) {
        sqlquery += " WHERE " + conditions.join(" AND ");
    }

    // Add sorting (Task 5)
    if (sort === 'name') {
        sqlquery += " ORDER BY name ASC";
    } else if (sort === 'price') {
        sqlquery += " ORDER BY price ASC";
    }

    // Optional: log query for debugging
    console.log("API /api/books SQL:", sqlquery);

    // Run the query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.json(err);
            return next(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
