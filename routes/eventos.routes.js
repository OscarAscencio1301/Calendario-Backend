const {Router} = require('express');
const { check } = require('express-validator');
const { mostrarEvento, borrarEvento, editarEvento, crearEvento } = require('../controllers/eventos.controllers');
const { validarId, esFecha } = require('../helpers/validarDB');
const { validarCampos } = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarJWT');

const router = Router();

router.get('/', [
    validarJWT
],mostrarEvento);


router.post('/', [
    validarJWT,
    check("start").custom(esFecha),
    check("end").custom(esFecha),
    check("title", "El titulo es Obligatorio").not().isEmpty(),
    check("nota", "El texto es Obligatorio").not().isEmpty(),
    validarCampos
],crearEvento);


router.put('/:id', [
    validarJWT,
    check('id').custom(validarId).isMongoId(),
    check("start").custom(esFecha),
    check("end").custom(esFecha),
    check("title", "El titulo es Obligatorio").not().isEmpty(),
    check("nota", "El texto es Obligatorio").not().isEmpty(),
    validarCampos
],editarEvento);


router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').exists({checkNull: true}).isMongoId().bail().custom(validarId),
    validarCampos
], borrarEvento);

module.exports = router;