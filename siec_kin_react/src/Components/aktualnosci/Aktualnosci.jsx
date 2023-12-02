import { useEffect, useState } from "react";
import axios from "axios";
import './Aktualnosci.css';

const Aktualnosci = () => {
    const [aktualnosci, setAktualnosci] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const response = await axios.get("http://localhost:8090/api/v1/aktualnosci");
            setAktualnosci(response.data);
        } catch(error){
            console.error("Blad pobierania danych: ", error);
        }
    };
    return ( 
        <div className="aktualnosci">
            <h1>Aktualnosci</h1>
            {aktualnosci ? (
                <div className="container">
                    {aktualnosci.map((aktualnosc) => (
                            <div className="movie" key={aktualnosc.id_aktualnosci}>
                            <div>
                              <p>{aktualnosc.data_dodania}</p>
                            </div>
                      
                            <div>
                              <img src={aktualnosc.obraz_url} />
                            </div>
                      
                            <div>
                              {/* <span>{Type}</span> */}
                              <h3>{aktualnosc.tytul}</h3>
                            </div>
                          </div>
                    ))}
                </div>
            ) : (
                <p>Pobieranie danych...</p>
            )}
        </div>
    )
}

export default Aktualnosci;