// import Zapowiedzi from "../../Components/zapowiedzi/Zapowiedzi.jsx";
import Aktualnosci from "../../Components/aktualnosci/Aktualnosci.jsx";
import Navigation from "../../Components/navigation/Navigation.jsx";
import Footer from "../../Components/footer/Footer.jsx";
import "./Home.css";

const Home = () => {
    return(
        <>
            <Navigation active={"home"}/>
            {/* <Zapowiedzi/> */}
            <Aktualnosci/>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Footer/>
        </>
    )
}
export default Home;