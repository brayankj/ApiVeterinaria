/*
    Create Crud /api/update 
    necessary imports
*/
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const { updatesImage } = require('../helpers/updateImage');

const uploadFile = async( req, res ) => {

    const validCollection = [ 'users', 'pets' ];
    const collection = req.params.collection;
    const id = req.params.id;
    try {
        
        if ( !validCollection.includes( collection ) ) {
            return res.status(400).json({
                ok: false,
                msg: 'Carga no permitida, no pertenece a las colecciones de datos definidos',
            });
        }
        if ( !req.files || Object.keys(req.files).length === 0 ) {
            return res.status(400).json({
                ok: false, 
                msg: 'Error no se seleccióno ningun archivo',
            });
        }

        const file = req.files.image;
        const nameShort = file.name.split('.');
        const extFileUpdates = nameShort[ nameShort.length - 1 ];

        const extValid = ['png', 'jpg', 'jpeg', 'gif', ];
        if ( !extValid.includes(extFileUpdates) ) {
            return res.status(400).json({
                ok: false,
                msg: 'Imagen con extensión no permitida, intenta de nuevo',
            });
        }

        const newNameFile = `${ uuid() }.${ extFileUpdates }`;
        const path = `./uploads/${ collection }/${ newNameFile }`;

        file.mv( path, (err) => {
            if( err ){
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al asignar imagen en la carpeta del servidor, consulte con el administrador *UPDATEIMAGE',
                });
            }

            updatesImage( collection, id, newNameFile );    
            res.status(200).json({
                ok: true,
                msg: 'Imagen Cargada!',
                name: newNameFile
            })        
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con el administrador *UPDATEIMAGE'
        });
    }
}

const viewFile = ( req, res ) => {

    const collection = req.params.collection;
    const image = req.params.image;
    const validCollection = [ 'users', 'pets' ];

    if ( !validCollection.includes( collection ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'Vista no permitida, no pertenece a la coleccion de datos definidos',
        });
    }

    let pathImg = path.join( __dirname, `../uploads/${ collection }/${ image }` );
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    }else{
        pathImg = path.join( __dirname, `../uploads/not-img.png` );
        res.sendFile( pathImg );
    }

}

module.exports = {
    uploadFile,
    viewFile,
}