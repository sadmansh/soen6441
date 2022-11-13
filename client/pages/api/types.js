const handler = async (req, res) => {
	const data = await fetch('http://localhost:5050/api/types')
	const types = await data.json()
	res.status(200).json(types)
}

export default handler