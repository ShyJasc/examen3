const { json, response } = require('express');
var express = require('express');
var app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/html'));

/*ARRAY PARA ALMACENAR LOS REGISTROS*/
var usuario = [];

/*Manda a llamar a el archivo index.html*/
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

/*METODO PARA REALIZAR EL REGISTRO DE UN USUARIO*/
app.get('/crearEntrada', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/crearEntrada.html'));
});
app.post('/envioDeDatos', function(req, res) {
    usuario.push({
        id: req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido

    });
    console.log(usuario);
    res.sendFile(path.join(__dirname + '/html/index.html'));
});
app.get('/crearEntrada', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/crearEntrada.html'));
});


/*METODO PARA TODOS LOS REGISTROS*/
app.get('/consultarDatos', function(req, res) {
    if (usuario.id !== '' && usuario.nombre !== '' && usuario.apellido !== '') {
        res.json(usuario);
    } else {
        res.send("Datos no ingresado");
    }
});

/*METODO PARA ACTUALIZAR INFORMACION DE LOS REGISTROS*/
app.get('/datosEditar', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/datosEditar.html'));
});
app.post('/obtener-editar-usuario', function(req, res) {
    const id = req.body.id;
    let newData = req.body;
    usuario.forEach(record => {
        if (record.id === id) {
            record.nombre = newData.nombre;
            record.apellido = newData.apellido;
            console.log(`Registro ${id} ha sido actualizado`);
        }
    });
    console.log(usuario);
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

/*METODO PARA ELIMINAR REGISTROS*/
app.get('/formularioEDatos', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/datosEliminados.html'));
});

app.post('/eliminar-usuario', function(req, res) {
    const id = req.body.id;
    for (let i = 0; i < usuario.length; i++) {
        const element = usuario[i];
        if (element.id == id) {
            usuario.splice(i, 1);
        }
    }
    console.log("Registro eliminado con exito");
    console.log(usuario);
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

/*PUERTO DE ESCUCHA */
app.listen(8000, function() {
    console.log('Servidor corriendo en el puerto 8000');
});