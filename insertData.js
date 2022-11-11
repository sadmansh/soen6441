require('dotenv/config')
const fs = require('fs')
const mysql = require('mysql')
const PoolCluster = require('mysql/lib/PoolCluster')
const store = fs.readFileSync('store.json')
let recipes = JSON.parse(store).recipes

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
})

// Filter recipes to make sure they contain ingredients and types
recipes = recipes.filter(recipe => {
	return recipe.extendedIngredients.length && recipe.dishTypes.length
})

recipes.forEach((row, index) => {
	let stmt = `INSERT INTO Recipe (title, summary, instructions, image, servings, time) VALUES (?, ?, ?, ?, ?, ?)`
	let query = mysql.format(stmt, [row.title, row.summary, row.instructions, row.image, row.servings, row.readyInMinutes])
	insertQuery(query)

	// Insert ingredients
	row.extendedIngredients.forEach(ingredient => {
		const amount = ingredient.original.replace(ingredient.nameClean, '').trim()
		stmt = `
			INSERT IGNORE INTO Ingredient (name) VALUES (?);
		`
		query = mysql.format(stmt, [ingredient.nameClean])
		insertQuery(query)
		
		stmt = `
			INSERT INTO IngredientRelationship (recipe, ingredient, amount) VALUES (
				(SELECT id FROM Recipe WHERE title = ? LIMIT 1),
				(SELECT id FROM Ingredient WHERE name = ? LIMIT 1),
				?
			);
		`
		query = mysql.format(stmt, [row.title, ingredient.nameClean, amount])
		insertQuery(query)
	})

	// Insert dish type
	row.dishTypes.forEach(type => {
		stmt = `
			INSERT IGNORE INTO FoodType (name) VALUES (?);
		`
		query = mysql.format(stmt, [type])
		insertQuery(query)
		stmt = `
			INSERT INTO FoodTypeRelationship (recipe, foodType) VALUES (
					(SELECT id FROM Recipe WHERE title = ? LIMIT 1),
					(SELECT DISTINCT id FROM FoodType WHERE name = ? LIMIT 1)
				);
		`
		query = mysql.format(stmt, [row.title, type])
		insertQuery(query)
	})
})

function insertQuery(query) {
	db.query(query, (err, res) => {
		if (err) {
			console.error(err)
			return
		} else {
			console.log('Inserted.')
		}
	})
}




// db.connect((error) => {
// 	if (error) {
// 		console.error('Cannot connect to database: ', error)
// 	} else {
// 		console.log('Connected to database.')
// 	}
// })

// const sqlQuery = (query) => {
// 	db.query(query, (error, result) => {
// 		if (error) {
// 			console.error('Error executing the query: ', error)
// 		} else {
// 			console.log(result)
// 		}
// 	})
// }

recipes.slice(0, 1).forEach(row => {
	// Insert recipe
	// let stmt = `INSERT INTO Recipe VALUES (?, "${row.title}", "${row.summary}", "${row.instructions}", "${row.image}", ${row.servings}, ${row.readyInMinutes});`
	// sqlQuery(stmt)

	// Insert recipe ingredient
	// row.extendedIngredients.forEach(ingredient => {
	// 	stmt = `
	// 		INSERT IGNORE INTO Ingredient (name, withAmount)
	// 			VALUES ("${ingredient.nameClean}", "${ingredient.original}");
	// 	`
	// 	sqlQuery(stmt)

	// 	stmt = `
	// 		INSERT INTO IngredientRelationship (recipe, ingredient)
	// 			VALUES (
	// 				(SELECT id FROM Recipe WHERE title = "${row.title}"),
	// 				(SELECT id FROM Ingredient WHERE name = "${ingredient.nameClean}")
	// 			);
	// 	`
	// 	sqlQuery(stmt)
	// })

	// // Insert dish type
	// row.dishTypes.forEach(type => {
	// 	stmt = `
    //         INSERT IGNORE INTO FoodType (name)
    //             VALUES (${type});
    //     `
	// 	sqlQuery(stmt)

    //     stmt = `
    //         INSERT INTO FoodTypeRelationship (recipe, foodType)
    //             VALUES (
    //                 (SELECT id FROM Recipe WHERE title = "${row.title}"),
    //                 (SELECT id FROM FoodType WHERE name = "${type}")
    //             );
	// 	`
	// 	sqlQuery(stmt)
	// })

})
