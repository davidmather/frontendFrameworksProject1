/////////////////////////
//   React Components  //
/////////////////////////
import React from 'react';
import PropTypes from 'prop-types';

///////////////////
//   Components  //
///////////////////
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Log from "./Logging";
import {VERBOSE_LOG} from "./Constants/Constants";


///////////////////
//   Class       //
///////////////////
class Navbar extends React.Component {

    static books = [];
    constructor(props) {
        super(props);
        this.state = {
            toggled:false,
            navbarCollapseClassName:"navbar-toggler",
            responsiveDropdownMenuClassName:"navbar-collapse collapse",
            search:""
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleExhibitorRegistrationClick = this.handleExhibitorRegistrationClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleExhibitorRegistrationClick(){
        Log("Initializing book ticket callback" + this.state.email, VERBOSE_LOG);
        this.props.handleExhibitorRegistrationCallback();
    }

     handleToggle(){
         if(this.state.toggled){
            this.setState(state => ({
                navbarCollapseClassName: "navbar-toggler collapsed",
                responsiveDropdownMenuClassName: "navbar-collapse collapse",
                toggled: !this.state.toggled
            }));
         } else {
            this.setState(state => ({
                navbarCollapseClassName: "navbar-toggler",
                responsiveDropdownMenuClassName: "navbar-collapse collapse show",
                toggled: !this.state.toggled
            }));
         }
     }

    handleInputChange(event) {
        const target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        Log(target.type,VERBOSE_LOG);
        switch (target.type) {
            case "checkbox":
                value = target.checked;
                break;
            case "select-one":
                Log(target.options,VERBOSE_LOG);
                for ( let i = 0; i < target.options.length; i++ )
                {
                    if(target.options[i].selected===true){
                        value = target.options[i].text
                    }
                }
                Log(value,VERBOSE_LOG);
                break;
            case "select-multiple":
                value = [];
                for ( let i = 0; i < target.options.length; i++ )
                {
                    if(target.options[i].selected===true){
                        value.push(i+1)
                    }
                }
                value = value.join(",");
                Log(value,VERBOSE_LOG);
                break;
            default:
                value = target.value;
                break;
        }

        const name = target.name;
        this.setState({
            [name]: value
        });

        Log(this.state,VERBOSE_LOG);
    }

     handleSearch(event){
         event.preventDefault();
         Log("Search Initiated",VERBOSE_LOG);
         for(let i = 0; i < Navbar.books.length; i++){
             if(Navbar.books[i].bookTitle.toUpperCase().includes(this.state.search.toUpperCase())){
                 document.getElementById(Navbar.books[i].bookTitle.replace(/ /gi, "_")).scrollIntoView();
             }

         }
     }

    render() {
        return (
          <nav className="navbar navbar-dark navbar-expand-md sticky-top bg-success navigation-clean-search">
            <div className="container-fluid nav_container">
                <a className="navbar-brand" href="/#">
                    <strong>Cork International Book Fair</strong>
                </a>
                <button onClick={this.handleToggle} data-toggle="collapse" className={this.state.navbarCollapseClassName} data-target="#navcol-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={this.state.responsiveDropdownMenuClassName} id="navcol-1">
                    <ul className="nav navbar-nav">
                        <li className="dropdown nav-item nacionais">
                            <span className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded={this.state.toggled} id="link-nacional">About</span>
                            <div className="dropdown-menu nacional" role="menu">
                                <a className="dropdown-item" role="presentation" href="#featured">Featured</a>
                                <a className="dropdown-item" role="presentation" href="#exhibitors">Exhibitors</a>
                                <a className="dropdown-item" role="presentation" href="#books">Books</a>
                                <a className="dropdown-item" role="presentation" href="#artgallery">Art gallery</a>
                                <a className="dropdown-item" role="presentation" href="#famous-writers">Famous Authors</a>
                            </div>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a onClick={this.handleExhibitorRegistrationClick} className="nav-link" href="#exhibitorRegistrationForm">Exhibitor Registration</a>
                        </li>
                    </ul>
                    <form onSubmit={this.handleSearch} className="form-inline ml-auto" id="form" target="_self">
                        <div className="form-group">
                            <label htmlFor="search-field">
                                <FontAwesomeIcon id="icon-busca" icon={faSearch} />
                            </label>
                            <input style={{background:"black !important"}}
                                   onChange={this.handleInputChange}
                                   className="form-control form-control-sm search-field"
                                   type="search" id="search-field"
                                   name="search"
                                   placeholder="Search"
                                   autoComplete="off" />
                        </div>
                    </form>
                </div>
            </div>
        </nav>
        );
    }
}
Navbar.propTypes = {
    handleExhibitorRegistrationCallback: PropTypes.func
};
export default Navbar;