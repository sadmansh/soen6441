const getRecipesByType = async (type) => {
	const res = await fetch(`http://localhost:3000/api/recipes/byType/${type}`)
	return await res.json()
}

const getRecipesByIngredient = async (type) => {
	const res = await fetch(`http://localhost:3000/api/recipes/byIngredient/${type}`)
	return await res.json()
}

export {
	getRecipesByType,
	getRecipesByIngredient
}