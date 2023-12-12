import api from './api/axiosConfig'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home'
import Movie from  './Pages/Movie/Movie'
import Reportory from './Pages/Repertory/Repertory';
import { useState } from 'react';

function App() {


  return (
    <div>
   <BrowserRouter>
    <Routes>
      <Route index element ={<Home  />} />
      <Route path='film/:title' element={<Movie  />}/>
      <Route path='repertuar' element={<Reportory/>}/>
    </Routes>
    </BrowserRouter>  
    </div>
  );
}

export default App;
