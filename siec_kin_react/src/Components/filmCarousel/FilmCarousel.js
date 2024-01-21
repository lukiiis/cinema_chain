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
            axios.get('http://localhost:8090/api/v1/slider-movies').then(
                response => {
                    setMovies(response.data)
                }
            ).catch(err => {
                console.log('Error while fetching data')
            })
        }
        getMovies();
    }, []);

    return (
        <div>
            {movies ? (
                <div>
                    <Carousel 
                        navButtonsProps={{
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
                            <Link to={`/film/${movie.movieId}`} state={{ movie_ID: movie.movieId }} key={movie.movieId}>
                                <Paper>
                                    <div className='movie-card-container'>
                                        <img className='movie-card-poster' src={movie.picture_url} alt="" />
                                        <div className="movie-card" >
                                            <div className="movie-detail">
                                                <div className="movie-poster">
                                                    <img src={movie.poster_url} alt="" />
                                                </div>
                                                <div className="movie-title">
                                                    <h4 className='movie-title-carousel'>{movie.title}</h4>
                                                </div>
                                                <div className="movie-buttons-container">
                                                    
                                                        <div className="play-button-icon-container">
                                                            <FontAwesomeIcon className="play-button-icon"
                                                                icon={faCirclePlay}
                                                            />
                                                        </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                            </Link>
                        ))}
                    </Carousel>
                </div>
            ) : (
                <div style={{ height: `600px` }}>Pobieranie danych...</div>
            )}
        </div>
    );

}


