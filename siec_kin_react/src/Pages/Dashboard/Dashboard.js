import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Footer from "../../Components/footer/Footer";
import Navigation from "../../Components/navigation/Navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import AccountSettingsContent from "../../Components/accountSettingsContent/AccountSettingsContent";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [reservations, setReservations] = useState(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState("Moje bilety"); // domyślny wybór
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userLogin = decodedToken.sub;

    useEffect(() => {
        //jezeli token istnieje
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
            const url = `http://localhost:8090/api/v1/private/userdetails/${userLogin}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setUserData(response.data);
                console.log(response.data);
                console.log("Request succesfull");
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
        }
    }

    const fetchReservations = async () => {
        try {
            const url = `http://localhost:8090/api/v1/private/reservations/${userLogin}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setReservations(response.data);
                console.log(response.data);
                console.log("Request succesfull");
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
        }
    }

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem); // zmiana elementu menu
    }

    const renderContent = () => {

        switch (selectedMenuItem) {
            case "myTickets":
                return (
                    <div className="myTicketsContent">
                        {/* Treść dotycząca biletów */}
                    </div>
                );
            case "toWatch":
                return (
                    <div className="toWatchContent">
                        {/* Treść dotycząca filmów do obejrzenia */}
                    </div>
                );
            case "coupons":
                return (
                    <div className="promotionalCouponsContent">
                        {/* Treść dotycząca kuponów promocyjnych */}
                    </div>
                );
            case "wallet":
                return (
                    <div className="walletContent">
                        {/* Treść dotycząca portfela */}
                    </div>
                );
            case "accountSettings":
                return (
                    <AccountSettingsContent userData={userData} />
                );
            default:
                return null;
        }
    }


    return (
        <>
            <Navigation />
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