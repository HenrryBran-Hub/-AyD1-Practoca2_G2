import React from 'react'


// import fotica from '../assets/chopper-ico.jpg'
const {useState, useEffect} = React;

const apiKey = '4L2DqthNPoWKRPTSrrYi8kmdzALcVYrn'
const InfoActor = ({keyword = 'car'}) => {
  const [infoActor, setInfoActor] = useState([]);
  const [movieActor, setMovieActor] = useState([]);
  const [actor, setActor] = useState('');
  const [idActor, setIdActor] = useState(0);
  
  const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=1&offset=0&rating=g&lang=en`
  const handleInputChange = (event) => {
    setActor(event.target.value);
  }

  const VerPeliculas = async (event) => {
    setIdActor(event.target.value)
    fetchCasting();
  }

  const fetchInfoActor = async () => {
    try {
      const response = await fetch(`http://localhost:9000/getInfoActor?nombre_actor=${actor}`);
      const data = await response.json();
      setInfoActor(data);
      console.log(infoActor)
      setActor('')
    } catch (error) { }
  }

  const fetchCasting = async () => {
    try {
      const response = await fetch(`http://localhost:9000/getCasting?id_actor=${idActor}`);
      const data = await response.json();
      console.log("---------------")
      setMovieActor(data);
      console.log(movieActor)
    } catch (error) { }
  }

  const getImage = async () => {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        
        console.log(data)
        
    } catch (error) { }
  }


  useEffect(() =>{
    fetchInfoActor();
    fetchCasting();
  }, [],[])

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
                
                {/* <div className='bg bg-danger'>
                
                        <div> 
                            s
                            {movieActor.map(({Id_Pelicula, Pelicula}) => {
                                <h2 key={Id_Pelicula} className='text-dark'> xxxxxxxx </h2>
                                // <a key={Id_Pelicula} href="#" className="badge badge-warning">{Pelicula}</a>
                            })}
                        </div>
                 
                </div> */}


                <div className='d-flex flex-wrap justify-content-around'>
                    {infoActor.map(({Id_Actor, Nombre, Fecha_Nacimiento, Nacionalidad}) => (
                        <div key={Id_Actor} className='card my-3' >
                            {/* <img className="card-img-top" src="http://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-USQldFTYp0CFd2wmrc" 
                                alt="Card image cap"></img> */}
                            <div className='card-body'>
                                <h5 className="card-title text-center">{Nombre}</h5>
                                <p>Nacionalidad: {Nacionalidad} </p>
                                <p>Fecha de nacimiento: {Fecha_Nacimiento}</p>                            
                            </div>
                            <div className='text-center mb-4'>
                                <button type='button' className='btn btn-secondary' value={Id_Actor} onClick={VerPeliculas}  >
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