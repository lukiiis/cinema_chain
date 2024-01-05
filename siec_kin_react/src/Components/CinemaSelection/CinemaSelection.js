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
          console.log(response.data)
        }
      ).catch(err => {
        console.log('nie dziala')
      })
    }
    getCinema();
  }, []);

  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        SPRAWDŹ REPERTUAR
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {cinema ? (
          cinema.map((cinema, index) => (
            <Link key={cinema.id_kina} className="dropdown-item" to="/repertuar">
              {cinema.miasto}
            </Link>
          ))
        ) : null}
      </div>
    </div>
  );
}