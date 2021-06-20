import React,{ Component, useRef, useEffect }  from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram  } from '@fortawesome/free-brands-svg-icons';
import { faAt, faVoteYea  } from '@fortawesome/free-solid-svg-icons';

const Contact = (props) => {

    const { navId, email } = props;

    const copyEmailToClipboard = () => {
        console.log("COPYING EMAIL: " + email);
    }

    return (
        <div className="contact" id={ navId }>
            <MDBRow center>
                <MDBCol className="flex-column" size="10" md="7">
                    <h1><b>Ota Yhteyttä.</b></h1>
                    <h1><b>Be In Touch.</b></h1>
                    <br />
                    <MDBRow>
                        <MDBCol className="flex-column" middle={true} md="5">
                            <div className="contact-link">
                                <h5>Sähköposti</h5>
                                <p className="border-bottom border-2"><span id="email" onClick={copyEmailToClipboard}><FontAwesomeIcon icon={ faAt } className="mr-2"/>{ email }</span></p>
                            </div>
                        </MDBCol>
                        <MDBCol className="flex-column" middle={true} md="3">
                            <div className="contact-link">
                                <h5>Instagram</h5>
                                <p className="border-bottom border-2">
                                    <a href="https://www.instagram.com/meriniemi_/?hl=fi">
                                        <FontAwesomeIcon icon={ faInstagram } className="mr-2" color="#e91e63"/> meriniemi_
                                    </a>
                                </p>
                            </div>
                        </MDBCol>
                        <MDBCol className="flex-column" middle={true} md="3">
                            <div className="contact-link">
                                <h5>Turun vihreät</h5>
                                <p className="border-bottom border-2">
                                    <a href="https://www.turunvihreat.fi/kuntavaalit/ehdokkaat2021/?kieli=fi&vaali=o_5&sukupuoli=nainen&ehdokas=niemi-meri-1075">
                                        <FontAwesomeIcon icon={ faVoteYea } className="mr-2" color="#81c784"/> Meri Niemi 427
                                    </a>
                                </p>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBCol className={"d-flex justify-content-center"} size="4" md="4"> 
                    <img
                        className="img-fluid z-depth-1"
                        src={ process.env.PUBLIC_URL + "/images/meri_kuva.PNG" }
                        alt="Ota yhteyttä meri"
                    />
                </MDBCol>
            </MDBRow>
        </div>
    )
}

export default Contact;