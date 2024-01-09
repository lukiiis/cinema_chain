import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Movie.css'
import '../../Components/CinemaSelection/CinemaSelection'
import '../../Components/Shows/Shows'
import Shows from '../../Components/Shows/Shows';
import Navigation from '../../Components/navigation/Navigation';
import Footer from '../../Components/footer/Footer';
import {ReactComponent as HeartSvg} from './heart-svgrepo-com.svg';
import { jwtDecode } from 'jwt-decode';

const Movie = (() => {
    const movieID = useLocation();
    const { movie_ID } = movieID.state;
    const [movie, setMovie] = useState(null);

    const token = localStorage.getItem('token');

    //pobieranie danych filmu
    useEffect(() => {
        const url = 'http://localhost:8090/api/v1/film/' + movie_ID;
        const getMovie = () => {
            axios.get(url).then(
                response => {
                    setMovie(response.data)
                }
            ).catch(err => {
                console.log('nie dziala', err)
            })
        }
        getMovie();
    }, []);

    //pobieranie to watch, zeby sprawdzic czy istnieje
    useEffect(() => {
        if(!token){
            return;
        }
        else{
            getToWatch();
        }
    }, [])

    const getToWatch = async () => {
        try{
            const decodedToken = jwtDecode(token);
            const login = decodedToken.sub;
            const movieId = movie_ID;
    
            const getToWatchUrl = `http://localhost:8090/api/v1/private/to-watch/${login}/${movieId}`;
            const response = await axios.get(getToWatchUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status===200){
                if(response.data === ""){
                    setHeartFill('svg-inactive');
                    setButtonStyle('button-inactive');
                }
                else{
                    setHeartFill('svg-active');
                    setButtonStyle('button-active');
                }
            }
            else{
                console.log("Access denied");
            }
        }
        catch (error){
            console.error(error);
        }
    }

    // dodawanie i usuwanie to watch z listy
    const [heartFill, setHeartFill] = useState('');
    const [buttonStyle, setButtonStyle] = useState('');

    const handleToWatchAdd = async () => {
        try{
            if(!token){
                //wyswietlic, ze trzeba sie zalogowac itp
                console.log("Zaloguj sie!");
                return;
            }
            if(localStorage.getItem('role') === "ADMIN"){
                return;
            }
            if(localStorage.getItem('role') === "WORKER"){
                return;
            }

            const decodedToken = jwtDecode(token);
            const login = decodedToken.sub;
            const movieId = movie_ID;

            const deleteUrl = `http://localhost:8090/api/v1/private/delete-towatch`;
            const deleteResponse = await axios.post(deleteUrl, null, {
                params:{
                    login: login,
                    movieId: movieId
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(deleteResponse.status === 200){
                if(deleteResponse.data === "Movie is not on the list"){
                    const addUrl = `http://localhost:8090/api/v1/private/add-towatch`;
                    const addResponse = await axios.post(addUrl, null, {
                        params:{
                            login: login,
                            movieId: movieId
                        },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    if(addResponse.status === 200){
                        if(addResponse.data === "Movie successfully added to 'To Watch' list"){
                            //todo wyswietlanie info o dodaniu do listy, zmiana serduszka svg
                            console.log("Movie added to To Watch list");
                            setHeartFill('svg-active');
                            setButtonStyle('button-active');
                        }
                    }
                    else{
                        console.log("Error adding to-watch.");
                    }
                }
                else if(deleteResponse.data === "Movie successfully deleted from 'To Watch' list"){
                    console.log("Movie deleted from To Watch list.");
                    setHeartFill('svg-inactive');
                    setButtonStyle('button-inactive');
                }
            }
            else{
                console.log("Error deleting to-watch.");
                //todo zrobic wyswietlanie statusu w html
            }
        }
        catch(error){
            console.error(error);
        }
    }

    //pobieranie średniej ocen filmu
    const [ratingMean, setRatingMean] = useState(null);

    useEffect(() => {
        fetchRatingMean();
    }, [])

    const fetchRatingMean = async () => {
        const url = `http://localhost:8090/api/v1/public/rating-mean/${movie_ID}`;
        const response = await axios.get(url);
        if(response.status===200){
            if(response.data === 0){
                setRatingMean('Brak ocen')
            }
            else{
                setRatingMean(response.data);
            }
        }
    }

    //pobieranie oceny, zeby sprawdzic czy istnieje
    const [userRating, setUserRating] = useState(null);

    useEffect(() => {
        if(!token){
            return;
        }
        else{
            getRating();
        }
    }, [])

    const getRating = async () =>{
        try{
            const decodedToken = jwtDecode(token);
            const login = decodedToken.sub;
            const movieId = movie_ID;
    
            const getRatingUrl = `http://localhost:8090/api/v1/private/rating/${login}/${movieId}`;
            const response = await axios.get(getRatingUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status===200){
                if(response.data === ""){
                    setHoverRating(0)
                    setRating(0);
                }
                else{
                    setHoverRating(response.data.rating);
                    setRating(response.data.rating);
                }
                setUserRating(response.data);
            }
            else{
                console.log("Access denied");
            }
        }
        catch (error){
            console.error(error);
        }
    }


    //dodawanie i usuwanie ocen ---------------------------------------------------------------------
    const [rating, setRating] = useState(0); // Ustawienie początkowej oceny na 0
    const [hoverRating, setHoverRating] = useState(0); // Stan dla najechanych gwiazdek
  
    //DODAWANIE LUB USUWANIE OCENY
    const handleRatingClick = async (value) => {
        try{
            if(!token){
                //wyswietlic, ze trzeba sie zalogowac itp
                console.log("Zaloguj sie!");
                return;
            }
            if(localStorage.getItem('role') === "ADMIN"){
                return;
            }
            if(localStorage.getItem('role') === "WORKER"){
                return;
            }

            setRating(value);
            const decodedToken = jwtDecode(token);
            const login = decodedToken.sub;
            const movieId = movie_ID;
            console.log(userRating);
            if(userRating === ""){
                const deleteUrl = `http://localhost:8090/api/v1/private/delete-rating`;
                const deleteResponse = await axios.post(deleteUrl, null, {
                    params:{
                        login: login,
                        movieId: movieId
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if(deleteResponse.status === 200){
                    if(deleteResponse.data === "Movie is not rated"){
                        const addUrl = `http://localhost:8090/api/v1/private/add-rating`;
                        const addResponse = await axios.post(addUrl, null, {
                            params:{
                                login: login,
                                movieId: movieId,
                                rating: value
                            },
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        if(addResponse.status === 200){
                            if(addResponse.data === "Rating added successfully"){
                                //todo wyswietlanie info o dodaniu do listy, zmiana serduszka svg
                                console.log("Rating added successfullyyyyy.");
                                getRating();
                            }
                        }
                        else{
                            console.log("Error adding rating.");
                        }
                    }
                    else if(deleteResponse.data === "Rating deleted successfully"){
                        console.log("Rating deleted successfullyyyyy.");
                        getRating();
                        setHoverRating(0);
                        setRating(0);
                    }
                }
                else{
                    console.log("Error deleting rating.");
                    //todo zrobic wyswietlanie statusu w html
                }
            }
            else if(userRating.rating === value){
                const deleteUrl = `http://localhost:8090/api/v1/private/delete-rating`;
                const deleteResponse = await axios.post(deleteUrl, null, {
                    params:{
                        login: login,
                        movieId: movieId
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if(deleteResponse.status===200){
                    if(deleteResponse.data === "Rating deleted successfully"){
                        console.log("Rating deleted successfullyyyyy.");
                        getRating();
                        setHoverRating(0);
                    }
                    else{
                        console.log("Error deleting rating.");
                    }
                }
            }
            else if(userRating.rating !== value){
                const updateUrl = `http://localhost:8090/api/v1/private/update-rating`;
                const updateResponse = await axios.post(updateUrl, null, {
                    params:{
                        login: login,
                        movieId: movieId,
                        rating: value
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if(updateResponse.status===200){
                    if(updateResponse.data === "Rating updated successfully"){
                        setHoverRating(value);
                        setRating(value);
                        console.log("Rating updated successfullyyyyyyyyyyy.")
                        getRating();
                    }
                    else{
                        console.log("Error updating rating");
                    }
                }
            }

        }
        catch(error){
            console.error(error);
        }
    };
  
    const handleMouseEnter = (value) => {
      setHoverRating(value);
    };
  
    const handleMouseLeave = () => {
      setHoverRating(0);
    };

    if (!movie) {
        return <div>Movie not found</div>
    }
    return (
        <>
            <Navigation />
            <div className='body-container'>
                <div className='poster-information-container'
                    style={{ background: `linear-gradient(to top, black 4%, transparent 40%)` }}
                >
                    <div className='trailer-container'
                        style={{ backgroundImage: `linear-gradient(to top, black 4%, transparent 40%), url("${movie.picture_url}")` }}
                    >

                    </div>
                    <div className='information-container'>
                        <div className='information-part'>
                            <div className='poster-container'>
                                <img className='small-poster' src={movie.poster_url}></img>
                                <div className='movie-information'>
                                    <h1 className='information-text-title'>Premiera</h1>
                                    <p className='information-text'>{movie.release_date}</p>
                                </div>
                                <div className='movie-information'>
                                    <h1 className='information-text-title'>Czas Trwania</h1>
                                    <p className='information-text'>{movie.duration}</p>
                                </div>
                                <div className='movie-information'>
                                    <h1 className='information-text-title'>Reżyseria</h1>
                                    <p className='information-text'>{movie.director}</p>
                                </div>
                                <div className='movie-information'>
                                    <h1 className='information-text-title'>Ocena</h1>
                                    <p className='information-text' style={{color:'gold', fontSize:'17px'}}>{ratingMean}</p>
                                </div>
                            </div>
                            <div className='information'>
                                <div>
                                    <h2 className='title-text'>{movie.title}</h2>
                                </div>
                                <div className='description-container'>
                                    <div className='description-text'>
                                        {movie.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grades-towatch-container'>
                            <div className='ratings-container'>
                                <span className='rating-text'>MOJA OCENA:</span>
                                <div className='stars-container'>
                                    {[...Array(10)].map((_, index) => (
                                        <span
                                        key={index}
                                        className={
                                            index < (hoverRating || rating) ? 'star filled' : 'star'
                                        } /* Ustawienie klasy w zależności od oceny lub najechanych gwiazdek */
                                        onClick={() => handleRatingClick(index + 1)}
                                        onMouseEnter={() => handleMouseEnter(index + 1)}
                                        onMouseLeave={handleMouseLeave}
                                        >
                                        ★
                                        </span>
                                    ))}
                                </div>
                                {/* <span>Moja ocena: {hoverRating || rating}</span> */}
                            </div>
                            <div className='towatch-container'>
                                <button className={`${buttonStyle}`} onClick={handleToWatchAdd}>DO OBEJRZENIA</button>
                                <HeartSvg className={`svg-heart ${heartFill}`}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='movies-show-container'>
                    <div className='movies-show-wrapper'>
                        <span className='break'></span>
                        <span>NAJBLIŻSZE SEANSE</span>
                        <Shows
                            filmID={movie.movieId}
                        ></Shows>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
})


export default Movie;