
/////////////////////////
//   React Components  //
/////////////////////////
import React from 'react';

////////////////////////////
//   3rd Party Components  //
////////////////////////////

//Font icons plugin I generally use since many html character codes break in mobile browsers  https://fortawesome.com/
import {faFacebook, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

///////////////////
//   Components  //
///////////////////
import {FOOTER_LINKS} from "./Constants/Constants";

///////////////////
//   Classes     //
///////////////////
class Footer extends React.Component{
    constructor(props, context) {
        super(props, context);
        let footerLinkList = [];
        for(let i = 0; i < FOOTER_LINKS.length; i++){
            footerLinkList.push(<li key={i} className="list-inline-item">
                <a href={FOOTER_LINKS[i].href}>{FOOTER_LINKS[i].text}</a>
            </li>);
            if(i!==FOOTER_LINKS.length-1){
                footerLinkList.push(<li key={"p"+i} className="list-inline-item">
                    <span>⋅</span>
                </li>);
            }
        }
        this.footerLinkList = footerLinkList;
    }

    render(){
        return (
            <footer style={{clear:"both"}} className="footer bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                                <div className="d-flex features-icons-icon">
                                    <a href="https://enterprise-ireland.com/">
                                        <div className="footer_logos spritesenterpriseireland"> </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                                <div className="d-flex features-icons-icon">
                                    <a href="https://www.eif.org/">
                                        <div className="footer_logos spriteseuropeaninvestment "> </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                                <div className="d-flex features-icons-icon">
                                    <a href="https://hea.ie/">
                                        <div className="footer_logos spriteshighereducationauthority" > </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container footer_spacer">
                    <div className="row">
                        <div className="col-lg-6 my-auto h-100 text-center text-lg-left">
                            <ul className="list-inline mb-2">
                                {this.footerLinkList}
                            </ul>
                            <p className="text-muted small mb-4 mb-lg-0">© Cork Book Fair 2018. All Rights Reserved.</p>
                        </div>
                        <div className="col-lg-6 my-auto h-100 text-center text-lg-right">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <a href="https://www.facebook.com/CorkWorldBookFestival/">
                                        <FontAwesomeIcon className="fa-2x fa-fw" icon={faFacebook} />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="https://twitter.com/WorldBookFest">
                                        <FontAwesomeIcon className="fa-2x fa-fw" icon={faTwitter} />
                                    </a></li>
                                <li className="list-inline-item">
                                    <a href="https://www.instagram.com/corkworldbook/">
                                        <FontAwesomeIcon className="fa-2x fa-fw" icon={faInstagram} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <iframe title="facebook_like"
                            src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fcorkworldbookfair.ie%2F&amp;layout=standard&amp;action=like&amp;size=small"
                            scrolling="no" frameBorder="0" allow="encrypted-media" width="450"
                            height="80"> </iframe>
                </div>
            </footer>
        );
    }
}

export default Footer;