const handler = async (req, res) => {
	const data = await fetch('http://localhost:5050/api/ingredients')
	const ingredients = await data.json()
	console.log(ingredients)
	res.status(200).json(ingredients)
}

export default handler