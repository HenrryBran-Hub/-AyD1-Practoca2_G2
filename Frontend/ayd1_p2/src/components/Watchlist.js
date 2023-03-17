import React, { useState, useEffect, Fragment } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

function Watchlist() {

  const [listUpdated, setlistUpdated] = useState(false)

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = () => {
      fetch('http://localhost:9000/watchlist/1')
      .then(res => res.json())
      .then(res => setUsers(res))
    }
    getUsers()
    setlistUpdated(false)
  },[listUpdated])

  const [tituloUpdated, setTituloUpdated] = useState(false)

  const [titulo, setTitulo] = useState("")

  useEffect(() => {
    const getTitulo = () => {
      fetch('http://localhost:9000/watchlist/1')
      .then(res => res.json())
      .then(res => {
        if(res.length === 0){
          setTitulo("Usuario Vacia")
        }else{
          setTitulo(res[0].Nombre)
        }
      })
    }
    getTitulo()
    setTituloUpdated(false)
  },[tituloUpdated])

  const handleEliminar = Id => {
    if (window.confirm("¿Está seguro que desea eliminar esta pelicula de tu watchlist?")) {
      const requestInit = {
        method:'DELETE'
      }
      fetch('http://localhost:9000/watchlist/' + Id, requestInit)
      .then(res => res.json())
      .then(res => console.log(res))

      setlistUpdated(true)
      } else {
        alert('Cancelado')
      }        
  }

  return (
    <Fragment>
      <p style={{fontSize: "25px", textAlign: "center"}}>Watchlist de {titulo}</p>
      <TableContainer>
        <Table style={{width: "65%", marginLeft: "18%"}}>
          <TableHead style={{background: "#0040FF"}}>
            <TableRow>
              <TableCell style={{textAlign: "center", color: "white", fontSize: "17px"}}>Id</TableCell>
              <TableCell style={{textAlign: "center", color: "white", fontSize: "17px"}}>Pelicula</TableCell>
              <TableCell style={{textAlign: "center", color: "white", fontSize: "17px"}}>Estreno</TableCell>
              <TableCell style={{textAlign: "center", color: "white", fontSize: "17px"}}>Director</TableCell>
              <TableCell style={{textAlign: "center", color: "white", fontSize: "17px"}}>Resumen</TableCell>
              <TableCell style={{textAlign: "center", color: "white", fontSize: "17px"}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell style={{textAlign: "center", fontSize: "14px"}}>{user.Id_pelicula}</TableCell>
                <TableCell style={{textAlign: "center", fontSize: "14px"}}>{user.Pelicula}</TableCell>
                <TableCell style={{textAlign: "center", fontSize: "14px"}}>{user.Estreno}</TableCell>
                <TableCell style={{textAlign: "center", fontSize: "14px"}}>{user.Director}</TableCell>
                <TableCell style={{textAlign: "center", fontSize: "14px"}}>{user.Resumen}</TableCell>
                <TableCell style={{textAlign: "center", fontSize: "14px"}}><Button variant="contained" style={{background: "#f44336", color: "white", height: "35px", width: "110px"}} startIcon={<DeleteIcon />} onClick={ () => handleEliminar(user.Id_watchlist)}>Eliminar</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

export default Watchlist;