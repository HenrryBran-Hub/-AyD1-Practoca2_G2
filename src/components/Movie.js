import React, { useState } from 'react';

const Movie = () => {

    const [movie, setMovie] = useState({
        Nombre: '',
        Director: '',
        Estreno: '',
        Resumen: '',
        type: '',
        INombre: '',
        Poster: '',
        Trailer: ''
    })

    const [file, setFile] = useState(null)

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const SelectedHandler = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('Nombre', movie.Nombre)
        formData.append('Director', movie.Director)
        formData.append('Estreno', movie.Estreno)
        formData.append('Resumen', movie.Resumen)
        formData.append('type', movie.type)
        formData.append('INombre', movie.INombre)
        formData.append('Poster', movie.Poster)
        formData.append('Trailer', movie.Trailer)
        formData.append('image', file)

        // Validaciones de campos
        if (!movie.Nombre || !movie.Director || !movie.Estreno || !movie.Resumen || !file) {
            alert('Por favor llena todos los campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:9000/registropelicula/post', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data) {
                alert('Se ha subido la pelicula');
                setFile('')
                setMovie({
                    Nombre: '',
                    Director: '',
                    Estreno: '',
                    Resumen: '',
                    type: '',
                    INombre: '',
                    Poster: ''
                })
                document.getElementById('fileinput').value = null
            } else {
                console.log('No se pudo realizar el registro de peliculas. Inténtalo más tarde.');
                return;
            }
        } catch (error) {
            console.log('No se pudo realizar el registro de peliculas. Inténtalo más tarde.');
            return;
        }      

    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
                <div className="col-sm-6 my-container d-flex justify-content-center align-items-center">
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label>Nombre</label>
                        </div>
                        <div className='mb-3'>
                            <input type="text" name="Nombre" value={movie.Nombre} onChange={handleChange} placeholder="Nombre de Pelicula" />
                        </div>
                        <div className='mb-3'>
                            <label>Director</label>
                        </div>
                        <div className='mb-3'>
                            <input type="text" name="Director" value={movie.Director} onChange={handleChange} placeholder="Nombre de Director" />

                        </div>
                        <div className='mb-3'>
                            <label>Fecha de Estreno</label>

                        </div>
                        <div className='mb-3'>
                            <input type="date" name="Estreno" value={movie.Estreno} onChange={handleChange} />

                        </div>
                        <div className='mb-3'>
                            <label>Sinopsis</label>
                        </div>
                        <div className='mb-3'>
                            <textarea className="form-control" rows="5" name="Resumen" value={movie.Resumen} onChange={handleChange} placeholder="Resumen de la pelicula" ></textarea>
                        </div>
                        <div className='container mt 6'>
                            <div className='card p-3'>
                                <div className='row'>
                                    <div className='col-10'>
                                        <input id='fileinput' onChange={SelectedHandler} className='form-control' type='file' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='container mt 6'>
                            <div className='card p-3'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <button type='button' onClick={handleSubmit} className='btn btn-primary col-12'>Registrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Movie;