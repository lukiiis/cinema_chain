import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Zapowiedzi = () => {
    const [zapowiedzi, setZapowiedzi] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const response = await axios.get("http://localhost:8090/api/v1/zapowiedzi");
            setZapowiedzi(response.data);
        } catch(error){
            console.error("Blad pobierania danych: ", error);
        }
    };

    return(
        <div>
        {zapowiedzi ? (
          <div>
            <h2>Dane z API:</h2>
              {zapowiedzi.map((zapowiedz) => (
                <div key={zapowiedz.id_zapowiedzi}>
                    <div>{zapowiedz.opis_zapowiedzi}</div>
                    <img src={zapowiedz.obraz_url}></img>    
                </div>
              ))}
          </div>
        ) : (
            //To się wyświetla, jak dane jeszcze nie są pobrane
          <p>Pobieranie danych...</p>
        )}
      </div>
    );
}
export default Zapowiedzi;