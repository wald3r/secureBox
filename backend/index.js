const http = require('http')
//const https = require('https')
const config = require('./utils/config')
const app = require('./app')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})