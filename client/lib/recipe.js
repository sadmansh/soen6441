const getRecipesByType = async (type) => {
    const res = await fetch(`http://localhost:3000/api/recipes/byType/${type}`)
	return await res.json()
}

export {
    getRecipesByType
}