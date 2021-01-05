/*
    Create Crud /api/pets 
    necessary imports
*/
const Pet = require('../models/pet');
const User = require('../models/user');

const getPet = async( req, res ) => {
    const idPet = req.params.id;
    try {
        const pets = await Pet.findById( idPet ).populate('owner', 'names lastnames image email');
        if ( !pets ) {
            return res.status(400).json({
                ok: false,
                msg: 'La mascota que intentas buscar no existe, intenta de nuevo',
            });
        }
        res.status(200).json( { ok: true, pets } );
    } catch (error) {
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Pets' 
        });
    }
}

const createPet = async( req, res ) => {
    try {
        const pet = new Pet( req.body );
        await pet.save();
        res.status(200).json( { ok: true, pets: pet } );
    } catch (error) {
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Pets' 
        });
    }
}

const updatePet = async( req, res ) => {
    const idPet = req.params.id;
    try {
        
        const petBD = await Pet.findById( idPet );
        if ( !petBD ) {
            return res.status(404).json({
                ok: false,
                msg: 'La mascota que intentas actualizar no existe, intenta de nuevo',
            });
        }
        const { owner, ...updates } = req.body;
        const existOwner = await User.findById( owner );
        if ( !existOwner || existOwner.active === false ) {
            return res.status(404).json({
                ok: false,
                msg: 'El dueño que intentas asignar a la mascota no esta disponible',
            });
        }
        updates.owner = owner;
        const petUpdate = await Pet.findByIdAndUpdate( idPet, updates, { new: true } );
        res.status(200).json({
            ok: true,
            pets: petUpdate,
        });

    } catch (error) {
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Pets' 
        });
    }
}

const deletePet = async( req, res ) => {
    const idPet = req.params.id;
    try {
        const petBD = await Pet.findById( idPet );
        if ( !petBD ) {
            return res.status(404).json({
                ok: false,
                msg: 'La mascota que intentas eliminar no existe, intenta de nuevo',
            });
        }
        await Pet.findByIdAndDelete( idPet );
        res.status(200).json({
            ok: true,
            msg: 'Mascota Eliminada!',
        });
    } catch (error) {
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Pets' 
        });
    }
}

module.exports = { 
    getPet, 
    createPet, 
    updatePet, 
    deletePet, 
}