import React, { useState } from "react";
import "./UserReservations.css";

const UserReservations = ({ reservations }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const reservationsPerPage = 3;

    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = reservations.slice(
        indexOfFirstReservation,
        indexOfLastReservation
    );

    const totalPages = Math.ceil(reservations.length / reservationsPerPage);

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <>
            {currentReservations.length > 0 ? (
                <>
                    {currentReservations.map((reservation) => {
                        return (
                            <div
                                className="reservationContainer"
                                key={reservation.reservationId}
                            >
                                <div className="left">
                                    <img src={reservation.session.film.obraz_url}></img>
                                </div>
                                <div className="mid">
                                    <div className="movieTitle">
                                        <h5>{reservation.session.film.tytul}</h5>
                                    </div>
                                    <div className="">
                                        Data seansu: {reservation.session.data_seansu}
                                    </div>
                                    <div className="">
                                        Godzina: {reservation.session.godzina_rozpoczecia}
                                    </div>
                                    <div className="">
                                        Miejsce: {reservation.seatRow}{reservation.seatNumber}
                                    </div>
                                    <div className="">
                                        {/* JAK BĘDZIE MODEL SALA TO ZMIENIĆ NA NAZWĘ SALI */}
                                        Sala: {reservation.session.id_sali}
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="boughtDate">
                                        {reservation.purchaseDate}
                                    </div>
                                    <div className="">
                                        Kino: {reservation.session.kino.miasto}
                                    </div>
                                    <div className="">
                                        Cena biletu: {reservation.price}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="paginationButtons">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                        >
                            &#9664;
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                        >
                             &#9654;
                        </button>
                    </div>
                </>
            ) : (
                <p>Brak rezerwacji do wyświetlenia.</p>
            )}
        </>
    );
};

export default UserReservations;