const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');

const sotrage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer( { storage: sotrage, limits: {
    fileSize: 1024 * 1024 * 5
},
    fileFilter: fileFilter
 } );
 

router.get('/', ProductsController.get_products);

router.post('/',checkAuth,upload.single('productImage'),ProductsController.save_product);

router.get('/:productId', ProductsController.get_product);

router.patch('/:productId', ProductsController.update_product);

router.delete('/:productId', ProductsController.delete_product);

module.exports = router;