const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const dotenv = require('dotenv').config()

const SECRET = process.env.SECRET
// POST /auth/register
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body

    // check if username taken
    const existing = await User.findOne({ username })
    if (existing) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 8)

    // create user
    const newUser = new User({ username, password: passwordHash })
    await newUser.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /auth/login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    const isValid = await user.validatePassword(password)

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    const payload = {
      id: user._id
      // Add anything else that you want to put into the JWT token here
    }
    const token = jwt.sign(payload, SECRET, { expiresIn: '365d' }) //Look at the docs for more 'expires in' options
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getUserInformation = async (req, res) => {
  try{
    const userFound = await User.findById(req.params.userId)
    userFound.password = undefined
    res.status(200).json(userFound)
  }
  catch (err){
    console.log(err)
    res.sendStatus(500)
  }
}

// negative values in req.body.money = subtracting money
exports.addMoneyToUser = async (req,res)=>{
  try{
    const userFound = await User.findById(req.params.userId)
    const amount = req.body.money
    userFound.balance = userFound.balance + amount

    await User.findByIdAndUpdate(req.params.userId, userFound)
    res.sendStatus(200)
  }
  catch(err){
    console.log(err)
    res.sendStatus(500)
  }
}