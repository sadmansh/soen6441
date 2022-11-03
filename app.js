const http = require('http')
const PORT = process.env.PORT || 5050

const server = http.createServer(async (req, res) => {
    if (req.url === '/api' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write('Hello, SOEN 6441')
        res.end()
    } else {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: `The route ${req.url} does not exist.` }))
    }
})

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`)
})