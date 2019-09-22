import React from 'react';
import PropTypes from 'prop-types';


///////////////////
//   Components  //
///////////////////
import Log from "./Logging"
import {DEBUG_LOG, EMAIL_VALIDATION_STRING, VERBOSE_LOG} from "./Constants/Constants";
import SectionDivider from "./SectionDivider";


///////////////////
//   Classes     //
///////////////////
class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {email:"",emailValidation:""};
		this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
		this.handleBookTicketClick = this.handleBookTicketClick.bind(this);
		this.handleEmailValidation = this.handleEmailValidation.bind(this);
	}

	handleEmailValidation(event) {
		if(event.target.value.match(EMAIL_VALIDATION_STRING)){
			this.setState({
				emailValidation: "is-valid"
			});
		} else {
			this.setState({
				emailValidation: "is-invalid"
			});
		}
	}

	handleEmailInputChange(event) {
		this.setState({
			email: event.target.value
		});
		Log(this.state, DEBUG_LOG)
	}

	handleBookTicketClick(){
		Log("Initializing book ticket callback" + this.state.email, VERBOSE_LOG);
		if(this.state.emailValidation === "is-valid"){
			this.props.handleBookTicketCallback(this.state.email);
		}
	}

	render() {
		return (<header className="masthead text-white text-center">
				<div className="container">
					<div className="row">
						<div className="col-xl-9 mx-auto">
							<h1 className="mb-5">Welcome to the official website of the cork book fair! 18-22 July
								2020</h1>
						</div>
						<div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
							<form>
								<div className="form-row">
									<div className="col-12 col-md-9 mb-2 mb-md-0">
										<input className={"form-control form-control-lg " + this.state.emailValidation}
											   name="email"
											   type="email"
											   value={this.state.email}
											   onBlur={this.handleEmailValidation}
											   onChange={this.handleEmailInputChange}
											   placeholder="Enter your email..."/>
									</div>
									<div className="col-12 col-md-3">
										<a className="btn btn-primary btn-block btn-lg text-nowrap"
										   href="#ticketRegistrationForm"
											onClick={this.handleBookTicketClick}
											type="button">Book Ticket!
										</a>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="svg_divider">
					<SectionDivider
						fill1={"#f461c1"}
						fill2={"#4579e2"}
						fill3={"#3461c1"}
						fill4={"#f8f9fa"} />
				</div>
			</header>
		);
	}
}
Header.propTypes = {
	handleBookTicketCallback: PropTypes.func
};


export default Header