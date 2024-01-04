import { useState, useEffect } from "react";
import Footer from "../../Components/footer/Footer";
import Navigation from "../../Components/navigation/Navigation";
import "./Login.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    })

    const [errors, setErrors] = useState({});
    //walidacja danych
    useEffect(() => {
        const validationErrors = {};

        if (!formData.login) {
            validationErrors.login = "Pole wymagane";
        }
        if (!formData.password) {
            validationErrors.password = "Pole wymagane";
        }

        setErrors(validationErrors);
    }, [formData]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/dashboard");
        }
    }, [])

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
                const response = await axios.post("http://localhost:8090/api/v1/public/auth/login", formData);
                console.log('Server response: ', response.data);

                Object.keys(response.data).forEach(resData => {
                    if (typeof response.data[resData] === "object") {
                        Object.keys(response.data[resData]).forEach(resDataInner => {
                            localStorage.setItem("" + resDataInner + "", response.data[resData][resDataInner]);
                        })
                    }
                    else {
                        localStorage.setItem("" + resData + "", response.data[resData]);
                    }

                });
                // const jwtToken = localStorage.getItem('token');
                // const decodedJwt = jwtDecode(jwtToken);
                // if(!jwtToken && decodedJwt.exp * 1000 < new Date().getTime()){
                //     console.log("Token expired.");
                //     localStorage.setItem("authenticated", false);
                //     localStorage.removeItem('token');
                // }
                // else{
                //     console.log("Token valid.");
                //     localStorage.setItem("authenticated", true);
                //     //redirect na inną stronę (zapewne na dashboard uzytkownika)
                //     navigate("/dashboard");
                // }
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);

                console.log(localStorage);
            }
            catch (error) {
                console.error('Error while sending data: ', error);
            }
        }
        else {
            console.log('Form is empty');
        }
    }

    return (
        <>
            <Navigation />
            <div className="loginFormContainer">
                <h1>Logowanie</h1>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <div className="loginFormWrapper">
                        <div className="loginFormInputs">
                            <label>
                                Login
                                <input type="text" name="login" value={formData.login} onChange={handleChange} />
                                {errors.login && <span>{errors.login}</span>}
                            </label>
                            <label>
                                Hasło
                                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                                {errors.password && <span>{errors.password}</span>}
                            </label>
                        </div>
                        <div className="loginFormButton">
                            <button type="submit">Zaloguj się</button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Login;