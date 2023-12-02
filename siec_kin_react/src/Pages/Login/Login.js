import Footer from "../../Components/footer/Footer";
import Navigation from "../../Components/navigation/Navigation";
import "./Login.css";

const Login = () => {

    return (
        <>
            <Navigation/>
            <div className="loginFormContainer">
                <h1>Logowanie</h1>
                    <form className="loginForm" /*onSubmit={handleSubmit}*/>
                        <div className="loginFormWrapper">
                            <div className="loginFormInputs">
                                <label>
                                    Login
                                    <input type="text" name="login" /*value={formData.login} onChange={handleChange}*//>
                                </label>
                                <label>
                                    Hasło
                                    <input type="text" name="haslo" /*value={formData.haslo} onChange={handleChange}*//>
                                </label>
                            </div>
                            <div className="loginFormButton">
                                <button type="submit">Zaloguj się</button>
                            </div>
                        </div>
                    </form>
            </div>
            <Footer/>
        </>
     );
}

export default Login;