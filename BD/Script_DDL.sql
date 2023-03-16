#-------------------------------------------------------------------------
#CREAMOS LA BASE DE DATOS DE LA ORGANIZACION "IMDbX"
#-------------------------------------------------------------------------
CREATE DATABASE IMDbX;

#CREACION DEL MODELO RELACIONAL
#CREACION DE TABLAS

#-------------------------------------------------------------------------
#USAMOS LA BASE DE DATOS
#-------------------------------------------------------------------------
USE IMDbX;

#-------------------------------------------------------------------------
#CREAMOS LA TABLA DE Usuario
#-------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Usuario (
	Id_Usuario INT AUTO_INCREMENT NOT NULL,
    Nombre VARCHAR (150) NOT NULL,
    Apellido VARCHAR (150) NOT NULL,
    Correo VARCHAR ( 150) NOT NULL,
    Contrasenia VARCHAR (30) NOT NULL,
    PRIMARY KEY (Id_Usuario)
)ENGINE=INNODB;

#-------------------------------------------------------------------------
#CREAMOS LA TABLA DE Actor
#-------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Actor (
	Id_Actor INT AUTO_INCREMENT NOT NULL,
    Nombre VARCHAR (150) NOT NULL,
    Apellido VARCHAR (150) NOT NULL,
    Fecha_Nacimiento DATE NOT NULL,
    Nacionalidad VARCHAR (50) NOT NULL,
    Foto MEDIUMBLOB NOT NULL,
    PRIMARY KEY (Id_Actor)
)ENGINE=INNODB;

#-------------------------------------------------------------------------
#CREAMOS LA TABLA DE Pelicula
#-------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Pelicula (
	Id_Pelicula INT AUTO_INCREMENT NOT NULL,
    Nombre VARCHAR (150) NOT NULL,
    Director VARCHAR (150) NOT NULL,
    Estreno DATE NOT NULL,
    Resumen VARCHAR (500) NOT NULL,
    typo VARCHAR (150) NOT NULL,
    INombre VARCHAR (200) NOT NULL,
    Poster LONGBLOB NOT NULL,
    PRIMARY KEY (Id_Pelicula)
)ENGINE=INNODB;

#-------------------------------------------------------------------------
#CREAMOS LA TABLA DE Watchlist
#-------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Watchlist (
	Id_Usuario INT NOT NULL,
    Id_Pelicula INT NOT NULL,
	PRIMARY KEY (Id_Usuario,Id_Pelicula),
    FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Usuario)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Id_Pelicula) REFERENCES Pelicula(Id_Pelicula)
    ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=INNODB;

#-------------------------------------------------------------------------
#CREAMOS LA TABLA DE Reparto (union entre la tabla pelicula y actor)
#-------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Reparto (
	Id_Actor INT NOT NULL,
    Id_Pelicula INT NOT NULL,
	PRIMARY KEY (Id_Actor,Id_Pelicula),
    FOREIGN KEY (Id_Actor) REFERENCES Actor(Id_Actor)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Id_Pelicula) REFERENCES Pelicula(Id_Pelicula)
    ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=INNODB;

#-------------------------------------------------------------------------
#CREAMOS LA TABLA DE Calificacion
#-------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Calificacion (
    Id_Calificacion INT AUTO_INCREMENT NOT NULL,
	Id_Usuario INT NOT NULL,
    Id_Pelicula INT NOT NULL,
    Calificacion DECIMAL(3,2) NOT NULL,
	PRIMARY KEY (Id_Calificacion),
    FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Usuario)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Id_Pelicula) REFERENCES Pelicula(Id_Pelicula)
    ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=INNODB;

#-------------------------------------------------------------------------
#CREAMOS LA TABLA DE Comentario
#-------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Comentario (
    Id_Comentario INT AUTO_INCREMENT NOT NULL,
	Comentario VARCHAR(500) NOT NULL,
    Id_Calificacion INT NOT NULL,
	PRIMARY KEY (Id_Comentario),
    FOREIGN KEY (Id_Calificacion) REFERENCES Calificacion(Id_Calificacion)
    ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=INNODB;


