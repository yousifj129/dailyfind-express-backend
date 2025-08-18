const express = require("express")
const mongoose = require ('mongoose')
const logger = require('morgan')
const dotenv = require("dotenv").config()
const cors = require ('cors')
const ShoppingItemsRoute = require("./routes/shoppingItemsRoute")
const authRoutes = require("./routes/authRoutes")

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))  
app.use(express.static("./public"));

app.use("/shoppingItems",ShoppingItemsRoute)
app.use("/auth", authRoutes )
app.listen( 3000, ()=>{
    console.log('The website working ')
}

)
mongoose.connect(process.env.DB_URI)
mongoose.connection.on('connected', ()=>{
    console.log('connected to MongoDB')
})