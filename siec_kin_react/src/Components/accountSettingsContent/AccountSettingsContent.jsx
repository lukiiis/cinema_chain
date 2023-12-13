import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AccountSettingsContent.css"

const AccountSettingsContent = ({ userData }) => {

    return (
        <>
            <div className="userDataContainer">
                <h5>Dane osobowe</h5>
                <div className="userDataInfo">
                    <div className="dataRow gap">
                        <div className="dataName">
                            Imię
                        </div>
                        <div className="data">
                            {userData.imie}
                        </div>
                    </div>
                    <div className="dataRow gap">
                        <div className="dataName">
                            Nazwisko
                        </div>
                        <div className="data">
                            {userData.nazwisko}
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
                            {userData.nr_telefonu}
                        </div>
                    </div>
                    <div className="dataRow gap">
                        <div className="dataName">
                            Data założenia konta
                        </div>
                        <div className="data">
                            {userData.data_utworzenia}
                        </div>
                    </div>
                </div>
                <button>Edytuj</button>
            </div>
            <div className="userDataContainer">
                <h5>Zmiana hasła</h5>
                <div className="userDataInfo flexColumn">
                    <div className="dataRowPasswd">
                        <div className="passwordText">
                            Aktualne hasło
                        </div>
                        <input type="password" placeholder="Aktualne hasło"></input>
                    </div>
                    <div className="dataRowPasswd">
                        <div className="passwordText">
                            Nowe hasło
                        </div>
                        <input type="password" placeholder="Nowe hasło"></input>
                    </div>
                </div>
                <button>Zmień hasło</button>
            </div>
            <div className="userDataContainer">
                <h5>Usunięcie konta</h5>
                <span>Jeśli usuniesz konto, Twoje dane zostaną bezpowrotnie utracone.</span>
                <button>Usuń konto</button>
            </div>
        </>
    );
}

export default AccountSettingsContent;