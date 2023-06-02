const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {updateUser, getUsers, getUserById} = require('../controllers/users');


const router = Router();

router.get('/', validarJWT, getUsers)

router.put('/:id', validarJWT, updateUser);

router.get('/:id', validarJWT, getUserById);

module.exports = router;