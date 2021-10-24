var express = require('express');
const router = express.Router();


const userController = require('../controllers/cUsuarios');

router.get('', userController.getUsuarios); /// definimos las rutas para usuarios en este caso
///router.post('')
router.post('', userController.addUsuarios);
router.delete('/:id', userController.deleteUsuario);
router.get('/:id', userController.getUsuariosId);
router.patch('/:id', userController.updateUsuarioById);


module.exports = router;