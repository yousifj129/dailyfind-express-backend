const express = require("express")
const mongoose = require ('mongoose')
const logger = require('morgan')
const dotenv = require("dotenv").config()
const cors = require ('cors')
const app = express()
const ShoppingItemsRoute = require("./routes/shoppingItemsRoute")

app.get("/",(req,res)=>{
    
})

app.use("/shoppingItems",ShoppingItemsRoute)

app.listen( 3000, ()=>{
    console.log('The website working ')
}

)
mongoose.connect(process.env.DB_URI)
mongoose.connection.on('connected', ()=>{
    console.log('connected to MongoDB')
})