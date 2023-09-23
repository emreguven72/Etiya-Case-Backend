const { Router } = require("express");
const productController = require("./controller");

const router = Router();
 
router.get('/getById/:id', productController.getById);
router.get('/getByProductName/:productName', productController.getByProductName);
router.get('/getByCompanyName/:companyName', productController.getByCompanyName);
router.get('/getByCategory/:category', productController.getByCategory);
router.post('/create', productController.createProduct);
router.patch('/update', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;