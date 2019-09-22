import React from 'react';
import DatePicker from "react-datepicker";
import Log from "../Logging"
import "react-datepicker/dist/react-datepicker.css";
import {DEBUG_LOG, EMAIL_VALIDATION_STRING, VERBOSE_LOG} from "../Constants/Constants";
import {db} from "../Constants/Firebase/Firestore";
import { NotificationManager } from "react-notifications";
import PaypalExpressBtn from 'react-paypal-express-checkout';

class TicketRegistrationForm extends React.Component{
    constructor(props) {
        super(props);

        Log(props,DEBUG_LOG);
        this.state = {
            startDate: new Date(2020,6,18),
            name:"",
            email:props.email,
            numberOfAdults:"",
            numberOfChildren:"",
            acceptedTerms:false,
            isReducedEntry:false,
            emailValidation:"",
            env:'sandbox', // you can set here to 'production' for production
            currency:'EUR',// Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
            total:0, // This is the total amount (based on currency) to be paid by using Paypal express checkout
            client: {
                sandbox:    'AYqj3jr72Y0Anm0hda5kXlhXA9VExN2qMJLaEZoVH2cylckafLYG3gsZTfZoLIc4CxEBP0c_8wTe4dMC',
                production: 'YOUR-PRODUCTION-APP-ID',
            }
        };

        Log(props,DEBUG_LOG);console.log(this.state);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTermsAndConditionsClick = this.handleTermsAndConditionsClick.bind(this);
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
    handleTermsAndConditionsClick(){
        this.props.handleTermsAndConditionsCallback()
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(this.state.isReducedEntry){
            this.setState({
                [name]: value,
                total:(this.state.numberOfAdults + this.state.numberOfChildren) * 3
            });
        } else {
            this.setState({
                [name]: value,
                total:this.state.numberOfAdults * 5 + this.state.numberOfChildren * 3
            });
        }
        Log(this.state,VERBOSE_LOG);
    }

    handleDateChange = date => {
        this.setState({
            startDate: date,
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        Log(this.state,VERBOSE_LOG);
        return false;
    }

    onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
        Log("The payment was succeeded!",VERBOSE_LOG);
        Log(payment,VERBOSE_LOG);
        // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        const data = {
            startDate: this.state.startDate,
            name: this.state.name,
            email: this.state.email,
            numberOfAdults: this.state.numberOfAdults,
            numberOfChildren: this.state.numberOfChildren,
            isReducedEntry: this.state.isReducedEntry,
            uid: new Date().getTime()
        };

        db.collection("Visitors")
            .doc(data.uid.toString())
            .set(data)
            .then(() => {
                window.location = "/";
            })
            .catch(error => {
                NotificationManager.error(error.message, "Failed to generate ticket please ensure that you have a" +
                    " valid internet connection");
                this.setState({ isSubmitting: false });
            });

        window.emailjs.send(
            'gmail', "template_wT1f0hwY",
            {
                message_html: "Your Cork International Book Fair ticket has been generated" +
                    "you paid" + this.state.total + " and your Ticket Number is " + data.uid.toString(),
                from_name: "David Mather",
                reply_to: "david.mather@mycit.ie",
                to_email:"matherdavid2@gmail.com"
            }
        ).then(res => {
            Log('Email successfully sent!',VERBOSE_LOG);
            Log(res,VERBOSE_LOG);
        })
        // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err));

        alert("Your Cork International Book Fair ticket has been generated" +
            "you paid" + this.state.total + " and your Ticket Number is " + data.uid.toString());
        return false;
    };

    onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        Log('The payment was cancelled!',VERBOSE_LOG);
        Log(data,VERBOSE_LOG);
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    };

    onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        Log("Error!",VERBOSE_LOG);
        Log(err,DEBUG_LOG);
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    };

    render() {
        return (
                <div className="row register-form" id="ticketRegistrationForm">
                    <div className="col-md-8 offset-md-2">
                        <form  onSubmit={this.handleSubmit} className="custom-form" >
                            <h1>Register Form</h1>
                            <p className="text-left">Re-entry promotion:&nbsp;Regular tickets dated 18 and 19 July can enjoy
                                one-time free admission on 20, 21 or 22 July after 5pm by presenting the whole stub attached to the
                                admission ticket.
                            </p>
                            <div className="form-row form-group">
                                <div className="col-sm-4 label-column">
                                    <label className="col-form-label"
                                           htmlFor="name-input-field">Name </label>
                                </div>
                                <div className="col-sm-6 input-column">
                                    <input name="name"
                                           className="form-control"
                                           value={this.state.name}
                                           onChange={this.handleInputChange}
                                           type="text"/>
                                </div>
                            </div>
                            <div className="form-row form-group">
                                <div className="col-sm-4 label-column">
                                    <label className="col-form-label"
                                           htmlFor="email-input-field">Email </label>
                                </div>
                                <div className="col-sm-6 input-column">
                                    <input name="email"
                                           value={this.state.email}
                                           onBlur={this.handleEmailValidation}
                                           onChange={this.handleInputChange}
                                           className={"form-control" + this.state.emailValidation} type="email"/>
                                </div>
                            </div>
                            <div className="form-row form-group">
                                <div className="col-sm-4 label-column">
                                    <label className="col-form-label"
                                           htmlFor="repeat-password-input-field">Date</label>
                                </div>
                                <div className="col-sm-6 input-column">
                                    <DatePicker
                                        name="date"
                                        selected={this.state.startDate}
                                        minDate={new Date(2020,6,18)}
                                        maxDate={new Date(2020,6,22)}
                                        onChange={this.handleDateChange}
                                    />
                                </div>
                            </div>
                            <div className="form-row form-group">
                                <div className="col-sm-4 label-column">
                                    <label className="col-form-label"
                                           htmlFor="pawssword-input-field">Number of Adults (€5)</label>
                                </div>
                                <div className="col-sm-6 input-column">
                                    <input name="numberOfAdults"
                                           value={this.state.numberOfAdults}
                                           onChange={this.handleInputChange}
                                           className="form-control" type="number"/>
                                </div>
                            </div>
                            <div className="form-row form-group">
                                <div className="col-sm-4 label-column">
                                    <label className="col-form-label"
                                           htmlFor="repeat-pawssword-input-field">Number of Children (€3)</label>
                                </div>
                                <div className="col-sm-6 input-column">
                                    <input name="numberOfChildren"
                                           onChange={this.handleInputChange}
                                           value={this.state.numberOfChildren}
                                           className="form-control" type="number"/>
                                </div>
                            </div>

                            <div className="form-check">
                                <input type="checkbox"
                                       name="acceptedTerms"
                                       checked={this.state.acceptedTerms}
                                       onChange={this.handleInputChange}
                                       className="form-check-input"
                                       id="formCheck-1" />
                                <label className="form-check-label"
                                       htmlFor="formCheck-1">I&#39;ve read and accept the
                                    <button style={{padding:"0px",cursor:"pointer"}}
                                            type="button"
                                            onClick={this.handleTermsAndConditionsClick}
                                            className="btn btn-link">terms and conditions</button>
                                </label></div>
                            <div className="form-check">
                                <input name="isReducedEntry"
                                       checked={this.state.isReducedEntry}
                                       onChange={this.handleInputChange}
                                       className="form-check-input" type="checkbox" id="formCheck-2"/>
                                <label className="form-check-label" htmlFor="formCheck-2">
                                    l would like to available of the reduced entry fee €3 (before 12am)</label>
                            </div>
                            <PaypalExpressBtn env={this.state.env}
                                              client={this.state.client}
                                              currency={this.state.currency}
                                              total={this.state.total}
                                              onClick={this.handleSubmit}
                                              onError={this.onError}
                                              onSuccess={this.onSuccess}
                                              onCancel={this.onCancel} />
                        </form>
                    </div>
                </div>
            );
    }
}

export default TicketRegistrationForm