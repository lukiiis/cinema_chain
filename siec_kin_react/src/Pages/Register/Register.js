import React, {useState, useEffect} from "react";
import "./Register.css";
import Navigation from "../../Components/navigation/Navigation.jsx";
import Footer from "../../Components/footer/Footer.jsx";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        login: '',
        haslo: '',
        email: '',
        imie: '',
        nazwisko: '',
        nr_telefonu: ''
    })


    const [errors, setErrors] = useState({});
    //walidacja danych
    useEffect(() => {
        const validationErrors ={};

        if(!formData.login){
            validationErrors.login = "Pole wymagane";
        }

        setErrors(validationErrors);
    }, [formData]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(Object.keys(errors).length === 0){
            try{
                const response = await axios.post("http://localhost:8090/api/v1/register/uzytkownik", formData);
                //Tutaj wstawic na fronta wiadomosc od backendu, czy udalo sie zarejestrowac pomyslnie
                console.log('Server response: ', response.data);
            }
            catch (error){
                console.error('Error while sending data: ', error);
            }
        }
        else{
            //tutaj wyslac cos na ekran, ze dane bledne
            console.log('Form has errors, cannot submit.');
        }
    }

    return (
        <>
            <Navigation/>
            <div className="formContainer">
                <h1>Rejestracja nowego konta</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="formWrapper">
                            <div className="formInputs">
                                <label>
                                    Login
                                    <input type="text" name="login" value={formData.login} onChange={handleChange}/>
                                    {errors.login && <span>{errors.login}</span>}
                                </label>
                                <label>
                                    Hasło
                                    <input type="password" name="haslo" value={formData.haslo} onChange={handleChange}/>
                                    {errors.haslo && <span>{errors.haslo}</span>}
                                </label>


                                <label>
                                    E-mail
                                    <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                                    {errors.email && <span>{errors.email}</span>}
                                </label>
                                <label>
                                    Numer telefonu
                                    <input type="number" name="nr_telefonu" value={formData.nr_telefonu} onChange={handleChange}/>
                                    {errors.nr_telefonu && <span>{errors.nr_telefonu}</span>}
                                </label>


                                <label>
                                    Imię
                                    <input type="text" name="imie" value={formData.imie} onChange={handleChange}/>
                                    {errors.imie && <span>{errors.imie}</span>}
                                </label>
                                <label>
                                    Nazwisko
                                    <input type="text" name="nazwisko" value={formData.nazwisko} onChange={handleChange}/>
                                    {errors.nazwisko && <span>{errors.nazwisko}</span>}
                                </label>
                            </div>
                            <div className="formButton">
                                <button type="submit">Zarejestruj się</button>
                            </div>
                        </div>
                    </form>
                </div>
            <Footer/>
        </>
     );
}

export default Register;