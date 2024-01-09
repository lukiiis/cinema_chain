import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './CinemaSelection.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function CinemaSelection() {
  const [cinema, setCinema] = useState();

  useEffect(() => {
    const getCinema = () => {
      axios.get('http://localhost:8090/api/v1/kino').then(
        response => {
          setCinema(response.data)
        }
      ).catch(err => {
        console.log('Error while fetching data')
      })
    }
    getCinema();
  }, []);

  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle dropdawn" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        SPRAWDŹ REPERTUAR
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {cinema ? (
          cinema.map((cinema, index) => {
            const cinemaId = cinema.cinemaId;
          
          return (
            <Link key={cinema.cinemaId} className="dropdown-item" to ={`/repertuar`} state={{ cinek: cinemaId }}>
              {cinema.city}
            </Link>
          )})
        ) : null}
      </div>
    </div>
  );
}