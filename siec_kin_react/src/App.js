import api from './api/axiosConfig'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home'

function App() {

  return (
    <div>
   <BrowserRouter>
    <Routes>
      <Route index element ={<Home />} />
    </Routes>
    </BrowserRouter>  
    </div>
  );
}

export default App;
