import React from "react";
import "./Teasers.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card/Card";

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
                        Zapowiedzi
                    </h2>
                    <div className="teasersContainer">
                        {teasers.map((teaser) => {

                            return (
                                <Card
                                    title={teaser.tytul}
                                    releaseDate={teaser.data_premiery}
                                    poster={teaser.plakat_url}
                                    key={teaser.id_filmu}
                                />
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