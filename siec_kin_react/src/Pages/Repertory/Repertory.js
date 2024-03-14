import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Repertory.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useState, useEffect, forwardRef } from 'react';
import Navigation from '../../Components/navigation/Navigation';
import Footer from '../../Components/footer/Footer';
import { useNavigate  } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Reportory() {
  const navigate = useNavigate();
    const [cinema, setCinema] = useState(null);
    const [show, setShow] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [movie, setMovie] = useState([]);

    let today = new Date();
    let [city, setCity] = useState("Krakow");

    const cinemaId = useLocation();

    const { cinek } = cinemaId.state;

    const defaultCinemaID = cinek;
    
    const handleRedirect = (seansID) => {
      const newPath = '/reservation';
      
      navigate(newPath, { state: { seansID: seansID } });
    };

  useEffect(() => {
    const getCinema = () => {
      axios.get('http://localhost:8090/api/v1/cinema').then(
        response => {
          setCinema(response.data)
        }
      ).catch(err => {
        console.log('Error while fetching data')
      })
    }
    getCinema()
  }, []);

  useEffect(() =>{
    if(cinema){
      cinema.forEach(element =>{
        if(element.cinemaId === defaultCinemaID){
          setCity(element.city)
        }
      })
    }
  }, [cinema])

  useEffect(() => {
    const url = 'http://localhost:8090/api/v1/movie';
    const getMovie = () => {
      axios.get(url).then(
        response => {
          setMovie(response.data)
        }
      ).catch(err => {
        console.log('Error while fetching data', err)
      })
    }
    getMovie();
  }, []);

  useEffect(() => {
    handleShow(defaultCinemaID);
  }, []);


  const handleShow = async (kinoID) => {
    const url = 'http://localhost:8090/api/v1/show/cinema/' + kinoID;
    const getShow = () => {
      axios.get(url).then(
        response => {
          setShow(response.data)
        }
      ).catch(err => {
        console.log('Error while fetching data', err)
      })
    }
    getShow();
  }


  const setCinemaCity = async (x) => {
    setCity(x);
  }
    const filteredShows = show.filter((showItem) => showItem.showDate === date);
    const moviesWithShowsOnDate = movie.filter((movieItem) =>
      filteredShows.some((showItem) => showItem.movie.movieId === movieItem.movieId)); 


  const setTomorrow = (currDate) => {
    const currentDate = new Date(currDate);
    currentDate.setDate(currentDate.getDate() + 1);
    const nextDayFormatted = currentDate.toISOString().split('T')[0];
    setDate(nextDayFormatted)
  }

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="date-button" onClick={onClick} ref={ref}>{date}</button>));

  return (
    <>
      <Navigation active={"repertory"}/>

      <div className='rep-body'>
        <div className='repertoryWrapper'>
          <div className='date-city-bar'>
            <div className="dropdown custom-dropdown">
              <button className="btn btn-secondary dropdown-toggle custom-button custom-button-repertory" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
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
              <DatePicker wrapperClassName='date-picker'
                selected={today}
                onChange={(date) => { setDate(date.toISOString().split('T')[0]) }}
                customInput={<ExampleCustomInput />}
                showPreviousDays
                showNextMonths
              />
            </div>
          </div>
          <div className='repertory-items-container'>
            {moviesWithShowsOnDate ? (
              moviesWithShowsOnDate.map((movie, movieIndex) => (
                <div className='repertory-item' key={movie.movieId}>
                  <div className='repertory-image-container'>
                    <Link to={`/film/${movie.movieId}`} state={{ movie_ID: movie.movieId }}><img className='repertory-image' src={movie.poster_url}></img></Link>
                  </div>
                  <div className='repertory-information-container'>
                    <div className='movie-title-conatiner'>
                      <p className='repertory-title'>{movie.title}</p>
                    </div>
                    <div className='movie-cos'>
                      <p className='repertory-category'>{movie.category.movie_genre}</p>
                    </div>
                    <div className='movie-description-container'>
                      <p className='repertory-description'>{movie.description}</p>
                    </div>
                    <div className='container-repertory'>
                      {filteredShows ? (
                        filteredShows.map((show, showIndex) => movie.movieId === show.movie.movieId && (
                          <div className="show-repertory" key={show.showId} onClick={() => handleRedirect(show.showId)}>
                            <h2 className="hour-text">{show.startTime}</h2>
                            <h1 className="dubbing-text">{show.lector}, {show.movieFormat}</h1>
                          </div>
                        ))
                      ) : null}
                    </div>
                  </div>
                </div>
              ))
            ) : null}
          </div>
          {filteredShows && filteredShows.filter(showItem => date === showItem.showDate).length === 0 && (
            <h2 className='empty-repertory'>Brak seansow na ten dzien</h2>)}
        </div>
        <button className='tommorow-date-button' onClick={() => { setTomorrow(date) }}>Sprawdź seanse na jutro</button>
      </div>

      <Footer />
    </>
  )
}