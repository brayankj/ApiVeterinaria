/*
    Create Crud /api/auth
    necessary imports
*/
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/googleVerify');

const login = async( req, res ) => {
    const { email, password } = req.body;
    try {
        
        const userBD = await User.findOne( { email } );
        if ( !userBD ) {
            return res.status(404).json({
                ok: false,
                msg: 'El email o la contraseña son incorrectos intente de nuevo',
            });
        }

        if ( userBD.active === false ) {
            return res.status(403).json({
                ok: false,
                msg: 'Usuario no encontrado',
            });
        }

        const validPass = bcryptjs.compareSync( password, userBD.password );
        if ( !validPass ) {
            return res.status( 404).json({
                ok: false,
                msg: 'El email o la contraseña son incorrectos intente de nuevo',
            });
        }

        const token = await generarJWT( userBD.id );
        res.status(200).json({
            ok: true,
            token,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor consulte al administrador Login*'
        });
    }
}

const loginGoogle = async( req, res ) => {
    const googleToken = req.body.token;
    try {

        const { name, email, picture } = await googleVerify( googleToken );

        const userBD = await User.findOne( { email } );
        let user;

        if( !userBD ){
            user = new User({
                names: name,
                lastnames: '***',
                years: 20,
                image: picture,
                email,
                password: '@@@',
                active: true,
                google: true
            });
        }else{
            user = userBD;
            user.google = true;
            user.password = '@@@'
        }

        if( user.active === false){
            return res.status(403).json({
                ok: false,
                msg: 'Acceso no permitido'
            });
        }
        await user.save();
        const token = await generarJWT( user.id );
        res.status(200).json({
            ok: true,
            token,
            id: user.id
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor consulte al administrador Login*'
        });
    }
}

const renewToken = async( req, res ) => {
    
    const idUserActive = req.id;
    const token = await generarJWT( idUserActive );
    const user = await User.findById( idUserActive );
    res.status(200).json({
        ok: true,
        token,
        user,
    });

}

module.exports = {
    login,
    loginGoogle,
    renewToken,
}