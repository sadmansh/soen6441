const handler = async (req, res) => {
    const { offset } = req.query
	const data = await fetch(`http://localhost:5050/api/recipes/all?offset=${offset}`)
	const recipes = await data.json()
	res.status(200).json(recipes)
}

export default handler