const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
const upload = require('./middlewares/multerconfig');


//Crear el servidor de express
const app = express();


//base de datos
dbConnection();

// CORS
app.use(cors());

//Directorio Público
app.use( express.static('public') );



//Lectura y parseo del body
app.use( express.json() );



//Rutas
app.use('/api/auth', require('./routes/auth'));

// Ruta de actualización de usuario con el middleware de carga de archivos
app.use('/api/users',  upload.single('archivo'), require('./routes/users'));


app.get('*', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
})


//Escuchar peticiones
app.listen( process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
} )