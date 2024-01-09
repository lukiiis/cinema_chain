import React from "react";
import { useState, useEffect } from "react";
import Footer from "../../Components/footer/Footer";
import Navigation from "../../Components/navigation/Navigation";
import axios from "axios";
import "./Promotions.css";
import { Link } from 'react-router-dom';

const Promotions = () => {
    const [promotions, setPromotions] = useState(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8090/api/v1/public/promotions");
            setPromotions(response.data);
        }
        catch (error) {
            console.error("Error while fetching data: ", error);
        }
    }

    return (
        <>
            <Navigation active={"promotions"} />
            <div className="promotions">
                {promotions ? (
                    <>
                        {promotions.map((promotion, index) => {
                            const promoId = promotion.promotionId;
                            const normalizedTitle = promotion.title
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                                .split('!')
                                .join('');
                            return (
                                <div
                                    className={`promoContainer ${hovered === index ? 'highlighted' : 'dimmed'} ${index === 0 ? 'highlighted' : ''}`}
                                    key={promotion.promotionId}
                                    style={{ backgroundImage: `linear-gradient(to right, black 27%, transparent 80%), url(${promotion.image})` }}
                                    onMouseEnter={() => setHovered(index)}
                                    onMouseLeave={() => setHovered(false)}
                                >
                                    <div className="promoWrapper">
                                        <div className="promoInfoContainer">
                                            <div className="promoAddDate">
                                                <span>{promotion.addDate}</span>
                                            </div>
                                            <div className="promoTitle">
                                                <span className="break"></span>
                                                <h2>{promotion.title}</h2>
                                            </div>
                                            <div className="promoContent">
                                                {promotion.contents}
                                            </div>
                                            <Link to={`/promotion/${normalizedTitle}`} state={{ promo: promoId }}>
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
            <Footer />
        </>
    );
}

export default Promotions;