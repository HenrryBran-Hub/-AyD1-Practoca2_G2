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

//Buscar contacto
router.get('/getPeliculas', (req, res) => {
    let consulta = "SELECT * FROM Pelicula"
    mysqlConnection.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
        }
    })
});

//subir archivos y guardar en proyecto
router.post('/images/post', fileUpload, (req, res) => {
    const typo = req.file.mimetype
    const INombre = req.file.originalname
    const Poster = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))
    const Nombre = req.body.Nombre
    const Director = req.body.Director
    const Estreno = req.body.Estreno
    const Resumen = req.body.Resumen
    mysqlConnection.query('INSERT INTO Pelicula set ?', [{ Nombre, Director, Estreno, Resumen, typo, INombre, Poster }], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});
//subir archivos y guardar en proyecto de pelicula
router.post('/registropelicula/post', fileUpload, (req, res) => {

    const typo = req.file.mimetype
    const INombre = req.file.originalname
    const Poster = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))
    const Nombre = req.body.Nombre
    const Director = req.body.Director
    const Estreno = req.body.Estreno
    const Resumen = req.body.Resumen
    mysqlConnection.query('INSERT INTO Pelicula set ?', [{ Nombre, Director, Estreno, Resumen, typo, INombre, Poster }], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

//subir archivos y guardar en proyecto de actor
router.post('/registroactor/post', fileUpload, (req, res) => {
    const typo = req.file.mimetype
    const INombre = req.file.originalname
    const Foto = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))
    const Nombre = req.body.Nombre
    const Apellido = req.body.Apellido
    const Fecha_Nacimiento = req.body.Fecha_Nacimiento
    const Nacionalidad = req.body.Nacionalidad
    mysqlConnection.query('INSERT INTO Actor set ?', [{ Nombre, Apellido, Fecha_Nacimiento, Nacionalidad, typo, INombre, Foto }], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

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

//lista de contactos
router.get('/getactorescast', (req, res) => {
    let consulta = `SELECT *
    FROM Actor`;
    mysqlConnection.query(consulta, (err, rows, fields) => {
        if (!err) {

            //creo los archivos en la carpeta
            rows.map(actor => {
                fs.writeFileSync(path.join(__dirname, '../dbimages/' + actor.Id_Actor + actor.INombre + '-ayd1_p2.png'), actor.Foto)
            })

            const newdata = rows.map(actor => {
                const { Foto, ...rest } = actor;
                return { ...rest, Direccion: "\'" + path.join(__dirname, '../dbimages/' + actor.Id_Actor + actor.INombre + '-ayd1_p2.png') + "\'" };
            })

            res.json(newdata)

        } else {
            console.log(err);
        }
    })
});

//lista de contactos
router.get('/getmoviescast', (req, res) => {
    let consulta = `SELECT *
    FROM Pelicula`;
    mysqlConnection.query(consulta, (err, rows, fields) => {
        if (!err) {
            //creo los archivos en la carpeta
            rows.map(movie => {
                fs.writeFileSync(path.join(__dirname, '../dbimages/' + movie.Id_Pelicula + movie.INombre + '-ayd1_p2.png'), movie.Poster)
            })

            const newdata = rows.map(movie => {
                const { Poster, ...rest } = movie;
                return { ...rest, Direccion: "\'" + path.join(__dirname, '../dbimages/' + movie.Id_Pelicula + movie.INombre + '-ayd1_p2.png') + "\'" };
            })

            res.json(newdata)

        } else {
            console.log(err);
        }
    })
});

router.get('/listapeliculas', (req, res) => {
    let consulta = "SELECT Id_Pelicula,Nombre,Director,Estreno,INombre FROM Pelicula"
    mysqlConnection.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.get('/listaactores', (req, res) => {
    let consulta = "SELECT Id_Actor,Nombre,Apellido,Fecha_Nacimiento,INombre FROM Actor"
    mysqlConnection.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

//Agregar un cast a la pelicula
router.post('/registrocast/post', (req, res) => {
    let contacto = "(\'" + req.body.Id_Actor + "\',\'" + req.body.Id_Pelicula + "\')"
    let consulta = `INSERT INTO Reparto
    (Id_Actor,Id_Pelicula)
    VALUES ` + contacto;
    mysqlConnection.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

//Agregar un cast a la pelicula
router.post('/validadarreparto/post', (req, res) => {
    let consulta = `SELECT *FROM Reparto
    WHERE Id_Pelicula =` + "\'" + req.body.Id_Pelicula + "\'" + ` AND ` +
        ` Id_Actor = ` + "\'" + req.body.Id_Actor + "\'";
    mysqlConnection.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

// añadir comentario
router.post('/addComment', (req,res) =>{
    let consulta=`CALL AddComeCali(${req.body.usuario},${req.body.pelicula},${req.body.punteo},'${req.body.comment}',@result)`;
    mysqlConnection.query(consulta, (err, rows) => {
        if (!err){
            res.json(rows[0][0]);
        }else {
            console.log(err);
        }
    })
});
// añadir comentario
router.post('/getComment', (req, res) => {
    let consulta =` CALL GETCOMENT(${req.body.pelicula})`;
    mysqlConnection.query(consulta, (err, rows) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

router.get('/Watchlist/:id', (req, res) => {
    mysqlConnection.query('select wa.Id_watchlist, us.Nombre, pe.Id_pelicula, pe.Nombre as "Pelicula", pe.Director, pe.Resumen, pe.Estreno from Watchlist wa inner join Pelicula pe on pe.Id_Pelicula = wa.Id_Pelicula inner join Usuario us on us.Id_Usuario = wa.Id_Usuario where us.Id_Usuario = ?', [req.params.id], (err, rows, fields) => {
       if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.delete('/Watchlist/:id', (req, res) => {
    mysqlConnection.query('delete from Watchlist where Id_Watchlist = ?', [ req.params.id ], (err, rows, fields) => {
       if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.post('/addWatchlist', (req, res) => {
    let registro = "(" + req.body.Id_Usuario + "," + req.body.Id_Pelicula + ")"
    mysqlConnection.query('insert into Watchlist(Id_Usuario, Id_Pelicula) values' + registro, (err, rows, fields) => {
       if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});
//creacion de un login basico 
router.post('/loginform/post', (req, res) => {
    let consulta = `SELECT *FROM Usuario
    WHERE Correo =` + "\'" + req.body.username + "\'" + ` AND ` +
        ` Contrasenia = ` + "\'" + req.body.password + "\'";
    mysqlConnection.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

//#region InformacionActor
router.get('/getInfoActor', (req, res)=>{
    let queryActor = `SELECT 
                        Id_Actor,
                        CONCAT(Nombre, ' ', Apellido) 'Nombre',
                        DATE_FORMAT(Fecha_Nacimiento, '%d/%m/%Y') 'Fecha_Nacimiento',
                        Nacionalidad,
                        Foto
                    FROM 
                        Actor 
                    WHERE 
                        Nombre LIKE '%${req.query.nombre_actor}%'
                        OR Apellido LIKE '%${req.query.nombre_actor}%' `
    mysqlConnection.query(queryActor, (err, rows, fields) => {
        if (!err){
            res.json(rows);
        }else {
            console.log(err);
        }
    })
})

router.get('/getCasting', (req, res)=>{
    let queryCasting = `SELECT 
                            a.Nombre + a.Apellido 'Nombre',
                            p.Id_Pelicula,
                            p.Nombre 'Pelicula',
                            p.Director,
                            p.Resumen,
                            p.Poster    
                        FROM 
                            Actor a 
                            JOIN Reparto r on r.Id_Actor = a.Id_Actor
                            JOIN Pelicula p on p.Id_Pelicula = r.Id_Pelicula
                        WHERE 
                            a.Id_Actor = ${req.query.id_actor}`
    
    mysqlConnection.query(queryCasting, (err, rows, fields) => {
        if (!err){
            res.json(rows);
        }else {
            console.log(err);
        }
    })
})
//#endregion

module.exports = router;