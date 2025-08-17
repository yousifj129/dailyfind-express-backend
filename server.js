const express = require("express")
const mongoose = require ('mongoose')
const logger = require('morgan')
const cors = require ('cors')
const app = express()

app.get("/",(req,res)=>{
    
})

app.listen( 3000, ()=>{
    console.log('The website working ')
}

)