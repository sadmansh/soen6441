const mysql = require('mysql')

const tables = {
	createRecipeTable: `CREATE TABLE IF NOT EXISTS Recipe(
		id INT PRIMARY KEY AUTO_INCREMENT,
		title VARCHAR(500) NOT NULL UNIQUE,
		summary TEXT,
		instructions TEXT,
		image VARCHAR(500),
		servings INT,
		time INT
	)`,
	createFoodTypeTable: `CREATE TABLE IF NOT EXISTS FoodType (
		id INT PRIMARY KEY AUTO_INCREMENT,
		name VARCHAR(500) NOT NULL UNIQUE
	)`,
	createIngredientTable: `CREATE TABLE IF NOT EXISTS Ingredient (
		id INT PRIMARY KEY AUTO_INCREMENT,
		name VARCHAR(500) NOT NULL UNIQUE
	)`,
	createFoodTypeRelationshipTable: `CREATE TABLE IF NOT EXISTS FoodTypeRelationship (
		id INT PRIMARY KEY AUTO_INCREMENT,
		recipe INT NOT NULL,
		foodType INT NOT NULL,
		CONSTRAINT constr_recipe_foodtype_fk
			FOREIGN KEY (recipe) REFERENCES Recipe(id)
			ON DELETE CASCADE ON UPDATE CASCADE,
		CONSTRAINT constr_foodType_fk
			FOREIGN KEY (foodType) REFERENCES FoodType(id)
			ON DELETE CASCADE ON UPDATE CASCADE
	)`,
	createIngredientRelationshipTable: `CREATE TABLE IF NOT EXISTS IngredientRelationship (
		id INT PRIMARY KEY AUTO_INCREMENT,
		recipe INT NOT NULL,
		ingredient INT NOT NULL,
		amount VARCHAR(500),
		CONSTRAINT constr_recipe_ingredient_fk
			FOREIGN KEY (recipe) REFERENCES Recipe(id)
			ON DELETE CASCADE ON UPDATE CASCADE,
		CONSTRAINT constr_ingredient_fk
			FOREIGN KEY (ingredient) REFERENCES Ingredient(id)
			ON DELETE CASCADE ON UPDATE CASCADE
	)`
}

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
	}
})

// Create tables
Object.keys(tables).forEach(query => {
	db.query(tables[query], (error, result) => {
		if (error) {
			console.error('Error executing the query: ', error)
		} else {
			console.log(`Table ${query} loaded ✅`)
		}
	})
})


module.exports = db