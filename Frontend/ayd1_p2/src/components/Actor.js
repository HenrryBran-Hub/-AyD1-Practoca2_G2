import React, { useState } from 'react';

const Actor = () => {

    const [actor, setActor] = useState({
        Nombre: '',
        Apellido: '',
        Fecha_Nacimiento: '',
        Nacionalidad: '',
        typo: '',
        INombre: '',
        Foto: '',
    })

    const [file, setFile] = useState(null)

    const handleChange = e => {
        setActor({
            ...actor,
            [e.target.name]: e.target.value
        })
    }

    const SelectedHandler = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('Nombre', actor.Nombre)
        formData.append('Apellido', actor.Apellido)
        formData.append('Fecha_Nacimiento', actor.Fecha_Nacimiento)
        formData.append('Nacionalidad', actor.Nacionalidad)
        formData.append('typo', actor.typo)
        formData.append('INombre', actor.INombre)
        formData.append('Foto', actor.Foto)
        formData.append('image', file)

        // Validaciones de campos
        if (!actor.Nombre || !actor.Apellido || !actor.Fecha_Nacimiento || !actor.Nacionalidad || !file) {
            alert('Por favor llena todos los campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:9000/registroactor/post', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data) {
                alert('Se ha subido el actor');
                setFile('')
                setActor({
                    Nombre: '',
                    Apellido: '',
                    Fecha_Nacimiento: '',
                    Nacionalidad: '',
                    typo: '',
                    INombre: '',
                    Foto: ''
                })
                document.getElementById('fileinput').value = null
            } else {
                console.log('No se pudo realizar el registro de actor. Inténtalo más tarde.');
                return;
            }
        } catch (error) {
            console.log('No se pudo realizar el registro de actor. Inténtalo más tarde.');
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
                            <input type="text" name="Nombre" value={actor.Nombre} onChange={handleChange} placeholder="Nombre Actor" />
                        </div>
                        <div className='mb-3'>
                            <label>Apellido</label>
                        </div>
                        <div className='mb-3'>
                            <input type="text" name="Apellido" value={actor.Apellido} onChange={handleChange} placeholder="Apellido Actor" />
                        </div>
                        <div className='mb-3'>
                            <label>Fecha de Nacimiento</label>

                        </div>
                        <div className='mb-3'>
                            <input type="date" name="Fecha_Nacimiento" value={actor.Fecha_Nacimiento} onChange={handleChange} />

                        </div>
                        <div className='mb-3'>
                            <label>Nacionalidad</label>
                        </div>
                        <div className='mb-3'>
                            <input type="text" name="Nacionalidad" value={actor.Nacionalidad} onChange={handleChange} placeholder="Nacionalidad" />
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

export default Actor;