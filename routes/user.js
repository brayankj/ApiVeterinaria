/*
    --------- Create Crud /api/users routes ---------
*/

//--------- express require ---------
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');


//--------- exports helpers and middlewares ---------
const { validarCamposExpress } = require('../helpers/validar-campos-express');

const { validarJWTMiddelware, 
        validRoleAdmin,
        validAdmin_and_validUser,
} = require('../middlewares/validarJWT');

//--------- exports controllers users ---------
const { getUsers, 
        getUser, 
        createUser, 
        updateUser, 
        deleteUser,
} = require('../controllers/user');


// --------- create crud by users ---------
router.get('/', validarJWTMiddelware ,getUsers );

router.get('/:id', validarJWTMiddelware ,getUser );

router.post('/', [
        check('names', 'El nombre es obligatorio').not().isEmpty(),
        check('lastnames', 'El apellido es obligatorio').not().isEmpty(),
        check('years', 'La edad es obligatoria').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser minimo de 8 caracteres').isLength({ min: 8 }),
        check('email', 'El email es obligatorio').isEmail(),
        validarCamposExpress
] ,createUser );

router.put('/:id', [
        validarJWTMiddelware,
        validAdmin_and_validUser,
        check('names', 'El nombre es obligatorio').not().isEmpty(),
        check('lastnames', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCamposExpress
] ,updateUser );

router.delete('/:id', [
        validarJWTMiddelware,
        validAdmin_and_validUser,
] ,deleteUser );

module.exports = router;