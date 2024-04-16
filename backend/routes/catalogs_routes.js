const express = require('express');
const router = express.Router();
const catalogsController = require('../controllers/catalogs_controller');

router.get('/catalogs', catalogsController.getCatalogs);
router.delete('/catalogs', catalogsController.deleteCatalog);
router.post('/catalogs', catalogsController.addCatalog);
router.put('/catalogs', catalogsController.editCatalog);

module.exports = router;

