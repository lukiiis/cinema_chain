import Footer from "../../Components/footer/Footer";
import Navigation from "../../Components/navigation/Navigation";
import "./EmployeeDashboard.css";
import { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { jwtDecode } from "jwt-decode";

const EmployeeDashboard = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    const [selectedMenuItem, setSelectedMenuItem] = useState("movies")
    const [modifyUsers, setModifyUsers] = useState(null);

    const [movies, setMovies] = useState(null) // lista filmow
    const [cinema, setCinema] = useState(null) // lista kin
    const [shows, setShows] = useState(null) // lista seansow
    const [cinemaHalls, setCinemaHalls] = useState(null) //lista sal w kinie

    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [errors, setErrors] = useState({})
    const [res, setRes] = useState({});
    const [cinemaID, setCinemaID] = useState();
    const [hallName, setHallName] = useState();


    const [searchTerm, setSearchTerm] = useState(''); // wybrany wynik z wyszukiwarki
    const [searchResults, setSearchResults] = useState([]); // wyniki wyswietlane w wyszukiwarce
    const [isListVisible, setListVisible] = useState(true); // stan do śledzenia widoczności listy

    let today = new Date();
    

    const fetchCinemaId = async () => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const login = decodedToken.sub;

            const url = `http://localhost:8090/api/v1/private/cinemaId/${login}`;
            console.log(url)
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setCinemaID(response.data);
                console.log(cinemaID)
            }
            else {
                console.log("unexpected error", response.status);
            }
        }
        catch (error) {
            console.error("Error while fetching data", error);
            if (error.response.status === 403) {
                console.log("Access denied.");
                localStorage.clear();
                navigate("/login");
            }
        }
    }

    useEffect(() =>{
        fetchCinemaId();
    })

  




    const [availableHours, setAvailableHours] = useState(['9:00', '12:30', '16:00', '19:30', '23:00']); // możliwe godziny seansow
    const [filteredHours, setFilteredHours] = useState(null); // dostępne godziny seansow

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        director: '',
        release_date: '',
        duration: '',
        categoryId: '',
        picture_url: '',
        poster_url: ''
    })
    const [formDataShow, setFormDataShow] = useState({
        startTime: null,
        showDate: today.toISOString().split('T')[0],
        screeningRoomId: null,
        cinemaId: cinemaID,
        movieId: null,
        lector: null,
        movieFormat: null
    }, [cinemaID])

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    }
    const handleMovieModification = (menuItem) => {
        if (modifyUsers === menuItem) {
            setModifyUsers(null);
        } else {
            setModifyUsers(menuItem);
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

    useEffect(() =>{
        setFormDataShow({
            ...formDataShow,
            cinemaId: cinemaID
        });
    }, [cinemaID])


    useEffect(() => {
        if(!token){
            navigate("/login");
        }
        else if(localStorage.getItem('role') !== "WORKER"){
            navigate("/");
        }
        const getMovies = async () => {
            axios.get('http://localhost:8090/api/v1/movie').then(
                response => {
                    setMovies(response.data)
                }
            ).catch(err => {
                console.log('Acces denied')
            })
        }
        getMovies();
    }, []);

    useEffect(() => {
        const getCinema = async () => {
            axios.get('http://localhost:8090/api/v1/cinema').then(
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
        const fetchData = async () => {
          try {
            if (cinemaID !== null && formDataShow.screeningRoomId !== null && formDataShow.showDate !== null) {
              const url = `http://localhost:8090/api/v1/show/${cinemaID}/${formDataShow.screeningRoomId}/${formDataShow.showDate}`;
              const response = await axios.get(url);
              setShows(response.data);
              if (response.data != null) {
                const unavailableHours = response.data.map(show => show.startTime);
                const filtered = availableHours.filter(hour => !unavailableHours.includes(hour));
                setFilteredHours(filtered);
              }
            }
        }
     catch (err) {
      console.log('Error while fetching data:', err);
    }
        };

        fetchData();
    }, [cinemaID, formDataShow.screeningRoomId, formDataShow.showDate, availableHours]);

    useEffect(() => {
        if (cinema) {
          cinema.forEach((cinemaItem) => {
            if (cinemaID === cinemaItem.cinemaId) {
              setCinemaHalls(cinemaItem.screeningrooms);
              console.log(cinemaHalls)
            }
          });
        }
    }, [cinema, cinemaID]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("http://localhost:8090/api/v1/addMovie", formData);
                setRes(response.data);
            }
            catch (error) {
                console.error('Error while sending data: ', error);
            }
        }
        else {
            console.log('Form has errors, cannot submit.');
        }
    }

    const handleSubmitShow = async (e) => {
        e.preventDefault();
        console.log(formDataShow)
    
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("http://localhost:8090/api/v1/addShow", formDataShow);
                setRes(response.data);
            }
            catch (error) {
                console.error('Error while sending data: ', error);
            }
        }
        else {
            console.log('Form has errors, cannot submit.');
        }
        setFormDataShow({
            startTime: null,
            showDate: today.toISOString().split('T')[0],
            screeningRoomId: null,
            cinemaId: cinemaID,
            movieId: null,
            lector: null,
            movieFormat: null
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
        setSearchTerm(clickedTerm);
        setListVisible(false);
    };

    const renderMovieModifyContent = () => {
        switch (modifyUsers) {
            case "add":
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="formWrapper formEmp">
                            <div className="formInputs empInputs">
                                <label>
                                    Tytuł
                                    <input type="text" name="title" value={formData.title} onChange={handleChange} />
                                </label>
                                <label>
                                    Opis
                                    <input type="text" name="description" value={formData.description} onChange={handleChange} />
                                </label>
                                <label>
                                    Data Premiery
                                    <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} />
                                </label>
                                <label>
                                    Kategoria
                                    <input type="text" name="categoryId" value={formData.categoryId} onChange={handleChange} />
                                </label>
                                <label>
                                    Obraz
                                    <input type="text" name="picture_url" value={formData.picture_url} onChange={handleChange} />
                                </label>
                                <label>
                                    Plakat
                                    <input type="text" name="poster_url" value={formData.poster_url} onChange={handleChange} />
                                </label>
                                <label>
                                    Czas trwania
                                    <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
                                </label>
                                <label>
                                    Reżyser
                                    <input type="text" name="director" value={formData.director} onChange={handleChange} />
                                </label>
                            </div>
                            <div className="formButton">
                                <button type="submit">Dodaj</button>
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
                        <button className="emp-button" onClick={() => handleMovieModification("add")}>Dodaj film</button>
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
                                        const description = movie.description.split('. ')[0];
                                        return (
                                            <tr key={movie.movieId} style={{height:'30px'}}>
                                                <td>{movie.movieId}</td>
                                                <td>{movie.title}</td>
                                                <td style={{ maxWidth: '120px', maxHeight: '30px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                                    <div style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                                        {description}
                                                    </div>
                                                </td>
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

                    <div className="sessions">
                        <div>
                            <div className="input-group">
                                <input
                                    type="search"
                                    placeholder="Wyszukaj film"
                                    aria-describedby="button-addon1"
                                    className=" serc"
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
                                            onClick={() => {handleResultClick(movie.title); handleChangeShow('movieId', movie.movieId)}}>
                                                <img className="search-item-icon" src={movie.poster_url} />
                                                <p className="show-movie-title-list">{movie.title}</p>
                                            </li>))}
                                    </ul>
                                )}
                            </div>
                        </div>


                        <DatePicker wrapperClassName='date-picker'
                            selected={today}
                            onChange={(date) => {
                                setDate(date.toISOString().split('T')[0]);

                                setFormDataShow(prevFormData => ({
                                    ...prevFormData,
                                    showDate: date.toISOString().split('T')[0]
                                }));
                            }}
                            customInput={<ExampleCustomInput />} showPreviousDays showNextMonths />

                        <div className="dropdown custom-dropdown">
                            <button className="btn btn-secondary dropdown-toggle custom-button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {hallName || 'wybierz sale'}
                            </button>
                            <div className="dropdown-menu custom-menu" aria-labelledby="dropdownMenuButton">
                                {cinemaHalls ? (
                                    cinemaHalls.map((cinemaHall, index) => (
                                        <a key={cinemaHall.screeningRoomId} className="dropdown-item custom-item" onClick={() => { handleChangeShow('screeningRoomId', cinemaHall.screeningRoomId); setHallName(cinemaHall.name) }}>
                                            {cinemaHall.name}
                                        </a>))) : null}
                            </div>
                        </div>



                        <div className="dropdown custom-dropdown">
                            <button className="btn btn-secondary dropdown-toggle custom-button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {formDataShow.startTime || 'Wybierz godzinę'}
                            </button>
                            <div className="dropdown-menu custom-menu" aria-labelledby="dropdownMenuButton">
                                {filteredHours ? (
                                    filteredHours.map(hour => (
                                        <a key={hour} className="dropdown-item custom-item" onClick={() => { handleChangeShow('startTime', hour); }}>{hour}</a>
                                    ))) : null}
                            </div>
                        </div>



                        <div className="dropdown custom-dropdown">
                            <button className="btn btn-secondary dropdown-toggle custom-button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {formDataShow.lector || 'Wybierz lektora'}
                            </button>
                            <div className="dropdown-menu custom-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item custom-item" onClick={() => { handleChangeShow('lector', 'Lektor'); }}>Lektor</a>
                                <a className="dropdown-item custom-item" onClick={() => { handleChangeShow('lector', 'Dubbing'); }}>Dubbing</a>
                                <a className="dropdown-item custom-item" onClick={() => { handleChangeShow('lector', 'Napisy'); }}>Napisy</a>
                            </div>
                        </div>


                        <div className="dropdown custom-dropdown">
                            <button className="btn btn-secondary dropdown-toggle custom-button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {formDataShow.movieFormat || 'Wybierz typ obrazu'}
                            </button>
                            <div className="dropdown-menu custom-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item custom-item" onClick={() => { handleChangeShow('movieFormat', '2D'); }}>2D</a>
                                <a className="dropdown-item custom-item" onClick={() => { handleChangeShow('movieFormat', '3D'); }}>3D</a>
                                <a className="dropdown-item custom-item" onClick={() => { handleChangeShow('movieFormat', '4D'); }}>4D</a>
                            </div>
                        </div>


                        <button className="emp-button" onClick={handleSubmitShow}>Dodaj seans</button>
                        <span>{res.status}</span>
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