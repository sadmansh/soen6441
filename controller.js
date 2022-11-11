const fs = require('fs')
const json = fs.readFileSync('store.json')
const store = JSON.parse(json)
const mysql = require('mysql')

const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	connectionLimit: 100
})

class Controller {
	
	/* Get all of whatever we are working with */
	async getAll() {
		return new Promise((resolve, reject) => {
			const query = `SELECT r.*, JSON_OBJECTAGG( i.name, i.amount ) AS ingredients,
			JSON_ARRAYAGG( f.name ) AS types
			FROM IngredientRelationship AS ir
			JOIN Recipe AS r ON ir.Recipe = r.id
			JOIN Ingredient AS i ON ir.Ingredient = i.id
			JOIN FoodTypeRelationship AS fr ON fr.Recipe = r.id
			JOIN FoodType AS f ON fr.FoodType = f.id 
			GROUP BY r.id LIMIT 5`

			db.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	}

	/* Get individual items of whatever we are working with */
	async get(id) {
		return new Promise((resolve, reject) => {
			const item = store.find(i => i.id === parseInt(id))
			if (item) {
				resolve(item)
			} else {
				reject(`Item with id ${id} not found.`)
			}
		})
	}

	/* Create whatever we are working with */
	async create(data) {
		return new Promise((resolve, _) => {
			const item = {
				id: store.length + 1,
				...data
			}
			store.push(item)
			fs.writeFileSync('store.json', JSON.stringify(store))
			resolve(data)
		})
	}

	/* Update whatever we are working with */
	async update(item) {
		
	}

	/* Delete whatever we are working with */
	async delete(id) {
		return 
	}
}

module.exports = Controller



