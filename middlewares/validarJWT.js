const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarJWTMiddelware = ( req, res, next ) =>{

    const token = req.header('token');
    if ( !token ) {
        return res.status(403).json({ 
            ok: false,
            msg: 'Acción no autorizada Token invalido o inexistente'
        });
    }

    try {
        const { id } = jwt.verify( token, process.env.JWTSecret );
        req.id = id;
        next();
    }catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido',
        });
    }

}

/*
    valid function by changues in update notes or user, admin or medic
*/
const validRoleAdmin = async( req, res, next ) => {

    const id = req.id;
    try {
        const user = await User.findById( id );
        if ( !user ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuarion no encontrado',
            });
        }
        
        if( user.role !== 'ADMIN_ROLE' ){
            console.log(user.role);
            return res.status(403).json({
                ok: false,
                msg: 'No cuentas con permisos para modificar los campos',
            });
        }
        next();
    } catch (error) {
        console.log( error );
        return res.status(500).json( { ok: false, msg: 'Error de Servidor comunicate con el administrador *ValidarUSERS' } );
    }

}

/*
    valid function by changues in update user, admin or user login
*/
const validAdmin_and_validUser = async( req, res, next ) => {

    const idToken = req.id;
    const idUser = req.params.id;
    try {
        const user = await User.findById( idToken );
        if ( !user ) {
           return res.status(404).json({ 
               ok: false, 
               msg: 'Usuario no encontrado',
            });
        }
        if ( user.role == 'ADMIN_ROLE' || idToken === idUser ) {
            next();
        }else{
            return res.status(403).json({ 
                ok: false, 
                msg: 'No Cuentas con la autorización para modificar campos',
             });
        }

    } catch (error) {
        return res.status(500).json( { ok: false, msg: 'Error de Servidor comunicate con el administrador *ValidarUSERS' } );
    }
}

module.exports = {
    validarJWTMiddelware,
    validRoleAdmin,
    validAdmin_and_validUser,
}