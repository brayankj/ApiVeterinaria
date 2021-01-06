/*
    --------- Create Crud /api/search routes ---------
*/

//--------- express require ---------
const { Router } = require('express');
const router = Router();

//--------- exports helpers and middlewares ---------
const { validarJWTMiddelware } = require('../middlewares/validarJWT');

//--------- exports controllers users ---------
const { searchAll, 
    search 
} = require('../controllers/search');


// --------- create routes by searchs ---------
router.get('/:keyword', validarJWTMiddelware, searchAll);

router.get('/:collection/:keyword', validarJWTMiddelware, search) ;

module.exports = router;