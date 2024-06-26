import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../../Components/navigation/Navigation";
import Footer from "../../Components/footer/Footer";
import "./News.css";
import axios from "axios";
import { useEffect, useState } from "react";

const NewsDetails = () => {
    const promotionId = useLocation();
    const { promo } = promotionId.state;
    const [news, setNews] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const url = "http://localhost:8090/api/v1/public/new/" + promo;
            try {
                const response = await axios.get(url);
                setNews(response.data);
            }
            catch (error) {
                console.error("Error while fetching data: ", error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Navigation />
            {news ? (
                <div className="newsDetailsContainer">
                    <div
                        className="newsTopContainer"
                        style={{ backgroundImage: `linear-gradient(to top, black 10%, transparent 95%), url(${news.banner})` }}
                    >
                        <div className="newsDetailsTopWrapper">
                            <div className="newsInfo">
                                <div className="newsInfoDate">
                                    <span>{news.addDate}</span>
                                </div>
                                
                                <div className="newsInfoTitle">
                                    <span className="break"></span>
                                    <span>{news.title}</span>
                                </div>
                                <div className="newsInfoShortContent">
                                    <span>{news.contents}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="newsBottomContainer">
                        <div className="newsDetailsBottomWrapper">
                            <div className="newsInfoLongContent">
                                <span>
                                    {news.contentsLong}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Pobieranie danych...</p>
            )}
            <Footer />
        </>
    );
}

export default NewsDetails;