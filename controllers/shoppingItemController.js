const ShoppingItem = require("../models/ShoppingItem")
const decodeToken = require("../lib/decodeToken")
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET // Click 'View API Keys' above to copy your API secret
});

var storage = multer.diskStorage({
    destination: "./public/images",
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage }).array('file');

async function createShoppingItem(req, res) {
    try {

        const newShoppingItem = await ShoppingItem.create({ ...req.body, owner: decodeToken(req).id})
        if (newShoppingItem) {
            res.status(200).json(newShoppingItem)
        } else {
            res.sendStatus(204)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }

}
async function indexShoppingItem(req, res) {
    try {
        const allShoppingItem = await ShoppingItem.find()
        if (allShoppingItem.length) {
            res.status(200).json(allShoppingItem)
        } else {
            res.sendStatus(204)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}

async function getShoppingItem(req, res) {
    try {
        const foundShoppingItem = await ShoppingItem.findById(req.params.ShoppingItemId).populate(["owner", "reviews"])
        if (foundShoppingItem) {
            res.status(200).json(foundShoppingItem)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }

}

async function updateShoppingItem(req, res) {
    try {
        const user = decodeToken(req)
        
        const shoppingItem = await ShoppingItem.findById(req.params.ShoppingItemId).populate("owner")
        if(!user){
            res.sendStatus(400)
            return
        }
        if(user.id != shoppingItem.owner){
            res.sendStatus(400)
            return
        }
        const updatedShoppingItem = await ShoppingItem.findByIdAndDelete(req.params.ShoppingItemId, req.body, { new: true })
        if (updatedShoppingItem) {
            res.status(200).json(updatedShoppingItem)
        } else {
            res.sendStatus(204)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }

}

async function deleteShoppingItem(req, res) {
    try {
         const user = decodeToken(req)
        
        const shoppingItem = await ShoppingItem.findById(req.params.ShoppingItemId).populate("owner")
        if(!user){
            res.sendStatus(400)
            return
        }
        if(user.id != shoppingItem.owner){
            res.sendStatus(400)
            return
        }
        const deletedShoppingItem = await ShoppingItem.findByIdAndDelete(req.params.ShoppingItemId)
        if (deletedShoppingItem) {
            res.status(200).json(deletedShoppingItem)
        } else {
            res.sendStatus(204)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }

}
// returns a string url
async function uploadImage(req, res) {
    const result = await upload(req, res,
        async (err) => {
            let uploadFiles = []

            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            // console.log(req.files)
            uploadFiles = req.files
            console.log(uploadFiles)


            let imageLinks = []
            console.log(uploadFiles.length)
            for (let i = 0; i < uploadFiles.length; i++) {

                const file = uploadFiles[i]

                const uploadResult = await cloudinary.uploader
                    .upload(
                        file.path,
                        {
                            resource_type: "image",
                            public_id: file.originalname
                        }
                    )
                    .catch((error) => {
                        console.log(error);
                    });
                imageLinks.push(uploadResult.secure_url)
                await fs.rmSync(file.destination + `/${file.filename}`, {
                    force: true,
                });


            }
            return res.status(200).send({
                imageLinks: imageLinks
            })
        })
    return res.status(500)



}

module.exports = {
    createShoppingItem,
    indexShoppingItem,
    getShoppingItem,
    updateShoppingItem,
    deleteShoppingItem,
    uploadImage
}