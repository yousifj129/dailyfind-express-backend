const router = require("express").Router()
const ShoppingItemController = require ("../controllers/shoppingItemController")
const secureRoute = require("../middleware/secureRoute")

router.post("/",secureRoute,ShoppingItemController.createShoppingItem)
router.get("/",ShoppingItemController.indexShoppingItem)
router.get("/:ShoppingItemId",ShoppingItemController.getShoppingItem)
router.put("/:ShoppingItemId",ShoppingItemController.updateShoppingItem)
router.delete("/:ShoppingItemId",ShoppingItemController.deleteShoppingItem)
router.post("/uploadImage", ShoppingItemController.uploadImage)
router.post("/addReview/:ShoppingItemId", ShoppingItemController.addReview)
module.exports=router