import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './CinemaSelection.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import axios from 'axios';
import { useState, useEffect } from 'react';


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
        Wybierz swoje miasto
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {cinema ? (
          cinema.map((cinema, index) => (
            <a key={cinema.id_kina} className="dropdown-item" href={cinema.miasto}>
              {cinema.miasto}
            </a>
          ))
        ) : null}
      </div>
    </div>
  );
}