import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Movie from './components/Movie'
import Actor from './components/Actor'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' exact='' element={<HomePage />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/movie' element={<Movie />}></Route>
        <Route path='/actor' element={<Actor />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
