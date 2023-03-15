import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movies from './components/Movies';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' exact='' element={<HomePage />}></Route>
        <Route path='/signup' exact='' element={<Signup />}></Route>
        <Route path='/movies' exact='' element={<Movies />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
