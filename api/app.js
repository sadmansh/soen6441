require('dotenv/config')
const http = require('http')
const url = require('url')
const PORT = process.env.PORT || 5050
require('./db')
const Recipe = require('./controller')

const server = http.createServer(async (req, res) => {
	/* /api/recipes/all[?offset=[NUM]] */
	if (req.url.match(/^\/api\/recipes\/all.*$/) && req.method === 'GET') {
		const params = url.parse(req.url, true).query
		const offset = params.offset ? parseInt(params.offset) : null
		res.writeHead(200, { 'Content-Type': 'application/json' })
		const data = await new Recipe().getAll(offset)
		res.end(JSON.stringify(data))
	} else if (req.url.match(/^\/api\/recipes\/search\?term\=.*$/) && req.method === 'GET') {
		/* /api/recipes/search?term=[TERM] */
		const params = url.parse(req.url, true).query
		const term = params.term ?? null
		res.writeHead(200, { 'Content-Type': 'application/json' })
		const data = await new Recipe().findRecipes(term)
		res.end(JSON.stringify(data))
	} else if (req.url.match(/^\/api\/recipes\/([0-9]+)/) && req.method === 'GET') {
		/* /api/recipes/:id */
		const id = parseInt(req.url.split('/')[3])
		const recipe = await new Recipe().getById(id)
		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify(recipe))
	} else {
		res.writeHead(400, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify({ message: `The route ${req.url} does not exist.` }))
	}
})

server.listen(PORT, () => {
	console.log(`Server started on port ${PORT}.`)
})