/* eslint-disable no-undef */
require('dotenv').config()

let PORT = process.env.PORT 
let DB_URI = process.env.DEV_MONGODB_URI


if(process.env.NODE_ENV === 'test'){
  DB_URI = process.env.TEST_MONGODB_URI
}else if (process.env.NODE_ENV === 'pro'){
  DB_URI = process.env.PRO_MONGODB_URI
}


module.exports = {PORT, DB_URI}