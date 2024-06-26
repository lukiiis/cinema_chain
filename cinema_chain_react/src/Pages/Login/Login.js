import { useState, useEffect } from "react";
import Footer from "../../Components/footer/Footer";
import Navigation from "../../Components/navigation/Navigation";
import "./Login.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [loginStatus, setLoginStatus] = useState("")
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    })

    const [errors, setErrors] = useState({});
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
                if(response.data.status === "Account is blocked."){
                    localStorage.clear();
                    setLoginStatus("Konto jest zablokowane.");
                    return;
                }
                else{
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

                    if(response.data.role === "USER"){
                        setLoginStatus("Logowanie pomyślne.");
                        setTimeout(() => {
                            navigate("/dashboard");
                        }, 1000);
                    }
                    else if(response.data.role === "ADMIN"){
                        setLoginStatus("Logowanie pomyślne.");
                        setTimeout(() => {
                            navigate("/admin-dashboard");
                        }, 1000);
                    }
                    else if(response.data.role === "WORKER"){
                        setLoginStatus("Logowanie pomyślne.");
                        setTimeout(() => {
                            navigate("/employee-dashboard");
                        }, 1000);
                    }
                }
            }
            catch (error) {
                if(error.response.status===403){
                    setLoginStatus("Nie istnieje takie konto");
                }
            }
        }
        else {
            setLoginStatus("Niektóre pola formularza są puste");
        }
    }

    return (
        <>
            <Navigation />

            <div className="loginFormContainer">
                <div className="loginFormBorder">
                    
                        <h1>Logowanie</h1>
                        <form className="loginForm" onSubmit={handleSubmit}>
                            <div className="loginFormWrapper">
                                <div className="loginFormInputs">
                                    <label>
                                        Login
                                        <input type="text" name="login" value={formData.login} onChange={handleChange} /> 
                                    </label>
                                    <label>
                                        Hasło
                                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                                    </label>
                                </div>
                                <div className="loginFormButton">
                                    <button type="submit">Zaloguj się</button>
                                </div>
                                
                            </div>
                            <div className="loginStatus">
                                {loginStatus && <span>{loginStatus}</span>}
                            </div>
                        </form>

                </div>
            </div>

            <Footer />
        </>
    );
}

export default Login;