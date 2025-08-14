const {Schema, model, default: mongoose} = require("mongoose")

const reviewSchema = new Schema({
    reviewer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        default:1
    },
    message:{
        type:String,
        required:true
    }
})

const shoppingItemSchema = new Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    itemName:{
        type:String,
        required:true
    },
    itemDescription:{
        type:String
    },
    itemCategory:{
        type:String
    },
    quantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        default:1
    },
    itemSpecification:{
        type:String
    },
    reviews:{
        type:[reviewSchema]
    },
    images:{
        type:[String]
    },
    shippingType:{
        type:String
    }
})

const ShoppingItem = model("ShoppingItem", shoppingItemSchema)


module.exports = ShoppingItem