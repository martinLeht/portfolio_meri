import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram  } from '@fortawesome/free-brands-svg-icons';
import { faVoteYea  } from '@fortawesome/free-solid-svg-icons';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

class Footer extends Component {

    render() {
        return (
            <MDBFooter color="elegant-color" className="font-small pt-4 mt-4 footer-content">
                <MDBContainer className="text-left text-md-left">
                    <MDBRow>
                    <MDBCol md="6">
                        <h5 className="title">Hyödyllistä</h5>
                        <ul>
                            <li className="list-unstyled">
                                <a href="https://www.turku.fi/kuntavaalien-aanestyspaikat-2021">Turun kuntavaalien äänestyspaikat</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="https://www.turunvihreatnuoret.fi/files/2021/02/kuntavaaliohjelma2021.pdf">Turun vihreät nuoret kuntavaaliohjelma 2021</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="https://www.turunvihreatnuoret.fi/files/2021/03/Municipal-Election-Programme-2021.pdf">Municipal Election Programme 2021</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="https://www.turunvihreat.fi/kuntavaalit/vaaliohjelma2021/">Turun vihreiden kuntavaaliohjelma 2021</a>
                            </li>
                        </ul>
                    </MDBCol>
                    <MDBCol md="6">
                        <h5 className="title">Ota Yhteyttä</h5>
                        <ul>
                            <li className="list-unstyled">
                                <a href="https://www.instagram.com/meriniemi_/?hl=fi"><FontAwesomeIcon icon={faInstagram} /> Instagram</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="https://www.turunvihreat.fi/kuntavaalit/ehdokkaat2021/?kieli=fi&vaali=o_5&sukupuoli=nainen&ehdokas=niemi-meri-1075"><FontAwesomeIcon icon={faVoteYea} /> Vihreät | 427</a>
                            </li>
                        </ul>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        )
    }
}

export default Footer;