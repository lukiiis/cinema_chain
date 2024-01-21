import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Shows.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

export default function Shows({ filmID }) {
    const [cinema, setCinema] = useState();
    const [show, setShow] = useState();
    let defaultCinemaID = 1;
    let [city, setCity] = useState("Krakow");
    const navigate = useNavigate();

    const handleRedirect = (seansID) => {
      const newPath = '/reservation';
      
      navigate(newPath, { state: { seansID: seansID } });
    };
    useEffect(() => {
      const getCinema = () => {
        axios.get('http://localhost:8090/api/v1/kino').then(
          response => {
            setCinema(response.data)
          }
        ).catch(err => {
          console.log('Acces denied')
        })
      }
      getCinema();
    }, []);

    useEffect(() => {
      handleShow(defaultCinemaID);
    }, []);

    const handleShow = async (kinoID) => {
      const url = 'http://localhost:8090/api/v1/seans/' + kinoID + '/' + filmID;
      const getShow = () => {
        axios.get(url).then(
          response => {
            setShow(response.data)
          }
        ).catch(err => {
          console.log('Acces denied', err)
        })
      }
      getShow();
    }
    const setCinemaCity = async (x) => {
      setCity(x);
    }

    const weekDates = Array.from({ length: 7 }, (_, index) => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + index);
      return currentDate.toISOString().split('T')[0];
    });
    return (
      <div className='show-body'>
        <h5>WYBIERZ SWOJE KINO:</h5>
        <div className="dropdown custom-dropdown">
          <button className="btn btn-secondary dropdown-toggle custom-button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            {city}
          </button>
          <div className="dropdown-menu custom-menu" aria-labelledby="dropdownMenuButton">
            {cinema ? (
              cinema.map((cinema, index) => (
                <a key={cinema.cinemaId} className="dropdown-item custom-item" onClick={() => { handleShow(cinema.cinemaId); setCinemaCity(cinema.city) }}>
                  {cinema.city}
                </a>
              ))
            ) : null}
          </div>
        </div>
        <div className='show-container'>
          {
            weekDates.map((date, index) => (
              <div className='date-container' key={index}>
                <div className='date-block'>
                  {date === new Date().toISOString().split('T')[0] && <h4 className='today-tomorrow-text'>DZISIAJ&nbsp;</h4>}
                  {date === new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0] && <h4 className='today-tomorrow-text'>JUTRO&nbsp;</h4>}
                  {date && (
                    <h4>
                      {new Date(date).toLocaleDateString('pl-PL', {
                        weekday: 'long',
                        day: '2-digit',
                        month: 'long',
                      }).toUpperCase()
                        .replace(',', '')}
                    </h4>
                  )}
                </div>
                <div className='show-block-container'>
                  {show ? (
                    show.map((show, showIndex) => date === show.showDate && (
                      <div className="show-block" key={show.showId} onClick={() => handleRedirect(show.showId)}>
                        <h2 className="hour-text-shows">{show.startTime}</h2>
                        <h1 className="dubbing-text-shows">{show.lector}, {show.movieFormat}</h1>
                      </div>
                    ))
                  ) : null}
                </div>
                {show && show.filter(showItem => date === showItem.showDate).length === 0 && (
                  <h2 className='empty-show-block'>Brak seansow na ten dzien</h2>
                )
                }
              </div>
            ))
          }

        </div>
      </div>
    );
}