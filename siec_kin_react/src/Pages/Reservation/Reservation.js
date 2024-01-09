import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Reservation.css";
import { useLocation } from 'react-router-dom';
import React from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Components/navigation/Navigation.jsx";
import Footer from "../../Components/footer/Footer.jsx";


export default function Reservation() {
  const navigate = useNavigate();
  const [halls, setHalls] = useState([]);
  const [seats, setSeats] = useState([]);
  const [userID, setUserID] = useState(null);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [show, setShow] = useState(null);
  const [res, setRes] = useState({});
  const [errors, setErrors] = useState({})
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isMovieModifyContentVisible, setMovieModifyContentVisible] = useState(false);
  const [Price, setPrice] = useState(0);
  const [clickedSeats, setClickedSeats] = useState([]);
  const location = useLocation();
  const seansID = location.state?.seansID;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
  }

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [])
  const handleRedirect = () => {
    const newPath = '/';
    navigate(newPath);
  };

  const fetchUserData = async () => {
    try {
      const decodedToken = jwtDecode(token);
      const userLogin = decodedToken.sub;

      const url = `http://localhost:8090/api/v1/private/userdetails/${userLogin}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        setUserID(response.data.client.clientId);
      }
      else {
        console.log("unexpected error", response.status);
      }
    }
    catch (error) {
      console.error("Error while fetching data", error);
      if (error.response.status === 403) {
        console.log("Access denied.");
        localStorage.clear();
        navigate("/login");
      }
    }
  }
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    seatNumber: null,
    seatRow: '',
    clientID: userID,
    showID: seansID,
    ticketType: 'normalny',
    price: '',
    seatID: ''
  })



  useEffect(() => {
    const url = 'http://localhost:8090/api/v1/seans/' + seansID;
    const getShow = async () => {
      axios.get(url).then(
        response => {
          setShow(response.data)
        }
      ).catch(err => {
        console.log('Access denied')
      })
    }
    getShow();
  }, []);

  useEffect(() => {
    const url = 'http://localhost:8090/api/v1/public/reservations/reservedSeats/' + seansID;
    const getReservedSeats = async () => {
      axios.get(url).then(
        response => {
          setReservedSeats(response.data)
        }
      ).catch(err => {
        console.log('Access denied')
      })
    }
    getReservedSeats();
  }, []);



  useEffect(() => {
    if (show) {
      show.cinema.screeningRooms.forEach(element => {
        if (element.screeningRoomId == show.screeningRoomId) {
          setSeats(element.seats)
        }
      });
    }
  }, [show])

  const handleChange = async (name, value) => {
    await setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value
      };
    });
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }



  const handleSubmit = async (e) => {
    if(localStorage.getItem('role') === "ADMIN" || localStorage.getItem('role') === "WORKER"){
      console.log('Tylko klienci mogą rezerwować bilety');
      return;
    }

    e.preventDefault();
    for (const element of clickedSeats) {
      const formDataToSend = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        purchaseDate: new Date().toISOString().split('T')[0],
        seatNumber: null,
        seatRow: '',
        clientID: userID,
        showID: seansID,
        ticketType: formData.ticketType,
        price: formData.price,
        seatID: ''
      }
      formDataToSend.seatNumber = element.id_miejsca
      formDataToSend.seatRow = element.id_rzedu
      formDataToSend.seatID = element.id
      sendData(formDataToSend);
    }
  };

  const sendData = async (data) => {
    if (data.seatNumber != null) {
      if (Object.keys(errors).length === 0) {
        try {
          const response = await axios.post("http://localhost:8090/api/v1/public/addReservation", data);
          setRes(response.data);
        }
        catch (error) {
          console.error('Error while sending data: ', error);
        }
      }
      else {
        console.log('Form has errors, cannot submit.');
      }
    }
  }



  // grupuje miejsca wg rzędów
  const rowSeats = seats.reduce((acc, seat) => {
    const row = seat.row;

    if (!acc[row]) {
      acc[row] = [];
    }

    acc[row].push(seat);
    return acc;
  }, {});



  const rowY = Object.keys(rowSeats);

  const handleClick = (idMiejsca, idRzedu, realIdMiejsca) => {
    const miejsceIndex = clickedSeats.findIndex(({ id_miejsca, id_rzedu, id }) => id_miejsca === idMiejsca && id_rzedu === idRzedu && id === realIdMiejsca);

    if (miejsceIndex === -1) {
      setPrice((prevPrice) => prevPrice + formData.price);

      setClickedSeats([...clickedSeats, { id_miejsca: idMiejsca, id_rzedu: idRzedu, id: realIdMiejsca }]);
    } else {
      const newClickedSeats = [...clickedSeats];
      newClickedSeats.splice(miejsceIndex, 1);
      setPrice((prevPrice) => prevPrice - formData.price);
      setClickedSeats(newClickedSeats);
    }
  };

  useEffect(() => {

    if (formData.ticketType === 'ulgowy') {
      setFormData(prevFormData => ({
        ...prevFormData,
        price: 20
      }));
    }
    if (formData.ticketType === 'normalny') {
      setFormData(prevFormData => ({
        ...prevFormData,
        price: 30
      }));
    }
  }, [formData.ticketType])

  useEffect(() => {
    setPrice((prevPrice) => clickedSeats.length * formData.price)
  }, [formData.price])

  useEffect(() => {
  }, [clickedSeats])


  const handleButtonClick = () => {
    if (clickedSeats.length > 0) {

      setMovieModifyContentVisible(true);
    }
    else {
      return (
        <div>
          Wybierz miejsca
        </div>
      )
    }
  };

  const handleButtonPayment = (method) => {
    setPaymentMethod(method)
  }

  const renderMovieModifyContent = () => {
    return (
      <div className="ReservationformWrapper">
        <h4>Wypełnij dane by kontynuować</h4>
        <div className="formInputs">
          <label >
            Imię
            <input className="input-reservation" type="text" name="firstName" value={formData.firstName} onChange={(e) => { handleChangeInput(e) }} />
            {errors.login && <span>{errors.login}</span>}
          </label>
          <label>
            Nazwisko
            <input className="input-reservation" type="text" name="lastName" value={formData.lastName} onChange={(e) => { handleChangeInput(e) }} />
            {errors.haslo && <span>{errors.haslo}</span>}
          </label>
          <label>
            Nr telefonu
            <input className="input-reservation" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={(e) => { handleChangeInput(e) }} />
            {errors.email && <span>{errors.email}</span>}
          </label>
          <label>
            Email
            <input className="input-reservation" type="email" name="email" value={formData.email} onChange={(e) => { handleChangeInput(e) }} />
            {errors.nr_telefonu && <span>{errors.nr_telefonu}</span>}
          </label>
        </div>
        <div className="payment-methods">
          <div>
          Wybierz metodę płatności:
          <div className="paymentMethod" onClick={() => handleButtonPayment("Blik")}>BLIK</div>
          <div onClick={() => handleButtonPayment("Przelew")}>Przelew</div>
          </div>
          <div>
          <h2 className="chosenMethod">Wybrana metoda platności:</h2>
          <h2> {paymentMethod}</h2>
          </div>

        </div>
        <div className="formButton">
          <button className="makePaymentButton" type="submit" onClick={(e) => {handleSubmit(e); togglePopup();}}>Zapłać</button>
        </div>
      </div>
    );
  }






  return (
    <>
      <Navigation />
    <div className="reservation-body">
    <h4 className="headlineText">Wybierz miejsca</h4>
      <div className="hall-ticket-container">
        <div className="cinema-hall">
          <div className="row">
            {rowY.map((row) => (
              <div key={row} className="row-block">
                {rowSeats[row].map((miejsce, index, array) => (
                  <React.Fragment key={miejsce.seatId}>
                    <div
                      className={`seat-block ${index === 1 || index === array.length - 3 ? 'path' : ''
                        } ${clickedSeats.some(
                          (obj) =>
                            obj.id_miejsca === miejsce.number &&
                            obj.id_rzedu === miejsce.row
                        )
                          ? 'selected'
                          : ''
                        } ${reservedSeats.some(
                          (reservedPlace) =>
                            reservedPlace.seatId === miejsce.seatId
                        )
                          ? 'reserved'
                          : ''
                        }`}
                      onClick={() => {
                        if (
                          !reservedSeats.some(
                            (reservedPlace) =>
                              reservedPlace.seatId === miejsce.seatId
                          )
                        ) {
                          handleClick(miejsce.number, miejsce.row, miejsce.seatId);
                        }
                      }}
                    >
                      {miejsce.row}
                      {miejsce.number}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="ticket-type">
            <input type="radio" class="btn-check ticket-type-button" name="options" id="option1" autocomplete="off" checked={formData.ticketType === 'ulgowy'}
              onChange={() => { handleChange('ticketType', 'ulgowy') }}
              defaultChecked={formData.ticketType === 'ulgowy'} />
            <label class="btn btn-secondary ticket-type-button" for="option1" >Ulgowy</label>

            <input type="radio" class="btn-check ticket-type-button" name="options" id="option2" autocomplete="off"
              checked={formData.ticketType === 'normalny'}
              onChange={() => { handleChange('ticketType', 'normalny'); }}
              defaultChecked={formData.ticketType === 'normalny'}
            />
            <label class="btn btn-secondary ticket-type-button" for="option2" >Normalny</label>
          </div>
          <h1 className="sum-price">Cena: {Price} zł</h1>
          <button className="button-ready" onClick={() => handleButtonClick()}>Gotowe</button>
        </div>
      </div>
      <div class="payment-container">
        {isMovieModifyContentVisible === true && renderMovieModifyContent()}
      </div>
      {/* popup */}
      {isPopupOpen && (
        <div className="overlay">
            <div className="popup">
                <div className="popup-content">
                    <p>Dziekujemy za zakup, bilety zostały wysłane na adres email podany podczas zakupu biletów</p>
                    <button onClick={handleRedirect}>Strona główna</button>
                </div>
            </div>
        </div>
    )}
    </div>
    <Footer />
    </>
  );

}