import Footer from "../../Components/footer/Footer";
import Navigation from "../../Components/navigation/Navigation";
import "./AdminDashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [selectedMenuItem, setSelectedMenuItem] = useState("cinemas");
    const [modifyUsers, setModifyUsers] = useState(null);
    const [cinemas, setCinemas] = useState(null);
    const [users, setUsers] = useState(null);
    const [clients, setClients] = useState(null);
    const [admins, setAdmins] = useState(null);
    const [employees, setEmployees] = useState(null);
    const [blockId, setBlockId] = useState(null);
    const [blockStatus, setBlockStatus] = useState('');

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    }
    const handleUserModification = (menuItem) => {
        if (modifyUsers === menuItem) {
            setModifyUsers(null);
        } else {
            setModifyUsers(menuItem);
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
    
    const fetchClients = async () => {
        try {
            const token = localStorage.getItem('token');

            const url = `http://localhost:8090/api/v1/private/clients`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setClients(response.data);
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
    const fetchAdmins = async () => {
        try {
            const token = localStorage.getItem('token');

            const url = `http://localhost:8090/api/v1/private/admins`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setAdmins(response.data);
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
    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token');

            const url = `http://localhost:8090/api/v1/private/employees`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setEmployees(response.data);
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
            if(response.data === "User has been unblocked.")
                setBlockStatus("Użytkownik został odblokowany");
            else if(response.data === "User has been blocked.")
                setBlockStatus("Użytkownik został zablokowany.");

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

    //dodawanie pracowników
    const [addEmployeeData, setAddEmployeeData] = useState({
        login: '',
        passwd: '',
        email: '',
        name: '',
        surname: '',
        phone: '',
        position: '',
        cinemaId: ''
    })

    const [addEmployeeStatus, setAddEmployeeStatus] = useState('');

    const [errors, setErrors] = useState({});
    
    function hasSpecialCharacter(password) {
        const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        return regex.test(password);
    }

    useEffect(() => {
        const validationErrors = [];

        if (!addEmployeeData.login) {
            validationErrors.login = "Pole wymagane";
        }
        if (addEmployeeData.passwd.length < 8) {
            validationErrors.push("Hasło ma mniej niż 8 znaków.");
        }
        if (!hasSpecialCharacter(addEmployeeData.passwd)) {
            validationErrors.push("Hasło nie zawiera znaku specjalnego.");
        }

        setErrors(validationErrors);
    }, [addEmployeeData]);

    const addEmployee = async (e) => {
        e.preventDefault();
        if(Object.keys(errors).length === 0){
            try{
                const token = localStorage.getItem('token');
                const response = await axios.post("http://localhost:8090/api/v1/private/add-employee", addEmployeeData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if(response.status===200){
                    
                    if(response.data === "Podany adres e-mail oraz login są zajęte."){
                        setAddEmployeeStatus(response.data);
                    }
                    if(response.data === "Podany login jest zajęty"){
                        setAddEmployeeStatus(response.data);
                    }
                    if(response.data === "Podany adres e-mail jest zajęty."){
                        setAddEmployeeStatus(response.data);
                    }
                    if(response.data === "Podany numer telefonu jest zajęty."){
                        setAddEmployeeStatus(response.data);
                    }
                    if(response.data === "Pole w formularzu jest puste."){
                        setAddEmployeeStatus(response.data);
                    }
                    else{
                        setAddEmployeeStatus("Rejestracja pracownika przebiegła pomyślnie");
                        fetchEmployees();
                    }
                }
            }
            catch (error){
                console.error("Access forbidden,", error);
                localStorage.clear();
                 navigate("/");
            }
        }
        else{
            setAddEmployeeStatus("Formularz zawiera błędy, ponów próbę.");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddEmployeeData({
            ...addEmployeeData,
            [name]: value
        });
    }




    useEffect(() => {
        if(localStorage.getItem('role') !== "ADMIN"){
            console.log("guwno")
            console.log(localStorage.getItem('role'))
            navigate("/");
        }
        else{
            fetchCinemas();
            fetchUsers();
            fetchClients();
            fetchAdmins();
            fetchEmployees();
        }
    }, [])

    const renderUserModifyContent = () =>{
        switch (modifyUsers) {
            case "ban":
                return (
                    <div className="formContainer">
                        <form className="blockForm" onSubmit={blockAccount}>
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
                            {blockStatus && <span>{blockStatus}</span>}
                        </form>
                    </div>
                );
            case "add":
                return(
                    <div className="formContainer">
                        <form className="adminForm" onSubmit={addEmployee}>
                        <div className="formInputs">
                                <label>
                                    Login
                                    <input type="text" name="login" value={addEmployeeData.login} onChange={handleChange} />
                                </label>
                                <label>
                                    Hasło
                                    <input type="password" name="passwd" value={addEmployeeData.passwd} onChange={handleChange} />
                                    {errors.length > 0 && (
                                        <div className="passwdErrors">
                                            {errors.map((error, index) => (
                                                <span key={index}>{error}</span>
                                            ))}
                                        </div>
                                    )}
                                </label>
                                <label>
                                    E-mail
                                    <input type="email" name="email" value={addEmployeeData.email} onChange={handleChange} />
                                </label>
                                <label>
                                    Numer telefonu
                                    <input type="number" name="phone" value={addEmployeeData.phone} onChange={handleChange} />
                                </label>
                                <label>
                                    Imię
                                    <input type="text" name="name" value={addEmployeeData.name} onChange={handleChange} />
                                </label>
                                <label>
                                    Nazwisko
                                    <input type="text" name="surname" value={addEmployeeData.surname} onChange={handleChange} />
                                </label>
                                <label>
                                    Stanowisko
                                    <input type="text" name="position" value={addEmployeeData.position} onChange={handleChange} />
                                </label>
                                <label>
                                    ID Kina
                                    <input type="text" name="cinemaId" value={addEmployeeData.cinemaId} onChange={handleChange} />
                                </label>
                            </div>
                            <button type="submit">Dodaj</button>
                        </form>
                        {addEmployeeStatus && <span>{addEmployeeStatus}</span>}
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
                                                <td style={{maxWidth:'120px', overflow:'hidden', textOverflow:'ellipsis'}}>{user.passwd}</td>
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
                            <button onClick={() => handleUserModification("add")}>Dodaj pracownika</button>
                            <button onClick={() => handleUserModification("ban")}>Zablokuj lub odblokuj konto</button>
                        </div>
                        {renderUserModifyContent()}
                        </>
                );
            case "clients":
                return (
                    <table>
                        <tr>
                            <th>ID Klienta</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Email</th>
                            <th>Numer telefonu</th>
                            <th>Liczba rezerwacji</th>
                        </tr>
                        {clients ? (
                            <>
                                {clients.map((client) => {

                                    return (
                                        <tr key={client.clientId}>
                                            <td>{client.clientId}</td>
                                            <td>{client.user.name}</td>
                                            <td>{client.user.surname}</td>
                                            <td>{client.user.email}</td>
                                            <td>{client.user.phone}</td>
                                            <td>{client.reservationCount}</td>
                                        </tr>
                                    )
                                })}
                            </>
                        ) : (
                            <p>Brak danych</p>
                        )}
                    </table>
                );
            case "employees":
                return (
                    <table>
                        <tr>
                            <th>ID Pracownika</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Email</th>
                            <th>Numer telefonu</th>
                            <th>Stanowisko</th>
                            <th>Kino</th>
                        </tr>
                        {employees ? (
                            <>
                                {employees.map((emp) => {

                                    return (
                                        <tr key={emp.employeeId}>
                                            <td>{emp.employeeId}</td>
                                            <td>{emp.user.name}</td>
                                            <td>{emp.user.surname}</td>
                                            <td>{emp.user.email}</td>
                                            <td>{emp.user.phone}</td>
                                            <td>{emp.position}</td>
                                            <td>{emp.cinema.city}, {emp.cinema.street}</td>
                                        </tr>
                                    )
                                })}
                            </>
                        ) : (
                            <p>Brak danych</p>
                        )}
                    </table>
                );
            case "admins":
                return (
                    <table>
                        <tr>
                            <th>ID Administratora</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Email</th>
                            <th>Numer telefonu</th>
                            <th>Data utworzenia</th>
                        </tr>
                        {admins ? (
                            <>
                                {admins.map((admin) => {

                                    return (
                                        <tr key={admin.adminId}>
                                            <td>{admin.adminId}</td>
                                            <td>{admin.user.name}</td>
                                            <td>{admin.user.surname}</td>
                                            <td>{admin.user.email}</td>
                                            <td>{admin.user.phone}</td>
                                            <td>{admin.user.createDate}</td>
                                        </tr>
                                    )
                                })}
                            </>
                        ) : (
                            <p>Brak danych</p>
                        )}
                    </table>
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
                        <li onClick={() => handleMenuItemClick("clients")}>Klienci</li>
                        <li onClick={() => handleMenuItemClick("employees")}>Pracownicy</li>
                        <li onClick={() => handleMenuItemClick("admins")}>Administratorzy</li>
                    </ul>
                </div>
                <div className="rightContainer">
                    <div className="mainContent">
                        {renderContent()}
                    </div>
                </div>
            </div>

        </>
     );
}

export default AdminDashboard;