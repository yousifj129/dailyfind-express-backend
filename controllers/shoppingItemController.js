const ShoppingItem = require ("../models/ShoppingItem") 

async function createShoppingItem(req,res) {
    try{
        const newShoppingItem = await ShoppingItem.create(req.body)
        if(newShoppingItem){
            res.status(200).json(newShoppingItem)
        }else{
            res.sendStatus(204)
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            error:error.message
        })
    }
    
}
async function indexShoppingItem(req,res) {
    try{
        const allShoppingItem = await ShoppingItem.find()
        if(allShoppingItem.length){
            res.status(200).json(allShoppingItem)
        }else{
            res.sendStatus(204)
        } 
    } catch(error){
        console.log(error)
        res.status(500).json({
            error:error.message
        })
    }
}

async function getShoppingItem(req,res) {
    try{
        const foundShoppingItem = await ShoppingItem.findById(req.params.ShoppingItemId)
        if(foundShoppingItem){
            res.status(200)
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            error:error.message
        })
    }
    
}

async function updateShoppingItem(req,res) {
    try{
        const updatedShoppingItem = await ShoppingItem.findByIdAndDelete(req.params.ShoppingItemId,req.body,{new:true})
        if(updatedShoppingItem){
            res.status(200).json(updatedShoppingItem)
        }else{
            res.sendStatus(204)
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            error:error.message
        })
    }
    
}

async function deleteShoppingItem(req,res) {
    try{
        const deletedShoppingItem =  await ShoppingItem.findByIdAndDelete(req.params.ShoppingItemId)
        if(deletedShoppingItem){
            res.status(200).json(deletedShoppingItem)
        }else{
            res.sendStatus(204)
        }
    }catch (error){
        console.log(error)
        res.status(500).json({
            error:error.message
        })
    }
 
}

module.exports = {
    createShoppingItem,
    indexShoppingItem,
    getShoppingItem,
    updateShoppingItem,
    deleteShoppingItem
}