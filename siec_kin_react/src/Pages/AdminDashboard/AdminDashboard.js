import Footer from "../../Components/footer/Footer";
import Navigation from "../../Components/navigation/Navigation";
import "./AdminDashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [selectedMenuItem, setSelectedMenuItem] = useState("cinemas"); // domyślny wybór
    const [modifyUsers, setModifyUsers] = useState(null);
    const [cinemas, setCinemas] = useState(null);
    const [users, setUsers] = useState(null);

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem); // zmiana elementu menu
    }
    const handleUserModification = (menuItem) => {
        if (modifyUsers === menuItem) {
            setModifyUsers(null); // Jeśli klikniesz drugi raz to ukryj
        } else {
            setModifyUsers(menuItem); // Jeśli klikniesz pierwszy raz to pokaż
        }
    }

    const fetchCinemas = async () => {
        try {
            const token = localStorage.getItem('token');

            const url = `http://localhost:8090/api/v1/private/cinemas`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setCinemas(response.data);
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

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');

            const url = `http://localhost:8090/api/v1/private/userdetails`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setUsers(response.data);
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

    useEffect(() => {
        fetchCinemas();
        fetchUsers();
    }, [])

    const renderUserModifyContent = () =>{
        switch (modifyUsers) {
            case "roles":
                return (
                    <span>ELOOOO</span>
                );
            case "ban":
                return (
                    <span>Zablokuj skurwysyna</span>
                );
            case "add":
                return(
                    <span>Dodaj uzytkownika</span>
                );
            default:
                return null;
        }
    }

    const renderContent = () => {
        switch (selectedMenuItem) {
            case "cinemas":
                return (
                        <table>
                            <tr>
                                <th>ID Kina</th>
                                <th>Miasto</th>
                                <th>Ulica</th>
                                <th>Numer budynku</th>
                                <th>Kod pocztowy</th>
                            </tr>
                            {cinemas ? (
                                <>
                                    {cinemas.map((cinema) => {

                                        return (
                                            <tr key={cinema.id_kina}>
                                                <td>{cinema.id_kina}</td>
                                                <td>{cinema.miasto}</td>
                                                <td>{cinema.ulica}</td>
                                                <td>{cinema.numer_budynku}</td>
                                                <td>{cinema.kod_pocztowy}</td>
                                            </tr>
                                        )
                                    })}
                                </>
                            ) : (
                                <p>Brak danych</p>
                            )}
                        </table>
                );
            case "users":
                return (
                    <>
                    <table>
                            <tr>
                                <th>ID Użytkownika</th>
                                <th>Login</th>
                                <th>Hasło</th>
                                <th>Email</th>
                                <th>Imię</th>
                                <th>Nazwisko</th>
                                <th>Numer telefonu</th>
                                <th>Data utworzenia</th>
                                <th>Rola</th>
                                <th>Blokada</th>
                            </tr>
                            {users ? (
                                <>
                                    {users.map((user) => {

                                        return (
                                            <tr key={user.id_uzytkownika}>
                                                <td>{user.id_uzytkownika}</td>
                                                <td>{user.login}</td>
                                                <td>{user.haslo}</td>
                                                <td>{user.email}</td>
                                                <td>{user.imie}</td>
                                                <td>{user.nazwisko}</td>
                                                <td>{user.nr_telefonu}</td>
                                                <td>{user.data_utworzenia}</td>
                                                <td>{user.role}</td>
                                                <td>{user.blokada}</td>
                                            </tr>
                                        )
                                    })}
                                </>
                            ) : (
                                <p>Brak danych</p>
                            )}
                        </table>

                        <button onClick={() => handleUserModification("add")}>Dodaj użytkownika</button>
                        <button onClick={() => handleUserModification("roles")}>Zmień uprawnienia</button>
                        <button onClick={() => handleUserModification("ban")}>Zablokuj konto</button>
                        {renderUserModifyContent()}
                        </>
                );
            case "placeholder":
                return (
                    <div className="placeholder">
                        siema
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <>
            <Navigation/>
            <div className="mainContainer">
                <div className="leftContainer">
                    <ul className="menu">
                        <li onClick={() => handleMenuItemClick("cinemas")}>Kina</li>
                        <li onClick={() => handleMenuItemClick("users")}>Użytkownicy</li>
                        <li onClick={() => handleMenuItemClick("placeholder")}>Klienci</li>
                        <li onClick={() => handleMenuItemClick("placeholder")}>Pracownicy</li>
                        <li onClick={() => handleMenuItemClick("placeholder")}>Administratorzy</li>
                    </ul>
                </div>
                <div className="rightContainer">
                    <div className="mainContent">
                        {renderContent()}
                    </div>
                </div>
            </div>

            <Footer/>
        </>
     );
}

export default AdminDashboard;