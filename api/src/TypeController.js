const fs = require('fs')
const mysql = require('mysql')

const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	connectionLimit: 100
})

class TypeController {
	
	/* Get all of whatever we are working with */
	async getAll() {
		return new Promise((resolve, reject) => {
			const query = `SELECT * FROM FoodType`

			db.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	}
}

module.exports = TypeController



