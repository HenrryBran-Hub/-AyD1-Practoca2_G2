import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';


function App() {
  return (
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' exact='' element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
