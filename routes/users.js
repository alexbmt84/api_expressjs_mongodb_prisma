const express = require('express')
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/seed', userController.seeder);
router.get('/', userController.index);
router.get('/:id', userController.read);
router.post('/', userController.store);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;