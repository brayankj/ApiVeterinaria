const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCamposExpress } = require('../helpers/validar-campos-express');

const { getUsers, 
        getUser, 
        createUser, 
        updateUser, 
        deleteUser,
} = require('../controllers/user');

router.get('/', getUsers );

router.get('/:id', getUser );

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
        check('names', 'El nombre es obligatorio').not().isEmpty(),
        check('lastnames', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCamposExpress
] ,updateUser );

router.delete('/:id', deleteUser );

module.exports = router;