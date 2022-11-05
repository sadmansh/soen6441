const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((error) => {
    if (error) {
        console.error('Cannot connect to database: ', error)
    } else {
        console.log('Connected to database.')
        // Run sample query
        db.query(`SHOW DATABASES`, (error, result) => {
            if (error) {
                console.error('Error executing the query: ', error)
            } else {
                console.log('Result: ', result)
            }
        })
    }
})