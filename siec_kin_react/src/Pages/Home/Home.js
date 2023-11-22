import FilmCarousel from "../../Components/FilmCarousel";

export default function Home(){

    const [movies, setMovies] = useState();

    const getMovies = () =>{
        axios.get('http://localhost:8090/api/v1/film').then(
            response => {
                setMovies(response.data)
                console.log(response.data)
            }
        ).catch(err =>{
            console.log('nie dziala')
        })
    }
    return(
        <FilmCarousel />
        <div>
            <button onClick={getMovies}>poka filmy</button>
        </div>
    )
