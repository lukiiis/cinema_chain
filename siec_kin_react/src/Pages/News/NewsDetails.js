import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../../Components/navigation/Navigation";
import Footer from "../../Components/footer/Footer";
import "./News.css";
import axios from "axios";
import { useEffect, useState } from "react";

const NewsDetails = () => {
    const promotionId = useLocation();
    const {promo} = promotionId.state;
    const [news, setNews] = useState(null);

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () =>{
        const url = "http://localhost:8090/api/v1/aktualnosci/" + promo;
        try{
            const response = await axios.get(url);
            setNews(response.data);
        }
        catch (error){
            console.error("Error while fetching data: ", error);
        }
    }

    return (
        <>
            <Navigation/>
            {news ? (
                <div className="promoDetailsContainer">
                    <div 
                        className="promoTopContainer" 
                        style={{ backgroundImage: `linear-gradient(to top, black 8%, transparent 60%), url(${news.obraz_url_baner})` }}
                    >
                        <div className="promoDetailsTopWrapper">
                            <div className="promoInfo">
                                <div className="promoInfoDate">
                                    <span>{news.data_dodania}</span>
                                </div>
                                <div className="promoInfoTitle">
                                    <span>{news.tytul}</span>
                                </div>
                                <div className="promoInfoShortContent">
                                    <span>{news.tresc}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="promoBottomContainer">
                        <div className="promoDetailsBottomWrapper">
                            <div className="promoInfoLongContent">
                                <span>
                                    {news.tresc_dluga}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Pobieranie danych...</p>
            )}
            <Footer/>
        </>
     );
}

export default NewsDetails;