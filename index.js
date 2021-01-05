const path = require('path');
const express = require('express');
require('dotenv').config();
const { bdConnection } = require('./database/bdconfig');

const cors = require('cors');

const app = express();
app.use( cors() );
app.use( express.json() );
bdConnection();

app.use( '/api/users', require('./routes/user') );

app.listen( process.env.PORT , () => {
    console.log('Services run in port:' + process.env.PORT );
});