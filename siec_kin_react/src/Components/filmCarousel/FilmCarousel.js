import axios from 'axios';
import { useState, useEffect } from 'react';
import './FilmCarousel.css'
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


export default function FilmCarousel() {

    const [movies, setMovies] = useState();

    useEffect(() => {
        const getMovies = () => {
            axios.get('http://localhost:8090/api/v1/film').then(
                response => {
                    setMovies(response.data)
                    console.log(response.data)
                }
            ).catch(err => {
                console.log('nie dziala')
            })
        }
        getMovies();
    }, []);

    return (
        <div>
            {movies ? (
                <div>
                    <Carousel
                        navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                            style: {
                                borderRadius: 0,
                                color: 'yellow'
                            }
                        }}
                        indicatorIconButtonProps={{
                            style: {
                                width: '20px'
                            }
                        }}

                    >
                        {movies.map((movie, index) => (
                            <Paper key={movie.id_filmu}>
                                <div className='movie-card-container'>
                                    <img className='movie-card-poster' src={movie.obraz_url} alt="" />
                                    <div className="movie-card" >
                                        <div className="movie-detail">
                                            <div className="movie-poster">
                                                <img src={movie.plakat_url} alt="" />
                                            </div>
                                            <div className="movie-title">
                                                <h4 className='movie-title-carousel'>{movie.tytul}</h4>
                                            </div>
                                            <div className="movie-buttons-container">
                                                <Link to={`/Trailer/${movie.obraz_url.substring(movie.obraz_url.length - 11)}`}>
                                                    <div className="play-button-icon-container">
                                                        <FontAwesomeIcon className="play-button-icon"
                                                            icon={faCirclePlay}
                                                        />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        ))}
                    </Carousel>
                </div>
            ) : (
                <div style={{ height: `600px` }}>Pobieranie danych...</div>
            )}
        </div>
    );

}


