import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../../Components/navigation/Navigation";
import Footer from "../../Components/footer/Footer";
import "./Promotions.css";
import axios from "axios";
import { useEffect, useState } from "react";

const PromotionDetails = () => {
    const promotionId = useLocation();
    const { promo } = promotionId.state;
    const [promotion, setPromotion] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const url = "http://localhost:8090/api/v1/promocje/" + promo;
        try {
            const response = await axios.get(url);
            setPromotion(response.data);
        }
        catch (error) {
            console.error("Error while fetching data: ", error);
        }
    }

    return (
        <>
            <Navigation />
            {promotion ? (
                <div className="promoDetailsContainer">
                    <div
                        className="promoTopContainer"
                        style={{ backgroundImage: `linear-gradient(to top, black 10%, transparent 95%), url(${promotion.image})` }}
                    >
                        <div className="promoDetailsTopWrapper">
                            <div className="promoInfo">
                                <div className="promoInfoDate">
                                    <span>{promotion.addDate}</span>
                                </div>
                                <div className="promoInfoTitle">
                                    <span className="break"></span>
                                    <span>{promotion.title}</span>
                                </div>
                                <div className="promoInfoShortContent">
                                    <span>{promotion.contents}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="promoBottomContainer">
                        <div className="promoDetailsBottomWrapper">
                            <div className="promoInfoLongContent">
                                <span>
                                    {(() => {
                                        if (promotion && promotion.contentsLong) {
                                            const sentences = promotion.contentsLong.split('. ');
                                            const newText = sentences.map((sentence, index) => {
                                                if (index === 0) {
                                                    return <React.Fragment key={index}>{sentence}<br /></React.Fragment>;
                                                } else {
                                                    return sentence + '. ';
                                                }
                                            });
                                            return newText;
                                        }
                                        return null;
                                    })()}
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

export default PromotionDetails;