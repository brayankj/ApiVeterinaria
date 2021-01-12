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
const { 
    getPets,
    getPet, 
    createPet, 
    updatePet, 
    deletePet, 
} = require('../controllers/pet');


// --------- create crud by pets ---------

router.get('/:id', validarJWTMiddelware ,getPet );

router.get('/mypets/:id', validarJWTMiddelware ,getPets );

router.post('/', [
    validarJWTMiddelware,
    check('name', 'El nombre de la mascota es obligatorio').not().isEmpty(),
    check('years', 'La edad de la mascota es obligatoria').not().isEmpty(),
    check('typePet', 'El tipo de mascota es obligatorio').not().isEmpty(),
    check('owner', 'El Dueño de la mascota debe ser valido').isMongoId(),
    validarCamposExpress,
] ,createPet );

router.put('/:id',[
    validarJWTMiddelware,
    check('name', 'El nombre de la mascota es obligatorio').not().isEmpty(),
    check('years', 'La edad de la mascota es obligatoria').not().isEmpty(),
    check('typePet', 'El tipo de mascota es obligatorio').not().isEmpty(),
    check('owner', 'El Dueño de la mascota debe ser valido').isMongoId(),
    validarCamposExpress,
],updatePet );

router.delete('/:id', validarJWTMiddelware ,deletePet );

module.exports = router;