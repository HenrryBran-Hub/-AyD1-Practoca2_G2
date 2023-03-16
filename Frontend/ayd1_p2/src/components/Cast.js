import React, { useEffect, useState } from "react";

const Cast = ({ actor, movie, setlistactor, setlistmovie }) => {

    useEffect(() => {
        setlistactor(true)
        setlistmovie(true)
    }, [setlistactor, setlistmovie])

    const [selectedmovie, setSelectedmovie] = useState(null);
    const [selectedactor, setSelectedactor] = useState(null);

    const handleRowClick = (row, table) => {
        if (table === 'actor') {
            setSelectedactor(row);
        } else if (table === 'movie') {
            setSelectedmovie(row);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedmovie && selectedactor) {

            const formData = new FormData()
            formData.append('Id_Pelicula', selectedmovie.Id_Pelicula)
            formData.append('Id_Actor', selectedactor.Id_Actor)

            const jsonObj = {};
            for (const [key, value] of formData.entries()) {
                jsonObj[key] = value;
            }

            const jsonStr = JSON.stringify(jsonObj);
            // Registrar usuario en la base de datos
            try {
                const response = await fetch('http://localhost:9000/validadarreparto/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: jsonStr
                });
                const data = await response.json();
                if (Object.keys(data).length === 0) {
                    console.log('este actor esta libre si se puede asignar');
                } else {
                    console.log('Ya esta registrado este actor a la pelicula');
                    return;
                }
            } catch (error) {
                console.log('No se pudo realizar el registro el actor a la peliculas. Inténtalo más tarde.');
                return;
            }

            try {
                const response = await fetch('http://localhost:9000/registrocast/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: jsonStr
                });
                const data = await response.json();
                if (data) {
                    console.log('Se ha registrado el actor a la pelicula');
                    return;
                } else {
                    console.log('Ya esta registrado este actor en la pelicula');
                    return;
                }
            } catch (error) {
                console.log('No se pudo realizar el registro el actor a la peliculas. Inténtalo más tarde.');
                return;
            }            

        } else {
            alert('Debes de selecionar un item las dos tablas')
        }
    }

    return (
        <div className='container'>
            <div className='card p-3'>
                <div className='row'>
                    <div className='col-12'>
                        <button type='button' onClick={handleSubmit} className='btn btn-primary col-12'>Registrar</button>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-5'>
                    <h2 style={{ textAlign: 'center' }}>Peliculas</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Director</th>
                                <th>Fecha de estreno</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movie.map(movie => (
                                <tr key={movie.Id_Pelicula} className={movie === selectedmovie ? 'table-active' : ''} onClick={() => handleRowClick(movie, 'movie')}>
                                    <td>{movie.Id_Pelicula}</td>
                                    <td>{movie.Nombre}</td>
                                    <td>{movie.Director}</td>
                                    <td>{movie.Estreno}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='col-7'>
                    <h2 style={{ textAlign: 'center' }}>Actores</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Fecha de Nacimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {actor.map(actor => (
                                <tr key={actor.Id_Actor} className={actor === selectedactor ? 'table-active' : ''} onClick={() => handleRowClick(actor, 'actor')}>
                                    <td>{actor.Id_Actor}</td>
                                    <td>{actor.Nombre}</td>
                                    <td>{actor.Apellido}</td>
                                    <td>{actor.Fecha_Nacimiento}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Cast;