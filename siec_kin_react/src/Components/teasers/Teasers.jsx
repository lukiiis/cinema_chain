import React from "react";
import "./Teasers.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card/Card";
import { Link } from "react-router-dom";

const Teasers = () => {
    const [teasers, setTeasers] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8090/api/v1/zapowiedzi");
                setTeasers(response.data);
            }
            catch (error) {
                console.error("Error while fetching data: ", error);
            }
        }
        fetchData();
    }, [])


    return (
        <div className="teasers">
            {teasers ? (
                <div className="teasersWrapper">
                    <h2 className="teasersHeader">
                        <span className="break"></span>
                        Zapowiedzi
                    </h2>
                    <div className="teasersContainer">
                        {teasers.map((teaser) => {
                            return (
                                <Link to={`/film/${teaser.id_filmu}`} state={{ movie_ID: teaser.id_filmu }} key={teaser.id_filmu}>
                                    <Card
                                        title={teaser.tytul}
                                        releaseDate={teaser.data_premiery}
                                        poster={teaser.plakat_url}
                                        key={teaser.id_filmu}
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

export default Teasers;