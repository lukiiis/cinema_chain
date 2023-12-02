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

function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element ={<Home />} />
      <Route path="/rejestracja" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/promocje" element={<Promotions/>}/>
      <Route path="/o-nas" element={<About/>}/>
      <Route path="/aktualnosci" element={<News/>}/>
      <Route path="/promotion/:title" element={<PromotionDetails/>}/>
      <Route path="/aktualnosci/:title" element={<NewsDetails/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
