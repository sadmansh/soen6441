const handler = async (req, res) => {
    const { id } = req.query
	const data = await fetch(`http://localhost:5050/api/recipes/${id}`)
	const recipe = await data.json()
	res.status(200).json(recipe)
}

export default handler