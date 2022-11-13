const handler = async (req, res) => {
    const { type } = req.query
	const data = await fetch(`http://localhost:5050/api/recipes?type=${type}`)
	const recipes = await data.json()
	res.status(200).json(recipes)
}

export default handler