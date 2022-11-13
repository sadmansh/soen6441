const handler = async (req, res) => {
    const { ingredient } = req.query
	const data = await fetch(`http://localhost:5050/api/recipes?ingredient=${ingredient}`)
	const recipes = await data.json()
	res.status(200).json(recipes)
}

export default handler