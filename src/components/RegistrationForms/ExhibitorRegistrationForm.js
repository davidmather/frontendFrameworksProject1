import React from 'react';
import Log from "../Logging"


///////////////////
//   Components  //
///////////////////
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';
import {DEBUG_LOG, EMAIL_VALIDATION_STRING, VERBOSE_LOG} from "../Constants/Constants";
import {db} from "../Constants/Firebase/Firestore";
import {NotificationManager} from "react-notifications";
import PaypalExpressBtn from 'react-paypal-express-checkout';


///////////////////
//   Classes     //
///////////////////
class ExhibitorRegistrationForm extends React.Component{
    constructor(props) {
        super(props);

        Log(props);
        this.state = {
            Venue: "Cork City Hall",
            boothNumber:"",
            email:props.email,
            category:"",
            exhibitorDescription:"",
            exhibitorName:"",
            exhibitorSrc:"",
            website:"",
            recommendedBooks:"",
            acceptedTerms:false,
            emailValidation:"",
            env:'sandbox', // you can set here to 'production' for production
            currency:'EUR',// Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
            total:70, // This is the total amount (based on currency) to be paid by using Paypal express checkout
            client: {
                sandbox:    'AYqj3jr72Y0Anm0hda5kXlhXA9VExN2qMJLaEZoVH2cylckafLYG3gsZTfZoLIc4CxEBP0c_8wTe4dMC',
                production: 'YOUR-PRODUCTION-APP-ID',
            }
        };
        Log(this.state);
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

    handleDateChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        Log(this.state,VERBOSE_LOG);
        alert("form submitted");
        alert(this.state);
    }

    onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
        Log("The payment was succeeded!",VERBOSE_LOG);
        Log(payment,VERBOSE_LOG);
        // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data

        const data = {
            Venue: this.state.Venue,
            boothNumber:this.state.boothNumber,
            email:this.state.email,
            category:this.state.category,
            exhibitorDescription:this.state.exhibitorDescription,
            exhibitorName:this.state.exhibitorName,
            exhibitorSrc:this.state.exhibitorSrc,
            website:this.state.website,
            recommendedBooks:this.state.recommendedBooks.split(","),
            payment:payment,
            uid: new Date().getTime()
        };
        db.collection("Exhibitors")
            .doc(data.uid.toString())
            .set(data)
            .then(() => {
                NotificationManager.success("Your participation has been registered", "Success");
                window.location = "/";
            })
            .catch(error => {
                NotificationManager.error(error.message, "Failed to register participation please ensure that you have a" +
                    " valid internet connection");
                this.setState({ isSubmitting: false });
            });

        window.emailjs.send(
            'gmail', "template_wT1f0hwY",
            {
                message_html: "Your Cork International Book Fair participation has been registered " +
                    "you paid €" + this.state.total + " and your exhibitor Number is " + data.uid.toString(),
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

        alert("Your Cork International Book Fair participation has been registered. You paid €"
            + this.state.total + " and your exhibitor Number is " + data.uid.toString()
            + ". Please keep a record of it before closing this alert.");
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
        Log(err,DEBUG_LOG)
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    };

    render() {
        return (
            <div className="row register-form" id={"exhibitorRegistrationForm"}>
                <div className="col-md-8 offset-md-2">
                    <form className="custom-form"
                          onSubmit={this.handleSubmit} >
                        <h1>Exhibitor Registration Form</h1>
                        <p>Reserving a booth costs €70</p>
                        <div className="form-row form-group">
                            <div className="col-sm-4 label-column">
                                <label className="col-form-label"
                                       htmlFor="name-input-field">Name </label>
                            </div>
                            <div className="col-sm-6 input-column">
                                <input name="exhibitorName"
                                       className="form-control"
                                       value={this.state.exhibitorName}
                                       onChange={this.handleInputChange}
                                       type="text"/>
                            </div>
                        </div>
                        <div className="form-row form-group">
                            <div className="col-sm-4 label-column">
                                <label className="col-form-label"
                                       htmlFor="name-input-field">Venue </label>
                            </div>
                            <div className="col-sm-6 input-column">
                                <select onChange={this.handleInputChange}
                                        name="Venue"
                                        className="browser-default custom-select"
                                        defaultValue={"Cork City Hall"}
                                        >
                                    <option value="Cork City Hall">Cork City Hall</option>
                                    <option value="Pairc Ui Chaoimh">Pairc Ui Chaoimh</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row form-group">
                            <div className="col-sm-4 label-column">
                                <label className="col-form-label"
                                       htmlFor="name-input-field">BoothNumber </label>
                            </div>
                            <div className="col-sm-6 input-column">
                                <input name="boothNumber"
                                       className="form-control"
                                       value={this.state.boothNumber}
                                       onChange={this.handleInputChange}
                                       type="text"/>
                            </div>
                        </div>
                        <div className="form-row form-group">
                            <div className="col-sm-4 label-column">
                                <label className="col-form-label"
                                       htmlFor="exhibitorSrc">Image Link </label>
                            </div>
                            <div className="col-sm-6 input-column">
                                <input name="exhibitorSrc"
                                       className="form-control"
                                       value={this.state.exhibitorSrc}
                                       placeholder="https://imgur.com/img.jpg"
                                       onChange={this.handleInputChange}
                                       type="text"/>
                            </div>
                        </div>
                        <div className="form-row form-group">
                            <div className="col-sm-4 label-column">
                                <label className="col-form-label"
                                       htmlFor="recommendedBooks"
                                >Recommended Books </label>
                            </div>
                            <div className="col-sm-6 input-column">
                                <input name="recommendedBooks"
                                       className="form-control"
                                       value={this.state.recommendedBooks}
                                       placeholder="book1,book2,book3"
                                       onChange={this.handleInputChange}
                                       type="text"/>
                            </div>
                        </div>
                        <div className="form-row form-group">
                            <div className="col-sm-4 label-column">
                                <label className="col-form-label"
                                       htmlFor="website">Website </label>
                            </div>
                            <div className="col-sm-6 input-column">
                                <input name="website"
                                       className="form-control"
                                       placeholder="example.com"
                                       value={this.state.website}
                                       onChange={this.handleInputChange}
                                       type="text"/>
                            </div>
                        </div>
                        <div className="form-row form-group">
                            <div className="col-sm-4 label-column">
                                <label className="col-form-label"
                                       htmlFor="category">Category </label>
                            </div>
                            <div className="col-sm-6 input-column">
                                <select onChange={this.handleInputChange}
                                        name="category" 
                                        className="browser-default custom-select"
                                        multiple={true}>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row form-group">
                            <div className="col-sm-4 label-column">
                                <label className="col-form-label"
                                       htmlFor="exhibitorDescription">Description </label>
                            </div>
                            <div className="col-sm-6 input-column">
                                <input name="exhibitorDescription"
                                       className="form-control"
                                       value={this.state.exhibitorDescription}
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
                                       onChange={this.handleInputChange}
                                       onBlur={this.handleEmailValidation}
                                       className={"form-control " + this.state.emailValidation} type="email"/>
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

ExhibitorRegistrationForm.propTypes = {
    handleTermsAndConditionsCallback: PropTypes.func
};

export default ExhibitorRegistrationForm