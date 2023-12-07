import Navigation from "../../Components/navigation/Navigation.jsx";
import Footer from "../../Components/footer/Footer.jsx";
import Teasers from "../../Components/teasers/Teasers.jsx";
import HomeNews from "../../Components/homeNews/HomeNews.jsx";
import "./Home.css";

const Home = () => {
    return(
        <>
            <Navigation active={"home"}/>
            {/* <Aktualnosci/> */}
            <HomeNews/>
            <Teasers/>
            <Footer/>
        </>
    )
}
export default Home;