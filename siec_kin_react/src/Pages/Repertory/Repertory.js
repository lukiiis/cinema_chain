import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Repertory.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Datepicker from '../../Components/Datepicker/Datepicker';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Navigation from '../../Components/navigation/Navigation';
import Footer from '../../Components/footer/Footer';


export default function Reportory() {
    const [cinema, setCinema] = useState();
    const [show, setShow] = useState([]);
    const [date, setDate] = useState();
    const [movie, setMovie] = useState([]);
    let defaultCinemaID = 1;
    let today = new Date();
    let [city, setCity] = useState("Krakow");

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

    useEffect(() => {
      const url = 'http://localhost:8090/api/v1/film';
      console.log(url)
      const getMovie = () => {
        axios.get(url).then(
          response => {
            setMovie(response.data)
            console.log(response.data)
          }
        ).catch(err => {
          console.log('nie dziala', err)
        })
      }
      getMovie();
    }, []);

    useEffect(() => {
      handleShow(defaultCinemaID);
    }, []);
    useEffect(() => {
      handleDataFromChild(today);
    }, []);


    const handleShow = async (kinoID) => {
      const url = 'http://localhost:8090/api/v1/seans/kino/' + kinoID;
      console.log(url)
      const getShow = () => {
        axios.get(url).then(
          response => {
            setShow(response.data)
            console.log(response.data)
          }
        ).catch(err => {
          console.log('nie dzialaaaaaaaaaaaa', err)
        })
      }
      getShow();
    }



    const setCinemaCity = async (x) => {
      setCity(x);
    }

    const handleDataFromChild = (data) => {
      const formattedDate = new Date(data).toISOString().split('T')[0];
      setDate(formattedDate)
      console.log(date)

    };

    const filteredShows = show.filter((showItem) => showItem.data_seansu === date);
    const moviesWithShowsOnDate = movie.filter((movieItem) =>
      filteredShows.some((showItem) => showItem.id_filmu === movieItem.id_filmu));
    console.log(filteredShows)
    console.log(moviesWithShowsOnDate)



    return (
      <>
        <Navigation />

        <div className='rep-body'>
          <div className='date-city-bar'>
            <div className="dropdown custom-dropdown">
              <button className="btn btn-secondary dropdown-toggle custom-button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                {city}
              </button>
              <div className="dropdown-menu custom-menu" aria-labelledby="dropdownMenuButton">
                {cinema ? (
                  cinema.map((cinema, index) => (
                    <a key={cinema.id_kina} className="dropdown-item custom-item" onClick={() => { handleShow(cinema.id_kina); setCinemaCity(cinema.miasto) }}>
                      {cinema.miasto}
                    </a>
                  ))
                ) : null}
              </div>
            </div>
            <Datepicker onDataReceived={handleDataFromChild} />
          </div>
          <div className='repertory-items-container'>
            {moviesWithShowsOnDate ? (
              moviesWithShowsOnDate.map((movie, movieIndex) => (
                <div className='repertory-item'>
                  <div className='repertory-image-container'>
                    <img className='repertory-image' src={movie.obraz_url}></img>
                  </div>
                  <div className='repertory-information-container'>
                    <div className='movie-title-conatiner'>
                      <p className='repertory-title'>{movie.tytul}</p>
                    </div>
                    <div className='movie-cos'>
                      <p className='repertory-category'>{movie.kategoria.nazwa_gatunku}</p>
                    </div>
                    <div className='movie-description-container'>
                      <p className='repertory-description'>{movie.opis}</p>
                    </div>
                    <div className='show-container'>

                    </div>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
        
        <Footer />
      </>
    )
}