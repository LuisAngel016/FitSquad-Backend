/*Rutas de asesorados / Auth
    host + /api/auth*/

const {Router} = require('express');
const {check}= require('express-validator');
const { validarCampos } = require('../middlewares/validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

const { crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth')





router.post('/new',[
    //Middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({min:6}),
    validarCampos
], crearUsuario);


router.post('/',[
    //Middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({min:6}),
    validarCampos
], loginUsuario);




router.get('/renew',validarJWT, revalidarToken);

module.exports = router;