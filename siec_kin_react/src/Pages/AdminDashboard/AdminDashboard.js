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
    const [blockId, setBlockId] = useState(null);

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

    const blockAccount = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem('token');

            const url = "http://localhost:8090/api/v1/private/block-unblock/" + blockId;
            const response = await axios.post(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response);
            fetchUsers();
        }
        catch (error) {
            console.error("Error while sending data", error);
            if(error.response.status === 403){
                console.log("Token expired. Log in to proceed.");
                localStorage.clear();
                navigate("/");
            }
        }
    }

    const addUser = async (e) => {
        e.preventDefault();
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
                    <div className="formContainer">
                        <form onSubmit={blockAccount}>
                            <label>
                                Podaj ID użytkownika, którego chcesz zablokować lub odblokować:
                                <input 
                                type="number" 
                                placeholder="ID użytkownika"
                                value={blockId}
                                onChange={(event) => setBlockId(event.target.value)}
                                />
                            </label>
                            <button type="submit">Zablokuj/Odblokuj</button>
                        </form>
                    </div>
                );
            case "add":
                return(
                    <div className="formContainer">
                        <form onSubmit={addUser}>

                        </form>
                    </div>
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
                                            <tr key={cinema.cinemaId}>
                                                <td>{cinema.cinemaId}</td>
                                                <td>{cinema.city}</td>
                                                <td>{cinema.street}</td>
                                                <td>{cinema.building_number}</td>
                                                <td>{cinema.zip_code}</td>
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
                                            <tr key={user.userId}>
                                                <td>{user.userId}</td>
                                                <td>{user.login}</td>
                                                <td>{user.passwd}</td>
                                                <td>{user.email}</td>
                                                <td>{user.name}</td>
                                                <td>{user.surname}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.createDate}</td>
                                                <td>{user.role}</td>
                                                <td>{(()=>{
                                                    if(user.blockade === false){
                                                        return(
                                                            <span>NIE</span>
                                                        )
                                                    }
                                                    else{
                                                        return(
                                                            <span>TAK</span>
                                                        )
                                                    }
                                                    
                                                })()}</td>
                                            </tr>
                                        )
                                    })}
                                </>
                            ) : (
                                <p>Brak danych</p>
                            )}
                        </table>
                        <div className="buttons">
                            <button onClick={() => handleUserModification("add")}>Dodaj użytkownika</button>
                            <button onClick={() => handleUserModification("roles")}>Zmień uprawnienia</button>
                            <button onClick={() => handleUserModification("ban")}>Zablokuj lub odblokuj konto</button>
                        </div>
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
                        <li onClick={() => handleMenuItemClick("users")}>Konta użytkowników</li>
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