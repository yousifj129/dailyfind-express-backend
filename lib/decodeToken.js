const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const SECRET = process.env.SECRET

module.exports = function decodeToken(req) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  return jwt.decode(token)
}