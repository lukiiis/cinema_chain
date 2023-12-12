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
        async function fetchData() {
            const url = "http://localhost:8090/api/v1/aktualnosci/" + promo;
            try{
                const response = await axios.get(url);
                setNews(response.data);
            }
            catch (error){
                console.error("Error while fetching data: ", error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Navigation/>
            {news ? (
                <div className="newsDetailsContainer">
                    <div 
                        className="newsTopContainer" 
                        style={{ backgroundImage: `linear-gradient(to top, black 8%, transparent 60%), url(${news.obraz_url_baner})` }}
                    >
                        <div className="newsDetailsTopWrapper">
                            <div className="newsInfo">
                                <div className="newsInfoDate">
                                    <span>{news.data_dodania}</span>
                                </div>
                                <div className="newsInfoTitle">
                                    <span>{news.tytul}</span>
                                </div>
                                <div className="newsInfoShortContent">
                                    <span>{news.tresc}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="newsBottomContainer">
                        <div className="newsDetailsBottomWrapper">
                            <div className="newsInfoLongContent">
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