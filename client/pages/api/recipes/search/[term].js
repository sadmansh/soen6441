const handler = async (req, res) => {
    const { term } = req.query
	const data = await fetch(`http://localhost:5050/api/recipes/search?term=${term}`)
	const recipes = await data.json()
	res.status(200).json(recipes)
}

export default handler