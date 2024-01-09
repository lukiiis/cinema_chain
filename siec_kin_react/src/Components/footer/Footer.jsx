import { useState } from 'react';
import './Footer.css';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
const Footer = () => {
    const [kina, setKina] = useState(null);
    const navigate = useNavigate();

    const handleRedirect = (cinemaId) => {
        // Tutaj możesz umieścić dowolną logikę generowania nowej ścieżki
        const newPath = '/repertory';
        
        // Przekazanie danych do nowej strony
        navigate(newPath, { state: { cinemaId: cinemaId } });
      };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8090/api/v1/kino");
            setKina(response.data);
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
                        {kina ? (
                            <ul className='cinemaList'>
                                {kina.map((kino) => {
                                    const cinemaId = kino.cinemaId;
                                    const miastoLowerCase = kino.city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                                    return (
                                        <li key={kino.cinemaId}>
                                            <Link className='link' to ={`/repertuar`} state={{ cinek: cinemaId }}>{kino.city}</Link>
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
                    <span>Copyright &#169; MultiKina</span>

                </div>
            </div>
        </footer>
    );
}

export default Footer;