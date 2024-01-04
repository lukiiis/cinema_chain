import { useState, useEffect } from "react";
import axios from "axios";
import "./Reservation.css";




export default function Reservation(){
    const [halls, setHalls] = useState([]);
    const [seats, setSeats] = useState([]);

      useEffect(() => {
        const url = 'http://localhost:8090/api/v1/sala/' + 1;
        const getHalls = async () => {
          axios.get(url).then(
            response => {
              setHalls(response.data)
              console.log(response.data)
            }
          ).catch(err => {
            console.log('nie dziala')
          })
        }
        getHalls();
      }, []);


    return(
        <div>
            guwno
        </div>
    )
    
}