import React from "react";
import "./Card.css";

const Card = (props) => {

    return ( 
        <div className="cardContainer">
            <div 
                className="card"
                style={{ backgroundImage: `url(${props.poster})` }}
            >
                
            </div>
            <div className="cardTitle">
                <span>{props.title}</span>
            </div>
        </div>
     );
}

export default Card;