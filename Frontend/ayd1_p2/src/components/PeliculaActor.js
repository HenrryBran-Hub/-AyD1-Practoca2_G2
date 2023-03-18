import React from 'react' 
 
const InfoActor = (props) => {
  return (
    <div className="shadow-none p-3 mb-2 bg-light rounded">
        <p>Peliculas en las que ha participado</p>
        <div className='d-flex flex-wrap justify-content-around'>
            {props.listado.map(({Id_Pelicula, Pelicula}) => (
                <div key={Id_Pelicula} className='' >
                    <a href={`https://www.youtube.com/results?search_query=${Pelicula} movie trailer`} 
                    className=" btn btn-dark">
                        {Pelicula}
                    </a>
                </div>
            ))}
        </div>
    </div>
  )
}

export default InfoActor