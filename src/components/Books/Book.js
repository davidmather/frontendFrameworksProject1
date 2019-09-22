/////////////////////////
//   React Components  //
/////////////////////////
import React from 'react';

///////////////////
//   Classes     //
///////////////////
class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {className: "book-wrap", flip:"", rotate:""};
        this.baseClassName = "book-wrap";

        // This binding is necessary to make `this` work in the callback
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBookBackClick = this.handleBookBackClick.bind(this);
    }

    handleClick(){
        this.setState(state => ({
            className: this.baseClassName + this.state.rotate + " flip",
            flip:" flip"
        }));
    }

    handleBookBackClick(){
        this.setState(state => ({
            className: this.baseClassName + this.state.rotate,
            flip:""
        }));
    }

    handleMouseEnter() {
        this.setState(state => ({
            className: this.baseClassName + " rotate" + this.state.flip,
            rotate: " rotate"
        }));
    }

    handleMouseLeave() {
        this.setState(state => ({
            className: this.baseClassName + this.state.flip,
            rotate: ""
        }));
    }

    render() {
        let id = this.props.bookTitle.replace(/ /g, "_");

        return (
            <div id={id} className={this.props.colSize} >
                <div className="wrap">
                    <div className="perspective">
                        <div id="test" className={this.state.className}>
                            <div onMouseEnter={this.handleMouseEnter}
                                 onMouseLeave={this.handleMouseLeave}
                                 onClick={this.handleClick}
                                 className="book book-1">
                                <img alt="" src={"assets/img/"+this.props.frontCover} /></div>
                            <div className="title book-1"></div>
                            <div onClick={this.handleBookBackClick}
                                 className="book-back book-1">
                                <div className="text">
                                    <h3>{this.props.bookTitle}</h3>
                                    <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt earum doloremque aliquam culpa dolor nostrum consequatur quas dicta? Molestias repellendus minima pariatur libero vel, reiciendis optio magnam rerum, labore corporis.</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Book;