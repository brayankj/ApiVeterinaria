const jwt = require('jsonwebtoken');

const generarJWT = ( id ) => {

    return new Promise( ( resolve, reject ) =>{

        const payload = {
            id,
        };

        jwt.sign( payload, process.env.JWTSecret,{
            expiresIn: '12h'
        }, ( err, token ) => { 
            if ( err ) {
                reject('No se pudo generar el token');
            }else{
                resolve( token );
            }
        });
    });

} 

module.exports = {
    generarJWT,
}