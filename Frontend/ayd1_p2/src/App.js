import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Movie from './components/Movie'
import Actor from './components/Actor'
import Cast from './components/Cast'
import 'bootstrap/dist/css/bootstrap.min.css';
import Movies from './components/Movies';

function App() {

  const [listUpdated, setListUpdate] = useState(false) 

  useEffect(() => {

    const URL = 'http://localhost:9000/getactorescast'

    const getActor = async () => {
      const response = await fetch(URL)
      const data = await response.json()
      console.log(data)
    }

    const URL2 = 'http://localhost:9000/getmoviescast'

    const getMovie = async () => {
      const response = await fetch(URL2)
      const data = await response.json()
      console.log(data)
    }

    getActor()
    getMovie()
    setListUpdate(false)
  }, [listUpdated])

  const [listactor, setlistactor] = useState(false)
  const [actor, setActor] = useState([])

  const [listmovie, setlistmovie] = useState(false)
  const [movie, setMovie] = useState([])

  useEffect(() => {
    const getActor = () => {
      fetch('http://localhost:9000/listaactores')
      .then(res => res.json())
      .then(res => setActor(res))
    }

    const getMovie = () => {
      fetch('http://localhost:9000/listapeliculas')
      .then(res => res.json())
      .then(res => setMovie(res))
    }

    getActor()    
    setlistactor(false)
    getMovie()
    setlistmovie(false)

  },[listactor,listmovie])

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' exact='' element={<HomePage />}></Route>
        <Route path='/signup' exact='' element={<Signup />}></Route>
        <Route path='/movies' exact='' element={<Movies />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/movie' element={<Movie />}></Route>
        <Route path='/actor' element={<Actor />}></Route>
        <Route path='/cast' element={<Cast actor={actor} movie={movie} setlistactor={setlistactor} setlistmovie={setlistmovie} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
