require('dotenv/config')
const http = require('http')
const PORT = process.env.PORT || 5050
const db = require('./db')
const Recipe = require('./controller')

const server = http.createServer(async (req, res) => {
	if (req.url === '/api/recipes/all' && req.method === 'GET') {
		res.writeHead(200, { 'Content-Type': 'application/json' })
		const data = await new Recipe().getAll()
		res.end(JSON.stringify(data))
	} else {
		res.writeHead(400, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify({ message: `The route ${req.url} does not exist.` }))
	}
})

server.listen(PORT, () => {
	console.log(`Server started on port ${PORT}.`)
})