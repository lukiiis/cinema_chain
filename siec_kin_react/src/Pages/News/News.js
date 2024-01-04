import React from "react";
import Footer from "../../Components/footer/Footer";
import Navigation from "../../Components/navigation/Navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./News.css";

const News = () => {
    const [news, setNews] = useState(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8090/api/v1/aktualnosci");
            setNews(response.data);
        }
        catch (error) {
            console.error("Error while fetching data: ", error);
        }

    }

    return (
        <>
            <Navigation active={"news"} />
            <div className="news">
                {news ? (
                    <>
                        {news.map((oneNews, index) => {
                            const newsId = oneNews.id_aktualnosci;
                            const normalizedTitle = oneNews.tytul
                                .normalize("NFD") // Normalizacja znaków diakrytycznych
                                .replace(/[\u0300-\u036f]/g, "") // Usunięcie diakrytyków
                                .toLowerCase() // Zamiana na małe litery
                                .replace(/\s+/g, "-") // Zamiana spacji na pauzy
                                .split('!') //podzielenie stringa na czesci
                                .join('') //zlaczenie bez wykrzyknika
                                .split('"')
                                .join('');
                            return (
                                <div
                                    className={`newsContainer ${hovered === index ? 'highlighted' : 'dimmed'} ${index === 0 ? 'highlighted' : ''}`}
                                    key={oneNews.id_aktualnosci}
                                    style={{ backgroundImage: `linear-gradient(to right, black 27%, transparent 80%), url(${oneNews.obraz_url_baner})` }}
                                    onMouseEnter={() => setHovered(index)}
                                    onMouseLeave={() => setHovered(false)}
                                >
                                    <div className="newsWrapper">
                                        <div className="newsInfoContainer">
                                            <div className="newsAddDate">
                                                <span>{oneNews.data_dodania}</span>
                                            </div>
                                            <div className="newsTitle">
                                                <h2>{oneNews.tytul}</h2>
                                            </div>
                                            <div className="newsContent">
                                                {oneNews.tresc}
                                            </div>
                                            <Link to={`/aktualnosci/${normalizedTitle}`} state={{ promo: newsId }}>
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

export default News;