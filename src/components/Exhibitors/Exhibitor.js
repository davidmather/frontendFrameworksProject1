
/////////////////////////
//   React Components  //
/////////////////////////
import React from "react";

////////////////////////////
//   3rd Party Components  //
////////////////////////////

//Font icons plugin I generally use since many html character codes break in mobile browsers  https://fortawesome.com/
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

//Animate on scroll library http://michalsnik.github.io/aos/
import AOS from "aos";

/////////////////////////
//   Components        //
/////////////////////////
import Log from "../Logging"
import {VERBOSE_LOG} from "../Constants/Constants";

class Exhibitor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            exhibitors:"",
            display:"none",
            toggled:false,
            icon:faPlus,
            info:"More"
        };

        AOS.init();
        Log(props.recommendedBooks,VERBOSE_LOG);

        let bookList = [];
        for(let i = 0; i < props.recommendedBooks.length; i++){
            bookList.push(<li key={i}>{props.recommendedBooks[i]}</li>)
        }
        this.recommendedBooks =bookList;

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        Log(this.state,VERBOSE_LOG);
        if(this.state.toggled){
            this.setState({
                display: "none",
                icon: faPlus,
                info: "More",
                toggled: false
            });
        } else{
            this.setState({
                display: "block",
                icon: faMinus,
                info: "Less",
                toggled: true
            });
        }

    }

    render() {

        return (<div className="col-md-6 col-lg-4 filtr-item" data-category={this.props.category}>
            <div style={{display: this.props.stylist}} className="card border-dark exhibitor-card">
                <div className="card-header bg-dark text-light">
                    <h5 className="m-0">{this.props.exhibitorName}</h5>
                </div>
                <img alt="" className="img-fluid card-img w-100 d-block rounded-0"
                     src={"assets/img/Exhibitors/" + this.props.exhibitorSrc}/>
                <div className="card-body">
                    <div style={{display:this.state.display}}>
                        <p>Booth Number: {this.props.boothNumber}<br/>
                            Website: {this.props.website}<br/>
                            Recommended Books:</p>
                        <ul>{this.recommendedBooks}</ul>
                    </div>
                    <p className="card-text">{this.props.exhibitorDescription}</p>
                    <button onClick={this.handleClick} className="btn btn-outline-dark btn-sm ml-auto" type="button">
                        <FontAwesomeIcon icon={this.state.icon}/>&nbsp;{this.state.info} info
                    </button>
                </div>
                <div className="d-flex card-footer">

                </div>
            </div>
        </div>);
    }
}

export default Exhibitor