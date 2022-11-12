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
	async getAll(offset) {
		return new Promise((resolve, reject) => {
			const query = `SELECT r.*, JSON_OBJECTAGG( i.name, i.amount ) AS ingredients,
			JSON_ARRAYAGG( f.name ) AS types
			FROM IngredientRelationship AS ir
			JOIN Recipe AS r ON ir.Recipe = r.id
			JOIN Ingredient AS i ON ir.Ingredient = i.id
			JOIN FoodTypeRelationship AS fr ON fr.Recipe = r.id
			JOIN FoodType AS f ON fr.FoodType = f.id 
			GROUP BY r.id LIMIT 100${offset ? `, ${offset}` : ''}`

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
	async getById(id) {
		return new Promise((resolve, reject) => {
			const query = `SELECT r.*, JSON_OBJECTAGG( i.name, i.amount ) AS ingredients,
			JSON_ARRAYAGG( f.name ) AS types
			FROM IngredientRelationship AS ir
			JOIN Recipe AS r ON ir.Recipe = r.id
			JOIN Ingredient AS i ON ir.Ingredient = i.id
			JOIN FoodTypeRelationship AS fr ON fr.Recipe = r.id
			JOIN FoodType AS f ON fr.FoodType = f.id
			WHERE r.id = ${id}`

			db.query(query, (err, result) => {
				if (result) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	}

	/* Find recipes matching a search term */
	async findRecipes(term) {
		return new Promise((resolve, reject) => {
			const query = `SELECT r.*, JSON_OBJECTAGG( i.name, i.amount ) AS ingredients,
			JSON_ARRAYAGG( f.name ) AS types
			FROM IngredientRelationship AS ir
			JOIN Recipe AS r ON ir.Recipe = r.id
			JOIN Ingredient AS i ON ir.Ingredient = i.id
			JOIN FoodTypeRelationship AS fr ON fr.Recipe = r.id
			JOIN FoodType AS f ON fr.FoodType = f.id
			WHERE 
			r.title LIKE '%${term}%' OR
			r.summary LIKE '%${term}%' OR
			r.instructions LIKE '%${term}%' OR
			i.name LIKE '%${term}%' OR
			f.name LIKE '%${term}%'
			GROUP BY r.id
			`
			db.query(query, (err, result) => {
				if (result) {
					resolve(result)
				} else {
					reject(err)
				}
			})
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



