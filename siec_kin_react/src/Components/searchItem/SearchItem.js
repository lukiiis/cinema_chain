import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './SearchItem.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const SearchItem = ({ movieSetter }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios.get('http://localhost:8090/api/v1/film')
        .then(response => {
          setMovies(response.data);
        })
        .catch(err => {
          console.log('Wystąpił błąd podczas pobierania filmów.');
        });
    };

    getMovies();
  }, []);


  useEffect(() => {
    const results = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, movies]);
  return (
    <div>
      <div className="input-group searchInput">
        <input
          type="search"
          placeholder="WYSZUKAJ FILM"
          aria-describedby="button-addon1"
          className="form-control border-0 bg-light"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="input-group-append glass">
          <button
            id="button-addon1"
            type="submit"
            className="btn btn-link text-primary"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
      {searchTerm && (
        <ul className="search-results-list resList">
          {searchResults.map((movie, index) => {
            const movieID = movie.movieId;
            return (
              <Link to={`film/${movie.movieId}`} state={{ movie_ID: movieID }} >
                <li className='my-search-movie-link' key={index}>
                  <img className='search-item-icon' src={movie.poster_url} alt={`Movie ${index}`} />
                  <p className='show-movie-title-list'>{movie.title}</p>
                </li>
              </Link>
            )
          })}
        </ul>
      )}
    </div>
  );
};
export default SearchItem;