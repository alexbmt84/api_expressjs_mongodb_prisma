const express = require('express')
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/seed', productController.seed);
router.get('/', productController.index);
router.get('/:id', productController.read);
router.post('/', productController.store);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove);

module.exports = router;