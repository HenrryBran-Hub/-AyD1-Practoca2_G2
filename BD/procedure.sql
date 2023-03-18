use IMDbX;
DELIMITER $$
CREATE PROCEDURE AddComeCali(
	in idUsuario INT,
    in idPelicula INT,
    in calificacion DECIMAL(3,2),
    in comentario VARCHAR(500),
    OUT RESULTADO INT
)
BEGIN
	declare num int;
	-- INSERTAMOS A LA TABLA DE CALIFICACION 
	INSERT INTO Calificacion(id_Usuario, id_Pelicula,Calificacion) 
    VALUE (idUsuario,idPelicula,calificacion);
    SET num=last_insert_id();
    -- INSERTAMOS A LA TABLA DE COMENTARIO 
    INSERT INTO Comentario(Comentario,Id_Calificacion)
    VALUE(comentario,num);
    Select concat(U.Nombre," ",U.Apellido) as Nombre from Usuario as U where U.id_Usuario=idUsuario;
END;
$$

-- CALL AddComeCali(2,4,4,'Aunque el sonido es muy bajo pero estubo intersante el video',@result);

DELIMITER $$
CREATE PROCEDURE GETCOMENT(
	IN PELICULA INT
)
BEGIN
	SELECT concat(U.Nombre," ",U.Apellido) as Nombre,L.Calificacion As Punteo, C.Comentario As Comentario FROM Pelicula as P
    INNER JOIN Calificacion as L ON L.Id_Pelicula=P.Id_Pelicula
    INNER JOIN Usuario as U ON U.Id_Usuario=L.Id_Usuario
    INNER JOIN Comentario as C ON C.Id_Calificacion= L.Id_Calificacion
    WHERE P.Id_Pelicula=PELICULA
    ORDER BY L.Id_Calificacion desc;
END;
$$

-- CALL GETCOMENT(4);