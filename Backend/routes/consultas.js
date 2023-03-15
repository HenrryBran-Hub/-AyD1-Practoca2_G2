const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//En esta parte agregamos nuestros metodos get y post

//Buscar contacto
router.get('/getPeliculas',(req, res) => {
    let consulta = "SELECT * FROM Pelicula"
    mysqlConnection.query(consulta, (err, rows, fields) => {
        if (!err){
            res.json(rows);
        }else {
        }
    }
}

//Agregar un usuario
router.post('/registrousuarios', (req, res) => {
    let contacto = "(\'" + req.body.Nombre + "\',\'" + req.body.Apellido + "\',\'" + req.body.Correo + "\',\'" + req.body.Contrasenia + "\')"
    let consulta = `INSERT INTO Usuario
    (Nombre,Apellido,Correo,Contrasenia)
    VALUES ` + contacto;
    mysqlConnection.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

//Verificacion que no exista el correo
router.get('/validarCorreo/:Correo', (req, res) => {
    let contacto = "SELECT *FROM Usuario WHERE Correo = "
    let consulta = contacto + "\'" + req.params.Correo + "\'"
    mysqlConnection.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});



module.exports = router;