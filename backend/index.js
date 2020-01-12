const http = require('http')
//const https = require('https')
const config = require('./utils/config')
const app = require('./app')
require('dotenv').config()

/*const options = {
    key: fs.readFileSync(config.KEY),
    cert: fs.readFileSync(config.CERT),
    dhparam: fs.readFileSync(config.DHPARAM)
}
*/

const server = http.createServer(app)

server.listen(config.PORT || 3001, () => {
    console.log(`Server running on port ${config.PORT}`)
})