const {Schema, model, default: mongoose} = require("mongoose")


const userSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    iconUrl:{
        type:String
    },
    ShoppingCart:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "ShoppingItem"
    }
})

const User = model("User", userSchema)


module.exports = User