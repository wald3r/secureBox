const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 20, 
  message: 'Too many attempts to login from this IP, please try again in 15 minutes'
})

const accountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 15, 
  message: 'Too many accounts were created from this IP, please try again in 15 minutes'
})

module.exports = { loginLimiter, accountLimiter }