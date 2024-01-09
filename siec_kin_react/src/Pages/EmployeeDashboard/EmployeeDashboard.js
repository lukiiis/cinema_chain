import Footer from "../../Components/footer/Footer";
import Navigation from "../../Components/navigation/Navigation";
import "./EmployeeDashboard.css";
import { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const EmployeeDashboard = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    const [selectedMenuItem, setSelectedMenuItem] = useState("cinemas") // domyślny wybór
    const [modifyUsers, setModifyUsers] = useState(null);

    const [movies, setMovies] = useState(null) // lista filmow
    const [cinema, setCinema] = useState(null) // lista kin
    const [shows, setShows] = useState(null) // lista seansow
    const [cinemaHalls, setCinemaHalls] = useState(null) //lista sal w kinie

    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [errors, setErrors] = useState({})
    const [res, setRes] = useState({});


    const [searchTerm, setSearchTerm] = useState(''); // wybrany wynik z wyszukiwarki
    const [searchResults, setSearchResults] = useState([]); // wyniki wyswietlane w wyszukiwarce
    const [isListVisible, setListVisible] = useState(true); // stan do śledzenia widoczności listy

    let today = new Date(); // dzisiejsza data

    let cinemaID = 1; // tu bedzie id kina pobrane od pracownika

    const [availableHours, setAvailableHours] = useState(['9:00', '12:30', '16:00', '19:30', '23:00']); // możliwe godziny seansow
    const [filteredHours, setFilteredHours] = useState(null); // dostępne godziny seansow

    const [formData, setFormData] = useState({
        tytul: '',
        opis: '',
        rezyser: '',
        data_premiery: '',
        czas_trwania: '',
        id_kategorii: '',
        obraz_url: '',
        plakat_url: ''
    })
    const [formDataShow, setFormDataShow] = useState({
        godzina_rozpoczecia: null,
        data_seansu: today.toISOString().split('T')[0],
        id_sali: null,
        id_kina: 1,
        id_filmu: null,
        lektor: null,
        typ_obrazu: null
    })

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem); // zmiana elementu menu
    }
    const handleMovieModification = (menuItem) => {
        if (modifyUsers === menuItem) {
            setModifyUsers(null); // Jeśli klikniesz drugi raz to ukryj
        } else {
            setModifyUsers(menuItem); // Jeśli klikniesz pierwszy raz to pokaż
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const handleChangeShow = (name, value) => {
        setFormDataShow({
            ...formDataShow,
            [name]: value
        });
    };


    useEffect(() => {
        if(!token){
            navigate("/login");
        }
        else if(localStorage.getItem('role') !== "WORKER"){
            navigate("/");
        }
        const getMovies = async () => {
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

    useEffect(() => {
        const getCinema = async () => {
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
        const fetchData = async () => {
          try {
            console.log(cinemaID)
            console.log(formDataShow.id_sali)
            console.log(formDataShow.data_seansu)
            console.log(cinemaHalls)
            if (cinemaID !== null && formDataShow.id_sali !== null && formDataShow.data_seansu !== null) {
              const url = `http://localhost:8090/api/v1/seans/${cinemaID}/${formDataShow.id_sali}/${formDataShow.data_seansu}`;
              console.log(url);
              const response = await axios.get(url);
              setShows(response.data);
              console.log(response.data);
              if (response.data != null) {
                console.log("filtruje se");
                const unavailableHours = response.data.map(seans => seans.startTime);
                const filtered = availableHours.filter(hour => !unavailableHours.includes(hour));
                setFilteredHours(filtered);
              }
            }
        }
     catch (err) {
      console.log('Błąd podczas pobierania seansów:', err);
    }
        };

        fetchData();
    }, [cinemaID, formDataShow.id_sali, formDataShow.data_seansu, availableHours]);

    useEffect(() => {
        if (cinema) {
          cinema.forEach((cinemaItem) => {
            if (cinemaID === cinemaItem.cinemaId) {
              setCinemaHalls(cinemaItem.screeningrooms);
              console.log(cinemaItem) // pobieranie listy sal
            }
          });
        }
    }, [cinema, cinemaID]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("http://localhost:8090/api/v1/addMovie", formData);
                //Tutaj wstawic na fronta wiadomosc od backendu, czy udalo sie zarejestrowac pomyslnie
                console.log('Server response: ', response.data);
                setRes(response.data);
            }
            catch (error) {
                console.error('Error while sending data: ', error);
            }
        }
        else {
            //tutaj wyslac cos na ekran, ze dane bledne
            console.log('Form has errors, cannot submit.');
        }
    }

    const handleSubmitShow = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("http://localhost:8090/api/v1/addShow", formDataShow);
                //Tutaj wstawic na fronta wiadomosc od backendu, czy udalo sie zarejestrowac pomyslnie
                console.log('Server response: ', response.data);
                setRes(response.data);
            }
            catch (error) {
                console.error('Error while sending data: ', error);
            }
        }
        else {
            //tutaj wyslac cos na ekran, ze dane bledne
            console.log('Form has errors, cannot submit.');
        }
        setFormDataShow({
            godzina_rozpoczecia: null,
            data_seansu: today.toISOString().split('T')[0],
            id_sali: null,
            id_kina: cinemaID,
            id_filmu: null,
            lektor: null,
            typ_obrazu: null
        });
        setDate(today.toISOString().split('T')[0])
        setSearchTerm('');
    }


    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="date-button" onClick={onClick} ref={ref}>{date}</button>));

        useEffect(() => {
            if(movies){
                const results = movies.filter(movie =>
                    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  setSearchResults(results);
            }
          }, [searchTerm, movies]);

    const handleResultClick = (clickedTerm) => {
        // Obsłuż kliknięcie w wynik wyszukiwania
        setSearchTerm(clickedTerm);
        setListVisible(false);
    };

    const renderMovieModifyContent = () => {
        switch (modifyUsers) {
            case "add":
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="formWrapper">
                            <div className="formInputs">
                                <label>
                                    Tytul
                                    <input type="text" name="tytul" value={formData.tytul} onChange={handleChange} />
                                    {errors.login && <span>{errors.login}</span>}
                                </label>
                                <label>
                                    Opis
                                    <input type="text" name="opis" value={formData.opis} onChange={handleChange} />
                                    {errors.haslo && <span>{errors.haslo}</span>}
                                </label>
                                <label>
                                    Data Premiery
                                    <input type="date" name="data_premiery" value={formData.data_premiery} onChange={handleChange} />
                                    {errors.email && <span>{errors.email}</span>}
                                </label>
                                <label>
                                    Kategoria
                                    <input type="text" name="id_kategorii" value={formData.id_kategorii} onChange={handleChange} />
                                    {errors.nr_telefonu && <span>{errors.nr_telefonu}</span>}
                                </label>
                                <label>
                                    Obraz
                                    <input type="text" name="obraz_url" value={formData.obraz_url} onChange={handleChange} />
                                    {errors.imie && <span>{errors.imie}</span>}
                                </label>
                                <label>
                                    Plakat
                                    <input type="text" name="plakat_url" value={formData.plakat_url} onChange={handleChange} />
                                    {errors.nazwisko && <span>{errors.nazwisko}</span>}
                                </label>
                                <label>
                                    Czas trwania
                                    <input type="text" name="czas_trwania" value={formData.czas_trwania} onChange={handleChange} />
                                    {errors.nazwisko && <span>{errors.nazwisko}</span>}
                                </label>
                                <label>
                                    Rezyser
                                    <input type="text" name="rezyser" value={formData.rezyser} onChange={handleChange} />
                                    {errors.nazwisko && <span>{errors.nazwisko}</span>}
                                </label>
                            </div>
                            <div className="formButton">
                                <button type="submit">Dodaj Film</button>
                            </div>
                        </div>
                    </form>
                );
            default:
                return null;
        }
    }

    const renderContent = () => {
        switch (selectedMenuItem) {
            case "movies":
                return (
                    <>
                        <button onClick={() => handleMovieModification("add")}>Dodaj film</button>
                        {renderMovieModifyContent()}
                        <table>
                            <tr>
                                <th>ID Filmu</th>
                                <th>Tytul</th>
                                <th>Opis</th>
                                <th>Rezyser</th>
                                <th>Data premiery</th>
                                <th>Czas trwania</th>
                            </tr>
                            {movies ? (
                                <>
                                    {movies.map((movie) => {

                                        return (
                                            <tr key={movie.movieId}>
                                                <td>{movie.movieId}</td>
                                                <td>{movie.title}</td>
                                                <td>{movie.description}</td>
                                                <td>{movie.director}</td>
                                                <td>{movie.release_date}</td>
                                                <td>{movie.duration} min</td>
                                                
                                            </tr>
                                        )
                                    })}
                                </>
                            ) : (
                                <p>Brak danych</p>
                            )}
                        </table>
                    </>
                );
            case "show":
                return (

                    <div>
                        <div>
                            <div className="input-group">
                                <input
                                    type="search"
                                    placeholder="Wyszukaj film"
                                    aria-describedby="button-addon1"
                                    className="form-control border-0 bg-light"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={() => setListVisible(true)}
                                />
                                <div className="input-group-append">
                                    <button id="button-addon1" type="submit" className="btn btn-link text-primary"> <FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                                </div>
                                {isListVisible && searchTerm && (
                                    <ul className="search-results-list">
                                        {searchResults.map((movie, index) => (
                                            <li className="search-movie-link" key={index}
                                            onClick={() => {handleResultClick(movie.title); handleChangeShow('id_filmu', movie.movieId)}}>
                                                <img className="search-item-icon" src={movie.picture_url} alt={`Film ${index}`} />
                                                <p className="show-movie-title-list">{movie.title}</p>
                                            </li>))}
                                    </ul>
                                )}
                            </div>
                            {isListVisible && searchTerm && (
                                <ul className="search-results-list">
                                    {searchResults.map((movie, index) => (
                                        <li className="search-movie-link" key={index}
                                            onClick={() => { handleResultClick(movie.tytul); handleChangeShow('id_filmu', movie.id_filmu) }}>
                                            <img className="search-item-icon" src={movie.obraz_url} alt={`Film ${index}`} />
                                            <p className="show-movie-title-list">{movie.tytul}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>


                        <DatePicker wrapperClassName='date-picker'
                            selected={today}
                            onChange={(date) => {
                                setDate(date.toISOString().split('T')[0]);

                                setFormDataShow(prevFormData => ({
                                    ...prevFormData,
                                    data_seansu: date.toISOString().split('T')[0]
                                }));
                                console.log("data")
                            }}
                            customInput={<ExampleCustomInput />} showPreviousDays showNextMonths />

                        <div className="dropdown custom-dropdown">
                            <button className="btn btn-secondary dropdown-toggle custom-button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {formDataShow.id_sali || 'wybierz sale'}
                            </button>
                            <div className="dropdown-menu custom-menu" aria-labelledby="dropdownMenuButton">
                                {cinemaHalls ? (
                                    cinemaHalls.map((cinemaHall, index) => (
                                        <a key={cinemaHall.id_sali} className="dropdown-item custom-item" onClick={() => { handleChangeShow('id_sali', cinemaHall.id_sali); }}>
                                            {cinemaHall.nazwa}
                                        </a>))) : null}
                            </div>
                        </div>



                        <div className="dropdown custom-dropdown">
                            <button className="btn btn-secondary dropdown-toggle custom-button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {formDataShow.godzina_rozpoczecia || 'Wybierz godzinę'}
                            </button>
                            <div className="dropdown-menu custom-menu" aria-labelledby="dropdownMenuButton">
                                {filteredHours ? (
                                    filteredHours.map(godzina => (
                                        <a key={godzina} className="dropdown-item custom-item" onClick={() => { handleChangeShow('godzina_rozpoczecia', godzina); }}>{godzina}</a>
                                    ))) : null}
                            </div>
                        </div>



                        <div className="dropdown custom-dropdown">
                            <button className="btn btn-secondary dropdown-toggle custom-button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {formDataShow.lektor || 'Wybierz lektora'}
                            </button>
                            <div className="dropdown-menu custom-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item custom-item" onClick={() => { handleChangeShow('lektor', 'Lektor'); }}>Lektor</a>
                                <a className="dropdown-item custom-item" onClick={() => { handleChangeShow('lektor', 'Dubbing'); }}>Dubbing</a>
                                <a className="dropdown-item custom-item" onClick={() => { handleChangeShow('lektor', 'Napisy'); }}>Napisy</a>
                            </div>
                        </div>


                        <div className="dropdown custom-dropdown">
                            <button className="btn btn-secondary dropdown-toggle custom-button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {formDataShow.typ_obrazu || 'Wybierz typ obrazu'}
                            </button>
                            <div className="dropdown-menu custom-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item custom-item" onClick={() => { handleChangeShow('typ_obrazu', '2D'); }}>2D</a>
                                <a className="dropdown-item custom-item" onClick={() => { handleChangeShow('typ_obrazu', '3D'); }}>3D</a>
                                <a className="dropdown-item custom-item" onClick={() => { handleChangeShow('typ_obrazu', '4D'); }}>4D</a>
                            </div>
                        </div>


                        <button onClick={handleSubmitShow}>dodaj madafakin seans</button>
                    </div>

                );
            default:
                return null;
        }
    }


    return (
        <>
            <Navigation />
            <div className="mainContainer">
                <div className="leftContainer">
                    <ul className="menu">
                        <li onClick={() => handleMenuItemClick("movies")}>Filmy</li>
                        <li onClick={() => handleMenuItemClick("show")}>Seanse</li>
                    </ul>
                </div>
                <div className="rightContainer">
                    <div className="mainContent">
                        {renderContent()}
                    </div>
                </div>
            </div>

        </>
    );
}

export default EmployeeDashboard;