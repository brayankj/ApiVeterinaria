/*
    Create GETS /api/search 
    necessary imports
*/
const User = require('../models/user');
const Pet = require('../models/pet');
const Appointment = require('../models/appointment');

const searchAll = async( req, res ) => {
    const key = req.params.keyword;
    const regex = new RegExp( key, 'i');
    try {
        const [ users, pets, notes ] = await Promise.all([
            User.find({
                $or: [
                    { names: regex },
                    { lastnames: regex },
                    { email: regex },
                ]
            }),
            Pet.find({
                $or: [
                    { name: regex },
                    { typePet: regex },
                ]
            }),
            Appointment.find({ 
                $or: [
                    { day: regex }, 
                    { nextappointment: regex },
                ]
            }),
        ]);
        res.status(200).json({ 
            ok: true,
            users,
            pets,
            notes,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor consulte con el administrador *SEARCH'
        });
    }
}

const search = async( req, res ) => {
    const collection = req.params.collection;
    const key = req.params.keyword;
    const regex = new RegExp( key, 'i' );
    try {

        let data = [];
        switch( collection ){
            case 'users': 
                data = await User.find({
                    $or: [
                        { names: regex },
                        { lastnames: regex },
                        { email: regex },
                    ]
                });
            break;
            case 'pets':
                data = await Pet.find({
                    $or: [
                        { name: regex },
                        { typePet: regex },
                    ]
                });
            break;
            case 'consultations':
                data = await Appointment.find({ 
                    $or: [
                        { day: regex }, 
                        { nextappointment: regex },
                    ]
                });
            break;
            default: 
                return res.status(404).json({
                    ok: false,
                    msg: 'Error busqueda fuera de contexto no pertenece a ninguna colección',
                });
        }
        res.status(200).json( { ok: true, resultado: data } );

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor consulte con el administrador *SEARCH'
        });
    }
}

module.exports = { 
    searchAll, 
    search,
}