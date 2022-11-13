const getRecipesByType = async (type) => {
	const res = await fetch(`http://localhost:3000/api/recipes/byType/${type}`)
	return await res.json()
}

const getRecipesByIngredient = async (type) => {
	const res = await fetch(`http://localhost:3000/api/recipes/byIngredient/${type}`)
	return await res.json()
}

const searchRecipe = async (term) => {
	const res = await fetch(`http://localhost:3000/api/recipes/search/${term}`)
	return await res.json()
}

const getAllRecipes = async (offset) => {
	const res = await fetch(`http://localhost:3000/api/recipes/all?offset=${offset}`)
	return await res.json()
}

export {
	getRecipesByType,
	getRecipesByIngredient,
	searchRecipe,
	getAllRecipes
}