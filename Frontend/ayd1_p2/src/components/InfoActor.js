import React from 'react'
import PeliculaActor from './PeliculaActor'

// import fotica from '../assets/chopper-ico.jpg'
const {useState, useEffect} = React;

// key para usar la api de giphy
const apiKey = '4L2DqthNPoWKRPTSrrYi8kmdzALcVYrn'

const InfoActor = () => {
  const [infoActor, setInfoActor] = useState([]);
  const [movieActor, setMovieActor] = useState([]);
  const [actor, setActor] = useState('');
  const [idActor, setIdActor] = useState(0);
  
  const handleInputChange = (event) => {
    setActor(event.target.value);
  }

  const VerPeliculas = async (event) => {
    setIdActor(event.target.value)
    fetchCasting();
  }

  const fetchInfoActor = async () => {
    try {
      setInfoActor([]);
      const response = await fetch(`http://localhost:9000/getInfoActor?nombre_actor=${actor}`);
      const data = await response.json();

      data.forEach(async element => {
        element.imgUrl = await getImage(element.Nombre)
      });
      
      setInfoActor(data);
      setActor('')
    } catch (error) { }
  }

  const fetchCasting = async () => {
    try {
      // peliculas en las que ha participado el actor
      const response = await fetch(`http://localhost:9000/getCasting?id_actor=${idActor}`);
      const data = await response.json();
      setMovieActor(data);
    } catch (error) { }
  }

  const getImage = async (nombre_actor) => {
    try {
        // obteniendo url de gif para el actor
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${nombre_actor}&limit=1&offset=0&rating=g&lang=en`);
        const data = await response.json();        
        return data.data[0].images.downsized_medium.url
    } catch (error) { }
  }


  useEffect(() =>{
    fetchInfoActor();
    // fetchCasting();
  }, [])

  return (
    <div className="container-fluid col-md-12 p-0 m-0 justify-content-center align-items-center">
        <div className="row justify-content-center align-items-center"> 
            <div className='shadow-lg p-3 mb-5 bg-white rounded col-md-8 mt-5 p-5'>
                <h2 className='text-center'>Actores</h2>
                <div className="input-group my-4">
                    <input value={actor} onChange={handleInputChange}  type="text" className="form-control" placeholder="Ingrese nombre de actor" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    </input>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={fetchInfoActor}>
                            <span className='bi bi-search'>
                                Buscar
                            </span>
                        </button>
                    </div>
                </div>
                
                <div className=''>
                  {movieActor.length > 0 ? 
                    <div>
                        <PeliculaActor 
                          listado = {movieActor}
                          actor = {actor}
                        />
                    </div>
                    :
                    <div></div>
                  }
                </div>

                <div className='d-flex flex-wrap justify-content-around'>
                    {infoActor.length > 0 && infoActor.map(({Id_Actor, Nombre, Fecha_Nacimiento, Nacionalidad, imgUrl}) => (
                        <div key={Id_Actor} className='card my-3'>
                            <div className='text-center mt-3'>
                              <img key={Id_Actor} src={imgUrl} className="card-img-top rounded "
                                  style={{ width: 200, height: 200 }}/>
                            </div> 
                            <div className='card-body'>
                                <h5 className="card-title text-center">{Nombre}</h5>
                                <p>Nacionalidad: {Nacionalidad} </p>
                                <p>Fecha de nacimiento: {Fecha_Nacimiento}</p>                            
                            </div>
                            <div className='text-center mb-4'>
                                <button type='button' className='btn btn-secondary' value={Id_Actor} onClick={VerPeliculas}>
                                        Peliculas
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
            
    

  )
}

export default InfoActor