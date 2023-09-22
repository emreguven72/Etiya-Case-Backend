const { Router } = require("express");
const productController = require("./controller");

const router = Router();

router.get('/:id', productController.getById);
router.get('/getByProductName/:productName', productController.getByProductName);
router.get('/getByCompanyName/:companyName', productController.getByCompanyName);

module.exports = router;