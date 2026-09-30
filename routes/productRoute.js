const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/',  productController.getAllProducts);
router.post('/', auth ,  productController.CreateProduct);
router.put('/:id',auth,  productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;