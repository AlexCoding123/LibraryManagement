const express = require('express');
const router = express.Router();
const catalogsController = require('../controllers/catalogs_controller');
const { auth } = require('../middleware/auth');

router.use(auth);

router.get('/catalogs', catalogsController.getCatalogs);
// Protect delete catalog endpoint to allow only owners
router.delete('/catalogs', (req, res, next) => {
    if (req.user.role !== 'owner') {
        return res.status(403).json({ error: 'Unauthorized access' });
    }
    next();
}, catalogsController.deleteCatalog);
router.post('/catalogs', catalogsController.addCatalog);
router.put('/catalogs', catalogsController.editCatalog);

module.exports = router;

