const User = require('../models/user')



const getUser = async () => await User.find({})


module.exports = { getUser }