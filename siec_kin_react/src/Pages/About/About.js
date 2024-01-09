import "./About.css";
import Navigation from "../../Components/navigation/Navigation";
import Footer from "../../Components/footer/Footer";

const About = () => {


    return (
        <>
            <Navigation active={"about"} />
            <div className="aboutContainer">
                <div
                    className="aboutTopContainer"
                    style={{ backgroundImage: `linear-gradient(to top, black 8%, transparent 60%), url(http://localhost:8090/images/about/ab1.jpg)` }}
                >
                    <div className="aboutTopWrapper">
                        <div className="aboutInfo">
                            <div className="aboutInfoTitle">
                                <span className="break"></span>
                                <h2>O NAS</h2>
                            </div>
                            <div className="aboutInfoShortContent">
                                <span>Szukamy osób z pozytywnym podejściem do życia, lubiących kontakt z ludźmi i ceniących sobie współpracę, takich, które razem z nami będą tworzyły niepowtarzalną atmosferę naszych kin.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="aboutBottomContainer">
                    <div className="aboutBottomWrapper">
                        <div className="aboutInfoLongContent">
                            <span className="break"></span>
                            <h2>TurboKino to dużo więcej niż tylko kino</h2>
                            <div className="aboutText">
                            Turbokino od lat stoi na czele kinematografii europejskiej. Pierwszy wielosalowy kompleks kinowy w Polsce został przez nich uruchomiony w 1998 roku, od tego czasu determinują najwyższe standardy w budowie i funkcjonowaniu kin w Polsce. Obecnie w sieci kin Turbokino działa 8 kin.
                            <br /><br />
                            Turbokino to znacznie więcej niż zwykłe kino. To miejsce, gdzie oferowane są najważniejsze i najbardziej oczekiwane premiery filmowe, koncerty światowych gwiazd, nocne maratony filmowe, transmisje kluczowych wydarzeń sportowych, opery, balety oraz retransmisje najlepszych spektakli.
                            <br /><br />
                            Turbokino wielokrotnie było wyróżniane na prestiżowych konkursach. Zdobyło nagrody Superbrands oraz Superbrands Created in Poland. Od lat zajmuje pozycję lidera w kategorii "Kina Eventowe" zarówno na rynku polskim, jak i europejskim.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;