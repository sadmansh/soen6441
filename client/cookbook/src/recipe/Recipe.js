import React, { useEffect } from "react";
import parse from "html-react-parser";

const Recipe = () => {
  const data = {
    id: 1,
    title: "Chicken Stew For The Soul",
    summary:
      'Chicken Stew For The Soul might be just the main course you are searching for. Watching your figure? This gluten free, dairy free, and whole 30 recipe has <b>497 calories</b>, <b>34g of protein</b>, and <b>33g of fat</b> per serving. For <b>$1.81 per serving</b>, this recipe <b>covers 23%</b> of your daily requirements of vitamins and minerals. It will be a hit at your <b>Autumn</b> event. If you have cardamoms, salt, ground tumeric, and a few other ingredients on hand, you can make it. To use up the onion you could follow this main course with the <a href="https://spoonacular.com/recipes/candy-corn-cupcakes-63881">Candy Corn Cupcakes</a> as a dessert. Only a few people made this recipe, and 9 would say it hit the spot. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 57%</b>. This score is good. Try <a href="https://spoonacular.com/recipes/chicken-for-babies-soul-543682">Chicken For Babies Soul</a>, <a href="https://spoonacular.com/recipes/chicken-soup-for-the-soul-101305">Chicken Soup for the Soul</a>, and <a href="https://spoonacular.com/recipes/chicken-riggies-and-scarole-with-soul-334500">Chicken Riggies and \'Scarole with Soul</a> for similar recipes.',
    instructions:
      "<ol><li>Slice the onions, slit the chillies, cube the potatoes and keep aside.</li><li>Heat oil in a heavy bottomed pan or pressure cooker, splutter mustard seeds.</li><li>Add the whole spices and stir till you begin to get the aroma of the spices.</li><li>Add sliced onions,curry leaves and green chillies and saute.</li><li>Stir in the ground coriander and add the marinaded chicken. Stir so that the chicken is covered well in the sauteed mixture.</li><li>Cover and let it cook. When it is half done add the cubed potatoes.</li><li>When the chicken is almost done add the garam masala,salt and coconut milk and stir.</li><li>When done put off the heat and garnish with chopped fresh coriander.</li><li>Have I forgotten the most important ingredient? Stir it with lots of love for the family and friends who will partake of the meal.</li><li>Serve hot chicken stew with freshly made appams.</li></ol>",
    image: "https://spoonacular.com/recipeImages/638343-556x370.jpg",
    servings: 6,
    time: 45,
    ingredients:
      '{"onion": "1 large onion", "potato": "2 potatoes", "cilantro": "fresh coriander", "turmeric": "1 teaspoon ground tumeric", "table salt": "salt to taste", "lemon juice": "juice of 1 lemon", "coconut milk": "1 cup coconut milk", "curry leaves": "1 sprig curry leaves", "garam masala": "1/2 teaspoon garam masala", "whole chicken": "1 kg chicken", "cinnamon stick": "1 cinnamon stick broken", "black cardamoms": "5 cardamoms", "ground coriander": "1 teaspoon ground coriander", "green chili pepper": "2 green chillies", "ginger garlic paste": "3 teaspoons ginger garlic paste", "ground chipotle chile pepper": "1 teaspoon ground red chilli"}',
    types:
      '["lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "main course", "main course", "main course", "main course", "main course", "main course", "main course", "main course", "main course", "main course", "main course", "main course", "main course", "main course", "main course", "main course", "main course", "main dish", "main dish", "main dish", "main dish", "main dish", "main dish", "main dish", "main dish", "main dish", "main dish", "main dish", "main dish", "main dish", "main dish", "main dish", "main dish", "main dish", "dinner", "dinner", "dinner", "dinner", "dinner", "dinner", "dinner", "dinner", "dinner", "dinner", "dinner", "dinner", "dinner", "dinner", "dinner", "dinner", "dinner"]',
  };

  const jIngredients = JSON.parse(data["ingredients"]);
  console.log(jIngredients);

  var ingredients = [];
  Object.keys(jIngredients).forEach((key) =>
    ingredients.push(jIngredients[key])
  );
  console.log(ingredients);

  return (
    <React.Fragment>
      {/* The whole page */}
      <div className="flex h-screen">
        {/* <button className="">Test</button> */}
        <button class="fixed z-90 bottom-10 right-8 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">
          Go Back
        </button>
        {/* Col1 */}
        <div className="flex-col h-screen" style={{ width: "60%" }}>
          <div
            className="bg-cover bg-center flex-row relative"
            style={{
              height: "70%",
              backgroundImage:
                "url(https://spoonacular.com/recipeImages/157259-556x370.jpg)",
            }}
          >
            <div className="flex bg-white h-12 items-center">
              <div className="flex-1 pl-4 text-lg font-bold text-green-400">
                Cookbook
              </div>
              <div className="flex-1 items-end">
                {/* <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Search
                </label> */}
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                />
              </div>
            </div>
            <div className="flex absolute bottom-12 left-0 ml-0 p-2 backdrop-blur-sm bg-white/60 rounded-r-3xl flex-end text-2xl font-extrabold text-center items-bottom text-slate-800 uppercase float-left clear-left">
              <div>Cocoa Protein Pancakes</div>
            </div>
          </div>
          <div
            className="flex-col bg-cover bg-bottom items-center text-slate-800"
            style={{
              height: "30%",
              backgroundImage:
                "url(https://spoonacular.com/recipeImages/157259-556x370.jpg)",
            }}
          >
            <div className="backdrop-blur-2xl bg-white/30 p-6 h-full">
              <div className="font-black text-2xl pb-2">Overview</div>
              <div className="font-semibold">{parse(data["summary"])}</div>
            </div>
          </div>
        </div>

        {/* Col2 */}
        <div className="flex-col" style={{ width: "40%" }}>
          <div
            className="bg-cover"
            style={{
              height: "100%",
              backgroundImage:
                "url(https://www.photos-public-domain.com/wp-content/uploads/2011/02/white-parchment-paper-texture.jpg)",
            }}
          >
            {/* Ingredients
            {ingredients?.map((i) => i)} */}
            <div className="p-6 h-full">
              <div className="font-black text-2xl pb-2">Ingredients</div>
              <div className="font-semibold">
                {ingredients?.map((i) => (
                  <React.Fragment key={i}>
                    <span>{i}, </span>
                  </React.Fragment>
                ))}
              </div>

              <div className="pt-6 font-black text-2xl pb-2">Instructions</div>
              <div className="font-semibold">{parse(data["instructions"])}</div>
              {/* <ul className="font-semibold inline-block">
                {ingredients?.map((i) => (
                  <React.Fragment key={i}>
                    <li>{i}</li>
                  </React.Fragment>
                ))}
              </ul> */}
            </div>
          </div>
          {/* s */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Recipe;
