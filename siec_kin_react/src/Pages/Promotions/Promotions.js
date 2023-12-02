import React from "react";
import {useState, useEffect} from "react";
import Footer from "../../Components/footer/Footer";
import Navigation from "../../Components/navigation/Navigation";
import axios from "axios";
import "./Promotions.css";
import { Link } from 'react-router-dom';

const Promotions = () => {
    const [promotions, setPromotions] = useState(null);
    const [hovered, setHovered] = useState(false);

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () =>{
        try{
            const response = await axios.get("http://localhost:8090/api/v1/promocje");
            setPromotions(response.data);
        }
        catch (error){
            console.error("Error while fetching data: ", error);
        }

    }

    return ( 
        <>
            <Navigation active={"promotions"}/>
            <div className="promotions">
                {promotions ?(
                    <>
                    {promotions.map((promotion, index) => {
                        const promoId = promotion.id_promocji;
                        const normalizedTitle = promotion.tytul
                        .normalize("NFD") // Normalizacja znaków diakrytycznych
                        .replace(/[\u0300-\u036f]/g, "") // Usunięcie diakrytyków
                        .toLowerCase() // Zamiana na małe litery
                        .replace(/\s+/g, "-") // Zamiana spacji na pauzy
                        .split('!') //podzielenie stringa na czesci
                        .join(''); //zlaczenie bez wykrzyknika
                        return (
                            <div
                                className={`promoContainer ${hovered === index ? 'highlighted' : 'dimmed'} ${index === 0 ? 'highlighted' : ''}`}
                                key={promotion.id_promocji} 
                                style={{ backgroundImage: `linear-gradient(to right, black 27%, transparent 80%), url(${promotion.obraz_url})` }} 
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(false)}
                            >   
                                <div className="promoWrapper">      
                                    <div className="promoInfoContainer">
                                        <div className="promoAddDate">
                                            <span>{promotion.data_dodania}</span>
                                        </div>
                                        <div className="promoTitle">
                                            <h2>{promotion.tytul}</h2>
                                        </div>
                                        <div className="promoContent">
                                            {promotion.tresc}
                                        </div>
                                            <Link to={`/promotion/${normalizedTitle}`} state={{promo: promoId}}>
                                                Więcej informacji
                                            </Link>
                                    </div>
                                </div>
                            </div>
                        );
                        })}
                </>) : (
                    <p>pobieranie danych</p>
                )}
            </div>
            <Footer/>
        </>
     );
}

export default Promotions;