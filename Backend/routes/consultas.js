const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router();
const mysqlConnection = require('../database');

const disktorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-ayd1-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: disktorage
}).single('image')


//En esta parte agregamos nuestros metodos get y post

<<<<<<< HEAD
//Buscar contacto
router.get('/getPeliculas',(req, res) => {
    let consulta = "SELECT * FROM Pelicula"
    mysqlConnection.query(consulta, (err, rows, fields) => {
        if (!err){
            res.json(rows);
        }else {
        }
    })
})
=======
//subir archivos y guardar en proyecto
router.post('/images/post', fileUpload, (req, res) => {
    const typo = req.file.mimetype
    const INombre = req.file.originalname
    const Poster = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))
    const Nombre = req.body.Nombre
    const Director = req.body.Director
    const Estreno = req.body.Estreno
    const Resumen = req.body.Resumen
    mysqlConnection.query('INSERT INTO Pelicula set ?', [{Nombre, Director, Estreno, Resumen, typo, INombre, Poster}],(err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});
>>>>>>> develp

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