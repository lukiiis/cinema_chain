
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './SearchBar.css'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import CinemaSelection from '../CinemaSelection/CinemaSelection';
import SearchItem from '../searchItem/SearchItem';

export default function SearchBar() {
  return (
    <div className="searchBar-container">
      <div className='searchBar-wrapper'>
        <CinemaSelection />
        <SearchItem />
      </div>
    </div>
  )
}