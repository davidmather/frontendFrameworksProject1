
/////////////////////////
//   React Components  //
/////////////////////////
import React from 'react';

///////////////
//   Styles  //
///////////////
import "react-image-lightbox/style.css";
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/css/googlefonts.css";
import "../assets/css/aos.css";
import "../assets/css/styles.min.css";


///////////////////
//   Components  //
///////////////////
import Navbar from './Navbar'
import Header from './Header'
import Featured from './Featured/Featured'
import Exhibitors from './Exhibitors/Exhibitors'
import FamousWriters from './FamousWriters/FamousWriters'
import ArtGallery from './ArtGallery/ArtGallery'
import Books from './Books/Books'
import Footer from './Footer'
import TicketRegistrationForm from "./RegistrationForms/TicketRegistrationForm";
import ExhibitorRegistrationForm from "./RegistrationForms/ExhibitorRegistrationForm";
import TermsAndConditions from "./RegistrationForms/TermsAndConditions";

///////////////////
//    Classes    //
///////////////////
class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			visitorRegistrationDisplay:"none",
			exhibitorRegistrationDisplay:"none",
			visitorEmail:"",
			ticketReg:"",
			exhibitorReg:"",
			open:false
		};

		////////////////////////
		//   Event Listeners  //
		////////////////////////
		this.handleBookTicketCallback = this.handleBookTicketCallback.bind(this);
		this.handleExhibitorRegistrationCallback = this.handleExhibitorRegistrationCallback.bind(this);
		this.handleTermsAndConditionsCallback = this.handleTermsAndConditionsCallback.bind(this);
		this.handleCloseTermsAndConditionsCallback = this.handleCloseTermsAndConditionsCallback.bind(this);
	}

	///////////////////
	//    Methods    //
	///////////////////

	handleExhibitorRegistrationCallback(){
		this.setState({
			exhibitorRegistrationDisplay:"block",
			visitorRegistrationDisplay:"none",
			exhibitorReg: <ExhibitorRegistrationForm handleTermsAndConditionsCallback={this.handleTermsAndConditionsCallback}
													 email={this.state.visitorEmail} />
		});
	}

	handleBookTicketCallback(email){
		this.setState({
			exhibitorRegistrationDisplay:"none",
			visitorRegistrationDisplay:"block",
			ticketReg: <TicketRegistrationForm handleTermsAndConditionsCallback={this.handleTermsAndConditionsCallback}
											   email={this.state.visitorEmail} />,
			visitorEmail: email
		});
	}

	handleCloseTermsAndConditionsCallback(){
		this.setState({
			open:false
		});
	}

	handleTermsAndConditionsCallback(){
		this.setState({
			open:true
		});
	}

	render() {
		return ([
			<Navbar handleExhibitorRegistrationCallback={this.handleExhibitorRegistrationCallback}/>,
			<Header handleBookTicketCallback={this.handleBookTicketCallback} />,
			<Featured/>,
			<Exhibitors/>,
			<FamousWriters/>,
			<ArtGallery/>,
			<Books/>,
			<div className="container" style={{display:this.state.visitorRegistrationDisplay}}>{this.state.ticketReg}</div>,
			<div className="container" style={{display:this.state.exhibitorRegistrationDisplay}}>{this.state.exhibitorReg}</div>,
			<Footer/>,
			<TermsAndConditions handleCloseTermsAndConditionsCallback={this.handleCloseTermsAndConditionsCallback}
								open={this.state.open} />

		]);
	}
}

export default App;
