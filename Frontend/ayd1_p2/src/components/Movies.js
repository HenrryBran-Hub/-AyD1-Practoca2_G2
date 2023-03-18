import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TablePagination } from '@mui/material';
import { Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {useNavigate} from "react-router-dom"


function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

export let inform;
function Btn(props) {
  const { rowbtn } = props;
  const { rowbtn2 } = props;
  const { indicebtn } = props;

  const handleAgregar = Id => {
   let info = {
      "Id_Usuario": 1,
      "Id_Pelicula": Id
    }
  const requestInit = {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(info)
  }
  fetch('http://localhost:9000/addwatchlist', requestInit)
  .then(res => res.json())
  .then(res => console.log(res))

  let valBoton = document.getElementById(Id - 1)
  valBoton.disabled = true
  valBoton.style.backgroundColor = "White"
  valBoton.style.color = "#64dd17"
  valBoton.textContent = "Agregado"
  valBoton.style.pointerEvents = "none"
  console.log(Id)
  }

  for(let i = 0; i < rowbtn2.length; i++){
    if(rowbtn2[i].Id_pelicula === rowbtn.Id_Pelicula ){
      return(
        <Button id={indicebtn} variant="contained" style={{background: "White", color: "#64dd17"}} disabled={true} startIcon={<CheckCircleIcon />}>Agregado</Button>
      )
    }
  }
  return(
    <Button id={indicebtn} variant="contained" style={{background: "#64dd17", color: "white", height: "30px", width: "115px"}} startIcon={<AddCircleIcon />} onClick={ () => handleAgregar(rowbtn.Id_Pelicula)}>Agregar</Button>
  );

}



function Row(props) {
  const { row } = props;
  const { row2 } = props;
  const { indice } = props;
  const [open, setOpen] = React.useState(false);
  //const base64String = btoa(String.fromCharCode(...new Uint8Array(row.Poster.data)));
  console.log(row.Poster.data)
  const base64String = ""
  let navigate = useNavigate();
  const click=Id=>{
    inform = {
      "Id_Usuario": 1,
      "Id_Pelicula": row.Id_Pelicula,
      "Nombre":row.Nombre
    }
    //console.log(row.Id_Pelicula)
    navigate('comment', { replace: true })
  }
  const btnComent={
    display:"inline-block",
    fontSize:"12px",
    padding:"8px 8px",
    backgroundColor:"#f44336",
    borderRadius:"12px",
    textAlign:"center",
    textDecoration:"none",
    border:"none",
    color:"white",
    // cursor: isHover ? 'pointer':'default',
    // opacity: isHover ? '1':'0.7',
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Nombre}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Información
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Estreno</TableCell>
                    <TableCell>Resumen</TableCell>
                    <TableCell>Watchlist</TableCell>
                    <TableCell>Comentarios</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={row.Nombre}>
                      <TableCell>{row.Id_Pelicula}</TableCell>
                      <TableCell >{row.Nombre}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.Estreno}
                      </TableCell>
                      <TableCell>{row.Resumen}</TableCell>
                      <TableCell>
                        <img src={`data:image/png;base64,${base64String}`} alt=""/>
                        <Btn rowbtn={row} rowbtn2={row2} indicebtn={indice} />
                      </TableCell>
                      <TableCell>
                        <button style={btnComent} onClick={click}>Ver</button>
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function Movies() {
  const [movies,setMovies] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  //OBTENCION Y ALMACENAMIENTO DE PELICULAS
  React.useEffect(()=>{

      fetch("http://localhost:9000/getPeliculas")
      .then((data)=>data.json())
      .then((json)=>{
        if(movies.length !== json.length){
          setMovies(json);
        }
        //console.log(movies)
      })
  }, [movies])

  const [listUpdatedWatchlist, setlistUpdatedWatchlist] = React.useState(false)
  const [watchlist, setWatchlist] = React.useState([])
  React.useEffect(() => {
    const getWatchlist = () => {
      fetch('http://localhost:9000/Watchlist/1')
      .then(res => res.json())
      .then(res => setWatchlist(res))
    }
    getWatchlist()
    setlistUpdatedWatchlist(false)
  },[listUpdatedWatchlist])
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer style={{ width: 1000, margin:"0 auto", padding:60}} component={Paper}>
      <h1 style={{textAlign:"center"}} >Catálogo de películas</h1>
      <br/>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><b>Película</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie, index) => (
            <Row key={movie.name} row={movie} row2={watchlist} indice={index}/>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={movies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
