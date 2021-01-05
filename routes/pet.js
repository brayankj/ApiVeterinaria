const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCamposExpress } = require('../helpers/validar-campos-express');

const { getPet, 
    createPet, 
    updatePet, 
    deletePet, 
} = require('../controllers/pet');

router.get('/:id', getPet );

router.post('/', [
    check('name', 'El nombre de la mascota es obligatorio').not().isEmpty(),
    check('years', 'La edad de la mascota es obligatoria').not().isEmpty(),
    check('typePet', 'El tipo de mascota es obligatorio').not().isEmpty(),
    check('owner', 'El Dueño de la mascota debe ser valido').isMongoId(),
    validarCamposExpress,
] ,createPet );

router.put('/:id',[
    check('name', 'El nombre de la mascota es obligatorio').not().isEmpty(),
    check('years', 'La edad de la mascota es obligatoria').not().isEmpty(),
    check('typePet', 'El tipo de mascota es obligatorio').not().isEmpty(),
    check('owner', 'El Dueño de la mascota debe ser valido').isMongoId(),
    validarCamposExpress,
],updatePet );

router.delete('/:id', deletePet );

module.exports = router;