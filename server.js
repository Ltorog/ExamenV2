const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || '6000'; // Variable de entorno o puerto 3000

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Rutas
require('./api/routes/index.js')(app);


// Cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Methos');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Conexion
app.get('/', (req, res) => {
    res.status(200).send({ message: "Bienvenido" });
})

const server = http.createServer(app);

server.listen(PORT, function() {
  console.log('Servidor disponible en el puerto: ' + PORT);
});

