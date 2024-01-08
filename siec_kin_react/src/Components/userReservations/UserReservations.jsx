import "./UserReservations.css";

const UserReservations = ({ reservations }) => {
    return (
        <>
            {reservations ? (
                <>
                    {reservations.map((reservation) => {

                        return (
                            <div
                                className="reservationContainer"
                                key={reservation.reservationId}
                            >
                                <div className="left">
                                    <img src={reservation.session.movie.picture_url}></img>
                                </div>
                                <div className="mid">
                                    <div className="movieTitle">
                                        <h5>{reservation.session.movie.title}</h5>
                                    </div>
                                    <div className="">
                                        Data seansu: {reservation.session.showDate}
                                    </div>
                                    <div className="">
                                        Godzina: {reservation.session.startTime}
                                    </div>
                                    <div className="">
                                        Miejsce: {reservation.seatRow}{reservation.seatNumber}
                                    </div>
                                    <div className="">
                                        {/* JAK BĘDZIE MODEL SALA TO ZMIENIĆ NA NAZWĘ SALI */}
                                        Sala: {reservation.session.screeningRoomId}
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="boughtDate">
                                        {reservation.purchaseDate}
                                    </div>
                                    <div className="">
                                        Kino: {reservation.session.cinema.city}
                                    </div>
                                    <div className="">
                                        Cena biletu: {reservation.price}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </>
            ) : (
                <p>pobieranie danych</p>
            )}
        </>
    );
}

export default UserReservations;