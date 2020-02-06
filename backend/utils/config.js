require('dotenv').config()

let PORT = undefined 
let DB_URI = process.env.DEV_MONGODB_URI


if(process.env.NODE_ENV === 'test'){
    DB_URI = process.env.TEST_MONGODB_URI
    PORT = process.env.PORT 

}else if (process.env.NODE_ENV === 'pro'){
    DB_URI = process.env.PRO_MONGODB_URI
}else{
    PORT = process.env.PORT 
}


module.exports = {PORT, DB_URI}