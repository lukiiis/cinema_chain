import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Footer from "../../Components/footer/Footer";
import Navigation from "../../Components/navigation/Navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import AccountSettingsContent from "../../Components/accountSettingsContent/AccountSettingsContent";
import UserReservations from "../../Components/userReservations/UserReservations";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import Card from "../../Components/card/Card";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [reservations, setReservations] = useState(null);
    const [toWatch, setToWatch] = useState(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState("myTickets"); // domyślny wybór
    const [active, setActive] = useState()
    const nodeRef = React.useRef(null); // Tworzymy ref
    const token = localStorage.getItem('token');
    //navbar refresh
    const [refreshNavigation, setRefreshNavigation] = useState(false);

    useEffect(() => {
        //jezeli token istnieje
        if (!token) {
            navigate("/login");
        }
        else if(localStorage.getItem('role') !== "USER"){
            navigate("/");
        }
        else {
            fetchUserData();
            fetchReservations();
            fetchToWatch();
        }
    }, [])

    const fetchUserData = async () => {
        try {
            const decodedToken = jwtDecode(token);
            const userLogin = decodedToken.sub;

            const url = `http://localhost:8090/api/v1/private/userdetails/${userLogin}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setUserData(response.data);
            }
            else if (response.status === 403) {
                console.log("Access forbidden");
                navigate("/");
            }
            else {
                console.log("unexpected error", response.status);
            }
        }
        catch (error) {
            console.error("Error while fetching data", error);
            if (error.response.status === 403) {
                console.log("Token expired. Log in to proceed.");
                localStorage.clear();
                navigate("/login");
            }
        }
    }

    const fetchReservations = async () => {
        try {
            const decodedToken = jwtDecode(token);
            const userLogin = decodedToken.sub;

            const url = `http://localhost:8090/api/v1/private/reservations/${userLogin}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setReservations(response.data);
            }
            else {
                console.log("unexpected error", response.status);
            }
        }
        catch (error) {
            console.error("Error while fetching data", error);
            if (error.response.status === 403) {
                console.log("Access denied.");
                localStorage.clear();
                navigate("/login");
            }
        }
    }

    

    const fetchToWatch = async () => {
        try {
            const decodedToken = jwtDecode(token);
            const userLogin = decodedToken.sub;

            const url = `http://localhost:8090/api/v1/private/to-watch/${userLogin}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status===200){
                setToWatch(response.data);
                console.log(response.data);
            }
            else{
                console.log("Unexpected error.");
            }
        }
        catch (error) {
            console.error("Error while fetching data", error);
            if (error.response.status === 403) {
                console.log("Access denied.");
                localStorage.clear();
                navigate("/login");
            }
        }
    }

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    }

    const renderContent = () => {

        switch (selectedMenuItem) {
            case "myTickets":
                return (
                    <CSSTransition in={true} appear={true} timeout={300} classNames={{
                        enter: 'fade-enter',
                        enterActive: 'fade-enter-active',
                        exit: 'fade-exit',
                        exitActive: 'fade-exit-active'
                    }} nodeRef={nodeRef}>
                        {reservations ? (
                            <div className="myTicketsContent" ref={nodeRef}>
                                <span className="break"></span>
                                <h2>MOJE BILETY</h2>
                                <UserReservations reservations={reservations} />
                            </div>
                        ) : (
                            <p>pobieranie danych</p>
                        )}

                    </CSSTransition>
                );
            case "toWatch":
                return (
                    <CSSTransition in={selectedMenuItem === "toWatch"} appear={true} timeout={300} classNames="fade" nodeRef={nodeRef}>
                        <div className="toWatchContent" ref={nodeRef}>
                            <span className="break"></span>
                            <h2>DO OBEJRZENIA</h2>
                            <div className="movie-cards">
                                {toWatch? (
                                    <>
                                        {toWatch.map((watch) => {
                                            const movieID = watch.movie.movieId;
                                            return (
                                                <Link key={watch.toWatchId} className="link" to={`/film/${watch.movie.movieId}`} state={{ movie_ID: movieID }}>
                                                    <Card
                                                        title={watch.movie.title}
                                                        poster={watch.movie.poster_url}
                                                    />
                                                </Link>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <p>pobieranie danych</p>
                                )}
                            </div>
                        </div>
                    </CSSTransition>
                );
            case "coupons":
                return (
                    <CSSTransition in={true} appear={true} timeout={300} classNames="fade" nodeRef={nodeRef}>
                        <div className="promotionalCouponsContent" ref={nodeRef}>
                            <span className="break"></span>
                            <h2>KODY PROMOCYJNE</h2>
                            <div className="promotionalCouponsMain">
                                <span>Masz kod promocyjny? Wpisz go w pole poniżej!</span>
                                <input type="text" placeholder="Wpisz kod promocyjny"></input>
                                <button type="submit">Zatwierdź</button>
                            </div>
                        </div>
                    </CSSTransition>
                );
            case "wallet":
                return (
                    <CSSTransition in={true} appear={true} timeout={300} classNames="fade" nodeRef={nodeRef}>
                        <div className="walletContent" ref={nodeRef}>
                            <span className="break"></span>
                            <h2>PORTFEL</h2>
                            <div className="walletMain">
                                <span>Dostępne środki: {userData.client.wallet} zł</span>
                                <button>Doładuj konto</button>
                            </div>
                        </div>
                    </CSSTransition>
                );
            case "accountSettings":
                return (
                    <CSSTransition in={true} appear={true} timeout={300} classNames="fade" nodeRef={nodeRef}>
                        <AccountSettingsContent
                            userData={userData}
                            token={token}
                            refreshNavigation={() => setRefreshNavigation(prevState => !prevState)}
                        />
                    </CSSTransition>
                );
            default:
                return null;
        }
    }


    return (
        <>
            <Navigation refresh={refreshNavigation} />
            <div className="dashboard">
                <div className="dashboardWrapper">
                    <h1 className="dashboardTitle">MOJE KONTO</h1>
                    <div className="dashboardMenu">
                        <ul className="menuList">
                            <li className={`${selectedMenuItem === "myTickets" ? 'activeHover' : ''}`} onClick={() => handleMenuItemClick("myTickets")}>Moje bilety</li>
                            <li className={`${selectedMenuItem === "toWatch" ? 'activeHover' : ''}`} onClick={() => handleMenuItemClick("toWatch")}>Do obejrzenia</li>
                            <li className={`${selectedMenuItem === "coupons" ? 'activeHover' : ''}`} onClick={() => handleMenuItemClick("coupons")}>Kupony promocyjne</li>
                            <li className={`${selectedMenuItem === "wallet" ? 'activeHover' : ''}`} onClick={() => handleMenuItemClick("wallet")}>Portfel</li>
                            <li className={`${selectedMenuItem === "accountSettings" ? 'activeHover' : ''}`} onClick={() => handleMenuItemClick("accountSettings")}>Ustawienia konta</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="dashboardContent">
                <div className="dashboardContentWrapper">
                    {renderContent()}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;