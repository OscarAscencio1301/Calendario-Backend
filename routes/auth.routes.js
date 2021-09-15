const {Router} = require('express');
const { check } = require('express-validator');
const { auth, crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controllers');
const { validarEmail } = require('../helpers/validarDB');
const { validarCampos } = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarJWT');
const router = Router();


module.exports = router;

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo').custom(validarEmail).isEmail(),
    check('password', 'La contraseña debe ser de 6 caracteres alfanumericos').isLength({min: 6}),
    validarCampos
], crearUsuario)


router.post('/', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña debe ser de 6 caracteres alfanumericos').isLength({min: 6}),
    validarCampos
],loginUsuario)


router.get('/renew', [
    validarJWT
],revalidarToken)