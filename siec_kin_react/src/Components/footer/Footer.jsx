import { useState } from 'react';
import './Footer.css';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [cinemas, setCinemas] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8090/api/v1/cinema");
            setCinemas(response.data);
        } catch (error) {
            console.error("Error while fetching data: ", error);
        }
    }

    return (
        <footer>
            <div className='wrapper'>
                <div className='footerSection'>
                    <div className="cinemasHeader">
                        <h3 className='heading'>Nasze kina</h3>
                    </div>
                    <div className='cinemaListContainer'>
                        {cinemas ? (
                            <ul className='cinemaList'>
                                {cinemas.map((cinema) => {
                                    const cinemaId = cinema.cinemaId;
                                    const miastoLowerCase = cinema.city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                                    return (
                                        <li key={cinema.cinemaId}>
                                            <Link className='link' to ={`/repertuar`} state={{ cinek: cinemaId }}>{cinema.city}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p>Pobieranie danych...</p>
                        )}
                    </div>
                </div>
                <div className='footerSectionCenter'>
                    <span>Copyright &#169; TurboKino</span>

                </div>
            </div>
        </footer>
    );
}

export default Footer;