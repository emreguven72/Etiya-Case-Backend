const { Router } = require("express");
const companyController = require("./controller");

const router = Router();

router.get('/getById/:id', companyController.getById);
router.get('/getByCompanyName/:companyName', companyController.getByCompanyName);
router.get('/getLatestCompanies', companyController.getLatestCompanies);
router.get('/getAll', companyController.getAll);
router.post('/create', companyController.createCompany);
router.patch('/update', companyController.updateCompany);
router.delete('/delete/:id', companyController.deleteCompany);

module.exports = router;