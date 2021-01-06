const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCamposExpress } = require('../helpers/validar-campos-express');
const { validarJWTMiddelware } = require('../middlewares/validarJWT')

const { login, 
    loginGoogle, 
    renewToken 
} = require('../controllers/auth');

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCamposExpress
] ,login );

router.post('/google', [
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCamposExpress,
] ,loginGoogle );

router.get('/newToken', validarJWTMiddelware ,renewToken );

module.exports = router;