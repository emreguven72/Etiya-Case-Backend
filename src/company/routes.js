const { Router } = require("express");
const companyController = require("./controller");

const router = Router();

router.get('/getById/:id', companyController._getById);
router.get('/getByCompanyName/:companyName', companyController._getByCompanyName);
router.get('/getLatestCompanies', companyController._getLatestCompanies);
router.get('/getAll', companyController._getAll);
router.post('/create', companyController._createCompany);
router.patch('/update', companyController._updateCompany);
router.delete('/delete/:id', companyController._deleteCompany);

module.exports = router;