import React from 'react'
// import fotica from '../assets/chopper-ico.jpg'

const {useState, useEffect} = React;

const InfoActor = () => {
  const [infoActor, setInfoActor] = useState([]);
  const [movieActor, setMovieActor] = useState([]);

  const fetchInfoActor = async () => {
    try {
      const response = await fetch(`http://localhost:9000/getInfoActor?id_actor=${1}`);
      const data = await response.json();
      setInfoActor(data);
    } catch (error) { }
  }

  const fetchCasting = async () => {
    try {
      const response = await fetch(`http://localhost:9000/getCasting?id_actor=${1}`);
      const data = await response.json();
      setMovieActor(data);
    } catch (error) { }
  }

  useEffect(() =>{
    fetchInfoActor();
    fetchCasting();
  }, [])

  return (
    <div className='container-fluid col-md-8 m-0 p-0 bg-secondary p-3 '>
      {infoActor.map(({Id_Actor, Nombre, Fecha_Nacimiento, Nacionalidad}) => (
        <div key={Id_Actor}>
          <div className='row'>
            <h3 className='text-center'>{Nombre}</h3>
          </div>
          <div className='row d-flex align-items-center'>
            <div className='col-sm-6'>
              <p>
                Fecha de nacimiento: {Fecha_Nacimiento}
              </p>
              <p>
                Nacionalidad: {Nacionalidad}
              </p>
            </div>
            <div className='col-sm-6 text-center'>
              {/* <img alt={fotica} src={fotica} 
                   className='img-thumbnail img-fluid rounded mx-auto d-block' width="200px"/> */}
            </div>
          </div>
        </div>
      ))}
      

      <div className='row'>
        <div>
          <h3>Participación en peliculas</h3>
        </div>

        <div className='d-flex flex-wrap justify-content-around'>
          {movieActor.map(({Id_Pelicula, Pelicula}) => (
            <div key={Id_Pelicula} className='col-md-auto '>
              <p>{Pelicula}</p>
            </div>
          ))}
        </div>

      </div>
      {/* <div className='row'>
        <button className='btn btn-success' onClick={fetchInfoActor}>CUCHAU</button>

      </div> */}       
    </div>

  )
}

export default InfoActor