import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../../Components/navigation/Navigation";
import Footer from "../../Components/footer/Footer";
import "./Promotions.css";
import axios from "axios";
import { useEffect, useState } from "react";

const PromotionDetails = () => {
    const promotionId = useLocation();
    const {promo} = promotionId.state;
    const [promotion, setPromotion] = useState(null);

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () =>{
        const url = "http://localhost:8090/api/v1/promocje/" + promo;
        try{
            const response = await axios.get(url);
            setPromotion(response.data);
        }
        catch (error){
            console.error("Error while fetching data: ", error);
        }

    }

    return (
        <>
            <Navigation/>
            {promotion ? (
                <div className="promoDetailsContainer">
                    <div 
                        className="promoTopContainer" 
                        style={{ backgroundImage: `linear-gradient(to top, black 8%, transparent 60%), url(${promotion.obraz_url})` }}
                    >
                        <div className="promoDetailsTopWrapper">
                            <div className="promoInfo">
                                <div className="promoInfoDate">
                                    <span>{promotion.data_dodania}</span>
                                </div>
                                <div className="promoInfoTitle">
                                    <span>{promotion.tytul}</span>
                                </div>
                                <div className="promoInfoShortContent">
                                    <span>{promotion.tresc}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="promoBottomContainer">
                        <div className="promoDetailsBottomWrapper">
                            <div className="promoInfoLongContent">
                                <span>
                                    {(() => {
                                        if (promotion && promotion.tresc_dluga) {
                                            const sentences = promotion.tresc_dluga.split('. ');
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
            <Footer/>
        </>
     );
}

export default PromotionDetails;