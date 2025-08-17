const {Schema, model, default: mongoose} = require("mongoose")
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique:true
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
// helper method to compare passwords
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password)
}


const User = model("User", userSchema)


module.exports = User