const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function(app) {

    // ----- GET /users/list -----
    app.get('/users/list', function(req, res) {

        const sql = "SELECT username, first_name, last_name, email FROM users";

        db.query(sql, function(err, results) {
            if (err) {
                console.log(err);
                return res.send("Error loading users");
            }

            res.render('users_list.ejs', { users: results });
        });

    });

    // ----- GET /users/login -----
    app.get('/users/login', function(req, res) {
        res.render('login.ejs');
    });


    // ----- POST /users/loggedin -----
    app.post('/users/loggedin', function(req, res) {

        const username = req.body.username;
        const password = req.body.password;

        const sql = "SELECT hashed_password FROM users WHERE username = ?";

        db.query(sql, [username], function(err, results) {
            if (err || results.length === 0) {

                // Log failed login
                db.query(
                    "INSERT INTO login_audit (username, success, ip_address, user_agent) VALUES (?, ?, ?, ?)",
                    [username, 0, req.ip, req.get('User-Agent')]
                );

                return res.send("Login failed: incorrect username or password");
            }

            const hashed = results[0].hashed_password;

            bcrypt.compare(password, hashed, function(err, match) {

                // Log audit entry
                const auditSQL = `
                INSERT INTO login_audit (username, success, ip_address, user_agent)
                VALUES (?, ?, ?, ?)
                `;

                db.query(auditSQL, [
                    username,
                    match ? 1 : 0,
                    req.ip,
                    req.get('User-Agent')
                ]);

                if (match) {
                    res.send("Login successful!");
                } else {
                    res.send("Login failed: incorrect username or password");
                }

            });
        });

    });


    // ----- POST /registered -----
    app.post('/registered', function(req, res) {

        const username = req.body.username;
        const plainPassword = req.body.password;
        const first = req.body.first;
        const last = req.body.last;
        const email = req.body.email;

        bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
            if (err) {
                console.log(err);
                return res.send("Error hashing password");
            }

            const sql = `
                INSERT INTO users (username, first_name, last_name, email, hashed_password)
                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(sql, [username, first, last, email, hashedPassword], function(err, result) {
                if (err) {
                    console.log(err);
                    return res.send("Database insert error");
                }

                res.send(`
                    Hello ${first} ${last}, you are now registered!<br>
                    We will send an email to ${email}.<br><br>

                    DEBUG (remove later):<br>
                    Your password: ${plainPassword}<br>
                    Hashed password: ${hashedPassword}
                `);
            });

        });

    });


    // ----- GET /users/audit -----
    app.get('/users/audit', function(req, res) {
        const sql = "SELECT * FROM login_audit ORDER BY event_time DESC";

        db.query(sql, function(err, results) {
            if (err) {
                console.log(err);
                return res.send("Error loading audit log");
            }

            res.render('audit.ejs', { audit: results });
        });
    });

};  