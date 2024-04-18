const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers_controller');
//const { auth } = require('../middleware/auth');

//router.use(auth);

router.get('/customers', customersController.getCustomers);
router.get('/customers/:id', customersController.getCustomerById);
router.put('/rent-catalog/:id/:catalogId', customersController.rentCatalog);
router.put('/return-catalog/:id/:catalogId', customersController.returnCatalog);
router.post('/customers', customersController.createCustomer);
router.post('/sync-customers', customersController.syncCustomers);
module.exports = router;
