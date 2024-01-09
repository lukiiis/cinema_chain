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
                            <h2>Multikino to dużo więcej niż tylko kino</h2>
                            <div className="aboutText">
                                Multikino, należące do Grupy Vue International – lidera na europejskim rynku kinowym, to pierwszy operator, który w 1998 roku uruchomił w Polsce multipleks. Od tego czasu wyznacza najwyższe standardy w budowie i prowadzeniu kin w Europie i na świecie. Obecnie w spółce Multikino pod szyldem Multikino działa 45 kin w 37 miastach z łączną liczbą 323 ekranów.
                                <br /><br />
                                Flagowe kino sieci zlokalizowane jest w centrum handlowym Złote Tarasy w Warszawie. Obiekt składa się z 8 sal, w tym Sali Premierowej na 788 osób. W marcu 2022r. uruchomione zostało wyjątkowe kino w Galerii Gemini Park w Tychach. Obiekt składa się z 7 sal wyposażonych w projektory laserowe oraz skórzane, elektrycznie rozkładane fotele, dzięki którym widz ogląda filmy w pozycji półleżącej. W rozkładane fotele tego typu w pełni wyposażone są także warszawskie Multikino w Galerii Młociny, Multikino Koszalin oraz poznańskie Multikina: Stary Browar i Malta.
                                <br /><br />
                                Multikino to zdecydowanie więcej niż kino. Oferuje zarówno największe i najbardziej oczekiwane premiery filmowe, jak i koncerty światowych gwiazd, nocne maratony filmowe, transmisje najważniejszych wydarzeń sportowych, transmisje oper, baletu oraz retransmisje spektakli z brytyjskiego National Theatre.
                                <br /><br />
                                Multikino za swoją działalność wielokrotnie było dostrzegane podczas prestiżowych konkursów. Jest zdobywcą nagród Superbrands oraz Superbrands Created in Poland. Od wielu lat zajmuje pozycję lidera w obszarze „Event Cinema” zarówno na rynku polskim, jak i europejskim (laureat europejskiej nagrody ECA Awards w 2014 roku).
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