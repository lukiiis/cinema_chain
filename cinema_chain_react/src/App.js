import api from './api/axiosConfig'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home'
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Promotions from './Pages/Promotions/Promotions';
import PromotionDetails from './Pages/Promotions/PromotionDetails';
import About from './Pages/About/About';
import News from './Pages/News/News';
import NewsDetails from './Pages/News/NewsDetails';
import Dashboard from './Pages/Dashboard/Dashboard';
import Movie from './Pages/Movie/Movie'
import Reportory from './Pages/Repertory/Repertory';
import Reservation from './Pages/Reservation/Reservation';
import EmployeeDashboard from './Pages/EmployeeDashboard/EmployeeDashboard';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';

function App() {
  useEffect(() => {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      const decodedJwt = jwtDecode(jwtToken);
      if (!jwtToken || decodedJwt.exp * 1000 < new Date().getTime()) {
        console.log("Token expired.");
        localStorage.removeItem('token');
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rejestracja" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/promocje" element={<Promotions />} />
        <Route path="/o-nas" element={<About />} />
        <Route path="/aktualnosci" element={<News />} />
        <Route path="/promotion/:title" element={<PromotionDetails />} />
        <Route path="/aktualnosci/:title" element={<NewsDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/film/:title' element={<Movie />} />
        <Route path='/repertuar' element={<Reportory />} />
        <Route path='/employee-dashboard' element={<EmployeeDashboard />}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/Reservation' element={<Reservation />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
