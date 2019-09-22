import React from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';

class TermsAndConditions extends React.Component {
    constructor(props) {
        super(props);
        this.onCloseModal = this.onCloseModal.bind(this);
    }


    onCloseModal(){
        this.props.handleCloseTermsAndConditionsCallback()
    }

    render() {
        return (
            <div>
                <Modal open={this.props.open} onClose={this.onCloseModal} center>
                    <h2>Terms and Conditions</h2>
                    <section>
                        <p>Your registration for the Exhibition, or entry to our exhibition venue, signiﬁes your acceptance of these Rules and Regulations and any other rules and regulations referenced here in or reasonably notiﬁed to you at the Exhibition venue, with
                            which you agree to observe and comply. </p>
                        <p>Visitors do not have the Organizer’s permission to attend, and may not attend, the Exhibition without conﬁrming your acceptance of these Rules and Regulations in writing prior to your attendance. Your admission badge allows you entrance to
                            concurrent Exhibitions organized by the government with other event partners. By doing so, you accept and agree to abide by the Visitor’s Rules &amp; Regulations of respective Exhibition.</p><ol>
                        <li>
                            <p>Visitor’s Conduct: You shall not do or permit to be done any action which causes or may cause anydisturbance, nuisance, annoyance, inconvenience, damage or danger to any person or thing or which in the opinion of the Organizer does not conform to the general standards of the Exhibition or constitutes a breach of these Rules and Regulations.</p>
                            <p>
                                We reserve the right to refuse admittance to any visitor or to require any visitor to leave if their behavior is in breach of these Rules and Regulations, or contravenes applicable laws or regulations. Our opinion is ﬁnal in this regard.</p>
                        </li>
                        <li>
                            <p>Liability: We shall not be liable for any loss of or damage to any of your property occurring in or about the Exhibition venue, or for the death of or any injury sustained by any visitor whilst in or about the Exhibition venue, other than for death or injury resulting from our negligence or which otherwise cannot be excluded or restricted at law.</p>
                            <p>You agree that we shall not incur any liability to you for any goods or services oﬀered or sold by, or representations made by,any Exhibitor at the Exhibition. </p>
                            <p>You agree to indemnify and hold us harmless against any damage or allegations of damage caused by you to the property,business or reputation of us,other Exhibitors or Visitors or the operator of the Exhibition venue,including but not limited to damages arising from your breach of these Rules and Regulations.</p>
                            <p> You agree that we shall not incur any liability to you for any error or omission in any information relating to any Exhibitor or its products in the Exhibition’s oﬃcial directory or in any other promotional or other printed materials or information provided by us or that Exhibitor.</p>
                        </li>
                        <li>
                            <p>Recording: You shall not record images in any form while attending the Exhibition without our prior written consent. Such prohibition includes, but is not limited to, the taking of photographs, video or digital recording of any type and drawing or sketching of images. You agree to surrender to us on demand what ever media on which images may be recorded in violation of this rule.</p>
                            <p>The copyright and other intellectual property or other rights (including for the avoidance of doubt, rights in sound recording and broadcasts) in materials created in violation of this clause 4,whether arising now or in the future,shall belong to us unconditionally from the time of their creation,and you agree to do all acts and execute all such documents as may be required to properly vest the same. You agree to indemnify and hold us harmless against all claims, liabilities, losses, proceedings, damages, judgments, expenses, costs (including legal fees) and charges of any kind howsoever incurred by or on behalf of or made against us arising out of any infringement or other claim relating to or arising out of the unauthorized making of any recordings by you.</p>
                            <p>You acknowledge and agree that we may take photographs/videos which could include images of you while attending the Exhibition. You hereby consent to and grant to us, the unrestricted, perpetual,worldwide,royalty-free and transferable right and license to use such images worldwide without any compensation.</p>
                            <p>You acknowledge that we are the exclusive owner of all rights in such images and hereby waive (a) any and all rights in and to them, and (b) any and all claims you may have relating to or arising from our use of them.</p>
                        </li>
                    </ol></section>
                </Modal>
            </div>
        );
    }
}

TermsAndConditions.propTypes = {
    handleCloseTermsAndConditionsCallback: PropTypes.func
};
export default TermsAndConditions;