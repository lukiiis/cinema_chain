import React from "react";
import "./HomeNews.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card/Card";
import { Link } from "react-router-dom";

const HomeNews = () => {
    const [news, setNews] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8090/api/v1/aktualnosci");
                setNews(response.data);
            }
            catch (error) {
                console.error("Error while fetching data: ", error);
            }
        }
        fetchData();
    }, [])


    return (
        <div className="homeNews">
            {news ? (
                <div className="homeNewsWrapper">
                    <h2 className="homeNewsHeader">
                        Aktualności
                    </h2>
                    <div className="homeNewsContainer">
                        {news.map((oneNews) => {
                            const newsId = oneNews.newsId;
                            const normalizedTitle = oneNews.title
                                .normalize("NFD") // Normalizacja znaków diakrytycznych
                                .replace(/[\u0300-\u036f]/g, "") // Usunięcie diakrytyków
                                .toLowerCase() // Zamiana na małe litery
                                .replace(/\s+/g, "-") // Zamiana spacji na pauzy
                                .split('!') //podzielenie stringa na czesci
                                .join('') //zlaczenie bez wykrzyknika
                                .split('"')
                                .join('');
                            return (
                                <Link key={oneNews.newsId} className="link" to={`/aktualnosci/${normalizedTitle}`} state={{ promo: newsId }}>
                                    <Card
                                        title={oneNews.title}
                                        poster={oneNews.image}
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <p>pobieranie danych</p>
            )}
        </div>
    );
}

export default HomeNews;