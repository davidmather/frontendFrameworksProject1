/////////////////////////
//   React Components  //
/////////////////////////
import React from 'react';

/////////////////////////////
//   3rd Party Components  //
////////////////////////////
import AOS from "aos"; //Animate on scroll library http://michalsnik.github.io/aos/

///////////////////
//   Components  //
///////////////////
import Log from "../Logging"
import Book from "./Book"

///////////////////
//   Classes     //
///////////////////
class BookRow extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {books:""};
        AOS.init();
        Log("Creating a row of books")

    }
    render(){
        return (
            <div className="row">
                <Book bookTitle={this.props.book1Title} frontCover={this.props.book1FrontCover} colSize="col-md-4" />
                <Book bookTitle={this.props.book2Title} frontCover={this.props.book2FrontCover} colSize="col" />
                <Book bookTitle={this.props.book3Title} frontCover={this.props.book3FrontCover} colSize="col-md-4" />
            </div>
        );
    }
}

export default BookRow;