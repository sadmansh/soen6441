require("dotenv/config");
const fs = require("fs");
const mysql = require("mysql");
const store = fs.readFileSync("store.json");
let recipes = JSON.parse(store).recipes;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Filter recipes to make sure they contain ingredients and types
recipes = recipes.filter((recipe) => {
  return recipe.extendedIngredients.length && recipe.dishTypes.length;
});

recipes.forEach((row, index) => {
  let stmt = `INSERT INTO Recipe (title, summary, instructions, image, servings, time) VALUES (?, ?, ?, ?, ?, ?)`;
  let query = mysql.format(stmt, [
    row.title,
    row.summary,
    row.instructions,
    row.image,
    row.servings,
    row.readyInMinutes,
  ]);
  insertQuery(query);

  // Insert ingredients
  row.extendedIngredients.forEach((ingredient) => {
    stmt = `
			INSERT IGNORE INTO Ingredient (name, amount) VALUES (?, ?);
		`;
    query = mysql.format(stmt, [ingredient.nameClean, ingredient.original]);
    insertQuery(query);

    stmt = `
			INSERT INTO IngredientRelationship (recipe, ingredient) VALUES (
				(SELECT id FROM Recipe WHERE title = ? LIMIT 1),
				(SELECT id FROM Ingredient WHERE name = ? LIMIT 1)
			);
		`;
    query = mysql.format(stmt, [row.title, ingredient.nameClean]);
    insertQuery(query);
  });

  // Insert dish type
  row.dishTypes.forEach((type) => {
    stmt = `
			INSERT IGNORE INTO FoodType (name) VALUES (?);
		`;
    query = mysql.format(stmt, [type]);
    insertQuery(query);
    stmt = `
			INSERT INTO FoodTypeRelationship (recipe, foodType) VALUES (
					(SELECT id FROM Recipe WHERE title = ? LIMIT 1),
					(SELECT DISTINCT id FROM FoodType WHERE name = ? LIMIT 1)
				);
		`;
    query = mysql.format(stmt, [row.title, type]);
    insertQuery(query);
  });
});

function insertQuery(query) {
  db.query(query, (err, res) => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log("Inserted.");
    }
  });
}
