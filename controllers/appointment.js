/*
    Create Crud /api/consultations
    necessary imports
*/
const Appointment = require('../models/appointment');
const User = require('../models/user');
const Pet = require('../models/pet');
const moment = require('moment');

const getNote = async( req, res ) => {
    const idNote = req.params.id;
    try {
        const notes = await Appointment.findById( idNote )
            .populate('veterinary', 'names lastnames image email')
            .populate('pet');

        if ( !notes ) {
            return res.status(404).json({
                ok: false,
                msg: 'La Nota que intentas consultar no existe, intenta de nuevo',
            });
        }
        res.status(200).json( { ok: true, notes } );

    } catch (error) {
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Notes' 
        });
    }
}

const getNotesUser = async(req, res ) => {
    const idUser = req.params.id;
    try {
        const user = await User.findById( idUser );
        if ( !user ) {
            return res.status(404).json({
                ok: false,
                msg: 'Cuenta no encontrada, intenta de nuevo!',
            });
        }
        const notes = await Appointment.find( { $or: [ {'owner': idUser}, {'veterinary': idUser } ] } )
            .populate('veterinary', 'names lastnames email')
            .populate('pet', 'name years, typePet description image')
            .populate('owner', 'names lastnames email');
        res.status(200).json( { ok: true, notes } );
    } catch (error) {
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Notes' 
        });
    }
}

const createNote = async( req, res ) => {
    
    try {
        
        const { veterinary, pet, ...data } = req.body;
        const medic = await User.findById( veterinary );
         
        if ( !medic || medic.role !== 'MEDIC_ROLE' ) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario que intentas asignar no existe ó no es permitido para este campo',
            });
        }
        const petBD = await Pet.findById( pet );
        if ( !petBD ) {
            return res.status(404).json({
                ok: false,
                msg: 'la mascota que intentas asignar no existe',
            });
        }

        data.veterinary = veterinary;
        data.pet = pet;
        data.day = moment().format('DD-MM-YYYY');
        const note = new Appointment( data );
        await note.save();
        res.status(200).json({
            ok: true,
            notes: note,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Notes' 
        });
    }
}

const updateNote = async( req, res ) => {
    const idNote = req.params.id;
    try {

        const note = await Appointment.findById( idNote );
        if ( !note ) {
            return res.status(404).json({
                ok: false,
                msg: 'La Nota que intentas modificar no existe, intenta de nuevo',
            });
        }

        const { veterinary, pet, ...data } = req.body;
        const medic = await User.findById( veterinary );
         
        if ( !medic || medic.role !== 'MEDIC_ROLE' ) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario que intentas asignar no existe ó no es permitido para este campo',
            });
        }
        const petBD = await Pet.findById( pet );
        if ( !petBD ) {
            return res.status(404).json({
                ok: false,
                msg: 'la mascota que intentas asignar no existe',
            });
        }

        data.veterinary = veterinary;
        data.pet = pet;
        const noteUpdate = await Appointment.findByIdAndUpdate( idNote, data, { new: true } );
        res.status(200).json({ 
            ok: true,
            notes: noteUpdate,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Notes' 
        });
    }
}

const deleteNote = async( req, res ) => {
    const idNote = req.params.id;
    try {
        const noteExist = await Appointment.findById( idNote );
        if ( !noteExist ) {
            return res.status(404).json({
                ok: false,
                msg: 'La nota que intentas eliminar no existe, intenta de nuevo',
            });
        }
        await Appointment.findByIdAndDelete( idNote );
        res.status(200).json( { ok: true, msg: 'Nota eliminada!', } );

    } catch (error) {
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Notes' 
        });
    }
}


module.exports = { 
    getNote,
    getNotesUser,
    createNote, 
    updateNote, 
    deleteNote, 
}