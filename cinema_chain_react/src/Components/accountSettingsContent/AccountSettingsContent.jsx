import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AccountSettingsContent.css"

const AccountSettingsContent = ({ userData, token, refreshNavigation }) => {
    const navigate = useNavigate();

    //account deletion
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    }

    const deleteAccount = async (e) => {
        e.preventDefault();
        try {
            const id = userData.userId;
            const url = `http://localhost:8090/api/v1/private/delete-account`;
            const response = await axios.post(url, null, {
                params: {
                    id: id
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                localStorage.clear();
                navigate("/");
            }
        }
        catch (error) {
            if (error.response.status === 403) {
                console.log("Acces denied.");
                localStorage.clear();
                navigate("/login");
            }
        }
    }

    //password change
    const [passwdData, setPasswdData] = useState({
        id: userData.userId,
        oldPassword: '',
        newPassword: '',
        confPassword: ''
    });

    const [passwdChangeStatus, setPasswdChangeStatus] = useState('');

    const changePassword = async (e) => {
        e.preventDefault();
        if (Object.keys(passwdChangeErrors).length === 0) {
            try {
                const token = localStorage.getItem('token');
                const url = "http://localhost:8090/api/v1/private/change-password";
                const response = await axios.post(url, passwdData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setPasswdChangeStatus(response.data);
            }
            catch (error) {
                console.error('Error while sending data: ', error);
            }
        }
        else {
            console.log("Form has errors.");
        }
    }

    const [passwdChangeErrors, setPasswdChangeErrors] = useState({});

    function hasSpecialCharacter(password) {
        const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        return regex.test(password);
    }

    useEffect(() => {
        const passwdErrors = [];

        if (passwdData.newPassword !== passwdData.confPassword) {
            passwdErrors.push("Hasła się nie zgadzają.");
        }
        if (passwdData.newPassword.length < 8) {
            passwdErrors.push("Nowe hasło ma mniej niż 8 znaków.");
        }
        if (!hasSpecialCharacter(passwdData.newPassword)) {
            passwdErrors.push("Nowe hasło nie zawiera znaku specjalnego.");
        }

        setPasswdChangeErrors(passwdErrors);
    }, [passwdData]);

    const handlePasswdChange = (e) => {
        const { name, value } = e.target;
        setPasswdData({
            ...passwdData,
            [name]: value
        });
    }

    //personal data edit
    const [dataEditResponseStatus, setDataEditResponseStatus] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState({
        id: userData.userId,
        name: userData.name,
        surname: userData.surname,
        phone: userData.phone
    });

    const handleEditClick = () => {
        setIsEditing(true);

        setEditedUserData({
            id: userData.userId,
            name: userData.name,
            surname: userData.surname,
            phone: userData.phone,
        });
    };

    const handleDataInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData({
            ...editedUserData,
            [name]: value
        });
    };

    const editPersonalData = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const url = "http://localhost:8090/api/v1/private/change-personal-data";
            const response = await axios.post(url, editedUserData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setDataEditResponseStatus(response.data);
            if (response.status === 200) {
                localStorage.setItem('name', editedUserData.name);
                localStorage.setItem('lastName', editedUserData.surname);
                userData.name = editedUserData.name;
                userData.surname = editedUserData.surname;
                userData.phone = editedUserData.phone;
                refreshNavigation();
            }

        }
        catch (error) {
            if (error.response.status === 403) {
                console.log("Acces denied.");
                localStorage.clear();
                navigate("/login");
            }
        }
    }

    return (
        <>
            <div className="userDataContainer">
                <span className="break"></span>
                <h3>Dane osobowe</h3>
                <div className="userDataInfo">
                    <div className="dataRow gap">
                        <div className="dataName">
                            Imię
                        </div>
                        <div className="data">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    maxLength={50}
                                    value={editedUserData.name}
                                    onChange={handleDataInputChange}
                                />
                            ) : (
                                userData.name
                            )}
                        </div>
                    </div>
                    <div className="dataRow gap">
                        <div className="dataName">
                            Nazwisko
                        </div>
                        <div className="data">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="surname"
                                    maxLength={50}
                                    value={editedUserData.surname}
                                    onChange={handleDataInputChange}
                                />
                            ) : (
                                userData.surname
                            )}
                        </div>
                    </div>
                    <div className="dataRow gap">
                        <div className="dataName">
                            Email
                        </div>
                        <div className="data">
                            {userData.email}
                        </div>
                    </div>
                    <div className="dataRow gap">
                        <div className="dataName">
                            Login
                        </div>
                        <div className="data">
                            {userData.login}
                        </div>
                    </div>
                    <div className="dataRow gap">
                        <div className="dataName">
                            Numer telefonu
                        </div>
                        <div className="data">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    maxLength={9}
                                    minLength={9}
                                    value={editedUserData.phone}
                                    onChange={handleDataInputChange}
                                />
                            ) : (
                                userData.phone
                            )}
                        </div>
                    </div>
                </div>
                {isEditing ? (
                    <>
                        <div className="openedButtons">
                            <button onClick={editPersonalData}>Zapisz</button>
                            <button onClick={() => { setIsEditing(false) }}>Wróć</button>
                        </div>
                        {dataEditResponseStatus && <span>{dataEditResponseStatus}</span>}
                    </>
                ) : (
                    <button onClick={handleEditClick}>Edytuj</button>
                )}
            </div>
            <div className="userDataContainer">
                <span className="break"></span>
                <h3>Zmiana hasła</h3>
                <form onSubmit={changePassword}>
                    <div className="userDataInfo flexColumn">
                        <div className="dataRowPasswd">
                            <div className="passwordText">
                                Aktualne hasło:
                            </div>
                            <input type="password" name="oldPassword" value={passwdData.oldPassword} onChange={handlePasswdChange} placeholder="Aktualne hasło"></input>
                        </div>
                        <div className="dataRowPasswd">
                            <div className="passwordText">
                                Nowe hasło:
                            </div>
                            <input type="password" name="newPassword" value={passwdData.newPassword} onChange={handlePasswdChange} placeholder="Nowe hasło"></input>
                        </div>
                        <div className="dataRowPasswd">
                            <div className="passwordText">
                                Powtórz hasło:
                            </div>
                            <input type="password" name="confPassword" value={passwdData.confPassword} onChange={handlePasswdChange} placeholder="Powtórz hasło"></input>
                        </div>
                    </div>
                    {/* {passwdChangeErrors.confPassword && <span>{passwdChangeErrors.confPassword}</span>}
                    {passwdChangeErrors.newPassword && <span>{passwdChangeErrors.newPassword}</span>} */}
                    <div className="passwdChangeStatus">
                        {passwdChangeErrors.length > 0 && (
                            <>
                                {passwdChangeErrors.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}
                            </>
                        )}
                    </div>
                    <div className="flexColumn passwdSpan">
                        <button className="passwdButton" type="submit">Zmień hasło</button>
                        <span>{passwdChangeStatus}</span>
                    </div>
                </form>
            </div>
            <div className="userDataContainer">
                <span className="break"></span>
                <h3>Usunięcie konta</h3>
                <span>Jeśli usuniesz konto, Twoje dane zostaną bezpowrotnie utracone.</span>
                <button onClick={togglePopup}>Usuń konto</button>
                {/* popup */}
                {isPopupOpen && (
                    <div className="overlay">
                        <div className="popup">
                            <div className="popup-content">
                                <h2>Usuń konto</h2>
                                <p>Twoje dane zostaną bezpowrotnie utracone, kontynuować?</p>
                                <div className="popupButtons">
                                    <button onClick={deleteAccount}>Usuń konto</button>
                                    <button onClick={togglePopup}>Anuluj</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default AccountSettingsContent;