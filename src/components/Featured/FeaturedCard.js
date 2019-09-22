
/////////////////////////
//   React Components  //
/////////////////////////
import React from "react";

///////////////////
//   Classes     //
///////////////////
function FeaturedCard(props){
    return <figure className="featured_card">
        <div className="image">
            <img src={"assets/img/Featured/Placeholders/" + props.src} alt={props.alt} />
        </div>
        <figcaption>
            <div className="date"><span className="day">{props.day}</span><span className="month">{props.month}</span></div>
            <h3>{props.title}</h3>
            <p>{props.paragraph}</p>
        </figcaption>
    </figure>;
}

export default FeaturedCard