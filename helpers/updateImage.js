const fs = require('fs');
const User = require('../models/user');
const Pet = require('../models/pet');
const Appointment = require('../models/appointment');

const deleteImage = ( path ) => {
    if ( fs.existsSync( path ) ) {
        fs.unlinkSync( path );
    }
}

const enumCollection = {
    USERS: 'users',
    PETS: 'pets',
}

const updatesImage = async( collection, id, nameFile ) => {

    let pathOld;
    switch( collection ){
        case enumCollection.USERS: {
            const user = await User.findById( id );
            if ( !user ) return false; 

            pathOld = `./uploads/${enumCollection.USERS}/${user.image}`;
            deleteImage( pathOld );
            user.image = nameFile;
            await user.save();
            return true;
        }
        break;
        case enumCollection.PETS: {
            const pet = await Pet.findById( id );
            if ( !pet ) return false; 

            pathOld = `./uploads/${enumCollection.PETS}/${pet.image}`;
            deleteImage( pathOld );
            pet.image = nameFile;
            await pet.save();
            return true;
        }
        break;
    }

}

module.exports = {
    updatesImage,
}