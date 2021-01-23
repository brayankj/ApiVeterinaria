/*
    --------- Create Crud /api/Comments routes ---------
*/

//--------- express require ---------
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

//--------- exports helpers and middlewares ---------
const { validarCamposExpress } = require('../helpers/validar-campos-express');
const { validarJWTMiddelware, validAdmin_and_validUser } = require('../middlewares/validarJWT');

//--------- exports controllers Comments ---------
const { 
    createComment,
    getComments,
    deleteComment, 
} = require('../controllers/comments');


// --------- create crud by Comments ---------

router.get('', validarJWTMiddelware ,getComments );

router.post('/', [
    check('email', 'El email es obligatorio y valido').isEmail(),
    check('comment', 'El comentario es obligatoria').not().isEmpty(),
    validarCamposExpress,
] ,createComment );

router.delete('/:id', [ validarJWTMiddelware, validAdmin_and_validUser ] ,deleteComment );

module.exports = router;