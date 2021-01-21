/*
    --------- Create Crud /api/pets routes ---------
*/

//--------- express require ---------
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

//--------- exports helpers and middlewares ---------
const { validarCamposExpress } = require('../helpers/validar-campos-express');
const { validarJWTMiddelware } = require('../middlewares/validarJWT');

//--------- exports controllers pet ---------
const { getNote,
    getNotesUser,
    createNote, 
    updateNote, 
    deleteNote, 
} = require('../controllers/appointment');


// --------- create crud by pets ---------

router.get('/:id', validarJWTMiddelware, getNote );

router.get('/myNotes/:id', validarJWTMiddelware, getNotesUser );

router.post('/', [
    validarJWTMiddelware,
    check('veterinary', 'El id del medico debe ser valido').isMongoId(),
    check('pet', 'El id de la mascota debe ser valido').isMongoId(),
    check('owner', 'El id del dueño debe ser valido').isMongoId(),
    check('price', 'El precio de la consulta es obligatoria').not().isEmpty(),
    validarCamposExpress,
] ,createNote );

router.put('/:id', [
    validarJWTMiddelware,
    check('veterinary', 'El id del medico debe ser valido').isMongoId(),
    check('pet', 'El id de la mascota debe ser valido').isMongoId(),
    check('owner', 'El id del dueño debe ser valido').isMongoId(),
    check('price', 'El precio de la consulta es obligatoria').not().isEmpty(),
    validarCamposExpress,
] ,updateNote );

router.delete('/:id', validarJWTMiddelware ,deleteNote );

module.exports = router;