/*
    --------- Create Put And Get /api/upload routes ---------
*/

//--------- express require ---------
const { Router } = require('express');
const router = Router();
const expressfileUpload = require('express-fileupload');

//--------- exports helpers and middlewares ---------
const { validarJWTMiddelware } = require('../middlewares/validarJWT');

//--------- exports controllers upload ---------
const { uploadFile, viewFile } = require('../controllers/uploads');

router.use( expressfileUpload() );

// --------- Create Put And Get by upload ---------
router.put('/:collection/:id', validarJWTMiddelware, uploadFile );

router.get('/:collection/:image', viewFile )

module.exports = router;