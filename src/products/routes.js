const { Router } = require("express");
const productController = require("./controller");

const router = Router();
 
router.get('/getById/:id', productController._getById);
router.get('/getAll', productController._getAll);
router.get('/getByProductName/:productName', productController._getByProductName);
router.get('/getByCompanyName/:companyName', productController._getByCompanyName);
router.get('/getByCategory/:category', productController._getByCategory);
router.post('/create', productController._createProduct);
router.patch('/update', productController._updateProduct);
router.delete('/delete/:id', productController._deleteProduct);

module.exports = router;