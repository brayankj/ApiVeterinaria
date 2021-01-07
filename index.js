const path = require('path');
const express = require('express');
require('dotenv').config();
const { bdConnection } = require('./database/bdconfig');

const cors = require('cors');

const app = express();
app.use( cors() );
app.use( express.json() );
bdConnection();

app.use( express.static('public') );

app.use( '/api/upload', require('./routes/uploads') );
app.use( '/api/search', require('./routes/search') );
app.use( '/api/users', require('./routes/user') );
app.use( '/api/pets', require('./routes/pet') );
app.use( '/api/consultations', require('./routes/appointment') );
app.use( '/api/auth', require('./routes/auth') );

app.get( '*', ( req, res ) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
});

app.listen( process.env.PORT , () => {
    console.log('Services run in port:' + process.env.PORT );
});