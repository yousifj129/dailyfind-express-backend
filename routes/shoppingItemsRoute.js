const router = require("express").Router()
const ShoppingItemController = require ("../controllers/shoppingItemController")

router.post("/",ShoppingItemController.createShoppingItem)
router.get("/",ShoppingItemController.indexShoppingItem)
router.get("/:ShoppingItemId",ShoppingItemController.getShoppingItem)
router.put("/:ShoppingItemId",ShoppingItemController.updateShoppingItem)
router.delete("/:ShoppingItemId",ShoppingItemController.deleteShoppingItem)

module.exports=router