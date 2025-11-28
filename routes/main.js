module.exports = function(app, shopData) {

    // ----------------------------
    // Optional: Load middleware from users.js
    // (If you need redirectLogin here)
    // ----------------------------
    const redirectLogin = (req, res, next) => {
        if (!req.session.userId) {
            return res.redirect('/users/login');
        }
        next();
    };


    // ----- HOME PAGE -----
    app.get('/', function(req, res) {
        res.render('index.ejs', shopData);
    });


    // ----- ABOUT PAGE -----
    app.get('/about', function(req, res) {
        res.render('about.ejs', shopData);
    });


    // ----- SEARCH FORM -----
    app.get('/search', function(req, res) {
        res.render("search.ejs", shopData);
    });


    // ----- SEARCH RESULT -----
    app.get('/search-result', function(req, res) {
        res.send("You searched for: " + req.query.keyword);
    });


    // ----- REGISTER -----
    app.get('/register', function(req, res) {
        res.render('register.ejs', shopData);
    });


    // ----- REGISTERED (DEMO VERSION) -----
    // NOTE: This is the "fake" version used before bcrypt/database.
    // The real registration lives in users.js now.
    app.post('/registered', function(req, res) {
        res.send('Hello ' + req.body.first + ' ' + req.body.last +
                 '! You are now registered! We will send an email to ' + req.body.email);
    });


    // ---------------------------------------
    //           LOGOUT ROUTE
    // ---------------------------------------
    // Required for Lab 8a — must destroy session
    app.get('/logout', redirectLogin, (req, res) => {

        req.session.destroy(err => {
            if (err) {
                console.log(err);
                return res.redirect('/');
            }

            res.send("You are now logged out. <a href='/'>Home</a>");
        });

    });

};
