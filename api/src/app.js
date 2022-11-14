require("dotenv/config");
const http = require("http");
const url = require("url");
const IngredientController = require("./IngredientController");
const PORT = process.env.PORT || 5000;

const Recipe = require("./RecipeController");
const Type = require("./TypeController");
const Ingredient = require("./IngredientController");

const server = http.createServer(async (req, res) => {
  /* /api/recipes/all[?offset=[NUM]] */
  if (req.url.match(/^\/api\/recipes\/all.*$/) && req.method === "GET") {
    const params = url.parse(req.url, true).query;
    const offset = params.offset ? parseInt(params.offset) : null;
    res.writeHead(200, { "Content-Type": "application/json" });
    const recipes = await new Recipe().getAll(offset);
    const count = Object.values(
      JSON.parse(JSON.stringify(await new Recipe().getRecipeCount()))[0]
    )[0];
    res.end(JSON.stringify({ recipes, count }));
  } else if (
    req.url.match(/^\/api\/recipes\/search\?term\=.*$/) &&
    req.method === "GET"
  ) {
    /* /api/recipes/search?term=[TERM] */
    const params = url.parse(req.url, true).query;
    const term = params.term ?? null;
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = await new Recipe().findRecipes(term);
    res.end(JSON.stringify(data));
  } else if (
    req.url.match(/^\/api\/recipes\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    /* /api/recipes/:id */
    const id = parseInt(req.url.split("/")[3]);
    const recipe = await new Recipe().getById(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(recipe));
  } else if (
    req.url.match(/^\/api\/recipes\?type\=.*$/) &&
    req.method === "GET"
  ) {
    /* /api/recipes?type=[TYPE] */
    const params = url.parse(req.url, true).query;
    const type = params.type ?? null;
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = await new Recipe().getByType(type);
    res.end(JSON.stringify(data));
  } else if (
    req.url.match(/^\/api\/recipes\?ingredient\=.*$/) &&
    req.method === "GET"
  ) {
    /* /api/recipes?type=[TYPE] */
    const params = url.parse(req.url, true).query;
    const ingredient = params.ingredient ?? null;
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = await new Recipe().getByIngredient(ingredient);
    res.end(JSON.stringify(data));
  } else if (req.url === "/api/types" && req.method === "GET") {
    /* Get food types: /api/types */
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = await new Type().getAll();
    res.end(JSON.stringify(data));
  } else if (req.url === "/api/ingredients" && req.method === "GET") {
    /* Get food ingredients: /api/ingredients */
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = await new Ingredient().getAll();
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: `The route ${req.url} does not exist.` })
    );
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
