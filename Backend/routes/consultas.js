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
            console.log(err);
        }
    })
});

module.exports = router;