/*
    Create Crud /api/users 
    necessary imports
*/
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const User = require('../models/user');

const getUsers = async( req, res ) => {
    try {
        const [ users, counts ] = await Promise.all([
            User.find( { 'active' : true } ),
            User.countDocuments(),
        ]);
        res.status(200).json({ 
            ok: true,
            counts, 
            users,
        });
    } catch (error) {
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Users' 
        });
    }
}

const getUser = async( req, res ) => {
    const id = req.params.id;
    try {
        const userBD = await User.findById( id );
        if ( !userBD ) {
            return res.status(404).json( { ok: false, msg: 'El usuario que deseas consultar no existe' } );
        }
        if( userBD.active === false ) {
            return res.status(403).json( { ok: false, msg: 'Acceso no permitido', } );
        }
        res.status(200).json({ 
            ok: true,
            users : userBD,
        });
    } catch (error) {
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Users' 
        });
    }
}

const createUser = async( req, res ) => {
    const { email, password, years } = req.body;
    try {
        const userExist = await User.findOne( { email } );
        if ( userExist ) {
            return res.status(400).json({ 
                ok: false, 
                msg: 'El correo ingresado ya está registrado, si este es tu correo inicia sesión, de lo contrario registra un correo diferente',
            });
        }
        if( years < 18 ){
            return res.status(400).json({ 
                ok: false, 
                msg: 'Debes ser mayor de edad para crear una cuenta',
            });
        }
        const user = new User( req.body );
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );
        user.active = true;
        await user.save();
        const token = await generarJWT( user.id );
        res.status(200).json({ 
            ok: true, 
            users: user,
            token,
        });

    } catch (error) {
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Users'
        });
    }
}

const updateUser = async( req, res ) => {
    const id = req.params.id;
    try {
        const userBD = await User.findById( id );
        if( !userBD ){
            return res.status(404).json({ 
                ok: false, 
                msg: 'El usuario que desea modificar no existe',
            });
        }

        const { password, email, years, google, active, ...updates } = req.body;  
        if( userBD.email !== email ) {
            const existEmail = await User.findOne( { email } );
            if ( existEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo que intentas usar ya está registrado, intenta con otro correo de nuevo',
                });
            }
        }

        const typeUser = ['USER_ROLE','MEDIC_ROLE','ADMIN_ROLE'];
        if ( !typeUser.includes( updates.role ) ) {
            return res.status(403).json({ 
                ok: false, 
                msg: 'Rol no permitido',
            });
        }

        updates.email = email;
        const userUpdate = await User.findByIdAndUpdate( id, updates, { new: true });
        res.status(200).json( { ok: true, users: userUpdate} );
    } catch (error) {
        console.log(  error );
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Users' 
        });
    }
}

const deleteUser = async( req, res ) => {
    const id = req.params.id;
    try {
        const userBD = await User.findById( id );
        if( !userBD || userBD.active === false ) {
            return res.status(404).json( { ok: false, msg: 'El usuario que deseas eliminar no existe' } );
        }
        const user = userBD;
        user.active = false;
        await User.findByIdAndUpdate( id, user );
        res.status(200).json( { ok: true, msg: 'Usuario Eliminado', } );
    } catch (error) {
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Users' 
        });
    }
}


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}