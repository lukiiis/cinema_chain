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

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [reservations, setReservations] = useState(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState("myTickets"); // domyślny wybór
    const nodeRef = React.useRef(null); // Tworzymy ref
    const token = localStorage.getItem('token');
    //navbar refresh
    const [refreshNavigation, setRefreshNavigation] = useState(false);

    useEffect(() => {
        //jezeli token istnieje
        // console.log("SIEMANKO", localStorage);
        if (!token) {
            navigate("/login");
        }
        else {
            fetchUserData();
            fetchReservations();
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
                 console.log(response.data);
                // console.log("Request succesfull");
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
            if(error.response.status === 403){
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
                // console.log(response.data);
                // console.log("Request succesfull");
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
            if(error.response.status === 403){
                console.log("Token expired. Log in to proceed.");
                localStorage.clear();
                navigate("/login");
            }
        }
    }

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem); // zmiana elementu menu
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
                        <div className="myTicketsContent" ref={nodeRef}>
                            <UserReservations reservations={reservations}/>
                        </div>
                    </CSSTransition>
                );
            case "toWatch":
                return (
                    <CSSTransition in={selectedMenuItem === "toWatch"} appear={true} timeout={300} classNames="fade" nodeRef={nodeRef}>
                        <div className="toWatchContent" ref={nodeRef}>
                            
                            
                        </div>
                    </CSSTransition>
                );
            case "coupons":
                return (
                    <CSSTransition in={true} appear={true} timeout={300} classNames="fade" nodeRef={nodeRef}>
                        <div className="promotionalCouponsContent" ref={nodeRef}>
                            <h1>Kody promocyjne</h1>
                            <span>Masz kod promocyjny? Wpisz go w pole poniżej!</span>
                            <input type="text" placeholder="Wpisz kod promocyjny"></input>
                            <button type="submit">Zatwierdź</button>
                        </div>
                    </CSSTransition>
                );
            case "wallet":
                return (
                    <CSSTransition in={true} appear={true} timeout={300} classNames="fade" nodeRef={nodeRef}>
                        <div className="walletContent" ref={nodeRef}>
                            <h1>Mój portfel</h1>
                            <div className="walletMain">
                                <span>Dostępne środki: {userData.klient.portfel} zł</span>
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
                            token = {token} 
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
            <Navigation refresh={refreshNavigation}/>
            <div className="dashboard">
                <div className="dashboardWrapper">
                    <h1 className="dashboardTitle">Moje konto</h1>
                    <div className="dashboardMenu">
                        <ul className="menuList">
                            <li onClick={() => handleMenuItemClick("myTickets")}>Moje bilety</li>
                            <li onClick={() => handleMenuItemClick("toWatch")}>Do obejrzenia</li>
                            <li onClick={() => handleMenuItemClick("coupons")}>Kupony promocyjne</li>
                            <li onClick={() => handleMenuItemClick("wallet")}>Portfel</li>
                            <li onClick={() => handleMenuItemClick("accountSettings")}>Ustawienia konta</li>
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