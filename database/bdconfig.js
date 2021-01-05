const mongoose = require('mongoose');


const bdConnection = async()  => {

    try {
        await mongoose.connect(process.env.BD_Connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error ('Error al conectar con DB');
    }

}

module.exports = {
    bdConnection
}