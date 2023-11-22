import axios from 'axios';
import { useState, useEffect } from 'react';
import './FilmCarousel.css'
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const FilmCarousel = ({movies}) =>{
    return(
        <div>
            <Carousel>
                {
                movies.map((movie) => {
                    return(
                        <Paper>
                            <div className='movie-card-container'>
                                <div className='movie-card'>
                                    <div className='movie-detail'>
                                        <div className='movie-poster'>

                                        </div>
                                        <div className='movie-title'>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    )
                })
            }
            </Carousel>
        </div>
    )
}


export default Carousel;