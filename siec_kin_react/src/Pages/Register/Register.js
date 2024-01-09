import React, { useState, useEffect } from "react";
import "./Register.css";
import Navigation from "../../Components/navigation/Navigation.jsx";
import Footer from "../../Components/footer/Footer.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        login: '',
        haslo: '',
        email: '',
        imie: '',
        nazwisko: '',
        nr_telefonu: ''
    })

    const [registerStatus, setRegisterStatus] = useState(null);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/dashboard");
        }
    }, [])

    //walidacja danych
    useEffect(() => {
        const validationErrors = {};

        if (!formData.login) {
            validationErrors.login = "Pole wymagane";
        }

        setErrors(validationErrors);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("http://localhost:8090/api/v1/public/auth/register", formData);
                //Tutaj wstawic na fronta wiadomosc od backendu, czy udalo sie zarejestrowac pomyslnie
                console.log('Server response: ', response);
                if(response.status===200){
                    setRegisterStatus(response.data.status);
                }
            }
            catch (error) {
                console.error('Error while sending data: ', error);
            }
        }
        else {
            //tutaj wyslac cos na ekran, ze dane bledne
            console.log('Form has errors, cannot submit.');
            setRegisterStatus("Formularz zawiera błędy.");
        }
    }

    return (
        <>
            <Navigation />
            <div className="registerFormContainer">
                <div className="formBorder">
                    <h1>Rejestracja</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="formWrapper">
                            <div className="formInputs">
                                <label>
                                    Login
                                    <input type="text" name="login" value={formData.login} onChange={handleChange} />
                                    {errors.login && <span>{errors.login}</span>}
                                </label>
                                <label>
                                    Hasło
                                    <input type="password" name="passwd" value={formData.passwd} onChange={handleChange} />
                                    {errors.passwd && <span>{errors.passwd}</span>}
                                </label>
                                <label>
                                    E-mail
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                                    {errors.email && <span>{errors.email}</span>}
                                </label>
                                <label>
                                    Numer telefonu
                                    <input type="number" name="phone" value={formData.phone} onChange={handleChange} />
                                    {errors.phone && <span>{errors.phone}</span>}
                                </label>
                                <label>
                                    Imię
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                                    {errors.name && <span>{errors.name}</span>}
                                </label>
                                <label>
                                    Nazwisko
                                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
                                    {errors.surname && <span>{errors.surname}</span>}
                                </label>
                            </div>
                            <div className="formButton">
                                <button type="submit">Zarejestruj się</button>
                            </div>
                        </div>
                        <div className="registerStatus">
                                {registerStatus && <span>{registerStatus}</span>}
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Register;