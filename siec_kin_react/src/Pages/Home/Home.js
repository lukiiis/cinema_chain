import FilmCarousel from "../../Components/filmCarousel/FilmCarousel";
import SearchBar from "../../Components/searchBar/SearchBar";
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home(){
    return(
        <>
            <FilmCarousel />
            <SearchBar  />
        </>
    )
}