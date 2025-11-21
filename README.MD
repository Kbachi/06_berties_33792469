# Bertie’s Books – Security Summary (Lab 7)

## Audit Logging Implementation
In this assignment, I implemented audit logging by creating a dedicated `audit_logs` table in the MySQL database. This table stores the username used during a login attempt, whether the attempt was a **success** or **failed**, and an automatic timestamp. Inside the `/users/loggedin` route, after checking the submitted password against the stored hashed password, the app records the outcome using an SQL `INSERT` query. This ensures that every authentication event is captured.

A new `/users/audit` route was also added to retrieve and display all audit entries. This allows the full login history to be viewed directly through the application. Although this feature is simple in the lab, it reflects real-world security practices: tracking login activity is essential for identifying unusual patterns such as repeated failed attempts, brute-force attacks, or suspicious access times. Audit logs also support debugging, accountability, and compliance requirements in production systems.

## dotenv Implementation
To protect sensitive credentials in this assignment, I installed and configured the `dotenv` module. I created a `.env` file to store values such as the database host, username, password, and database name. These values were then loaded inside `index.js` using `require("dotenv").config()`, allowing the database connection to use `process.env.DB_HOST`, `process.env.DB_USER`, and other environment variables.

This prevents the database password and other sensitive details from being hard-coded into the project. The `.env` file is also excluded from version control, so if the repository is uploaded to GitHub, none of these secrets are exposed. This mirrors professional development standards: environment variables are used to keep authentication credentials, API keys, and configuration values private while still allowing the app to run normally on both local machines and the VM.
