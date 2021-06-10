import React, { Component } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram  } from '@fortawesome/free-brands-svg-icons';
import { faVoteYea  } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class Social extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sectionId: props.id,
            isImageCentered: false
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.setImageLocationDependingOnScreen);
    }

    componentWillUnmount() {
        window.addEventListener('resize', this.setImageLocationDependingOnScreen);
    }

    setImageLocationDependingOnScreen = () => {
        if (window.outerWidth > 800) {
            this.setState({ isImageCentered: false});
        } else {
            this.setState({ isImageCentered: true});            
        }
    }


    render() {
        return (
            <div className="contact" id={ this.state.sectionId }>
                <MDBRow className="justify-content-center contact-row" >
                    <MDBCol className="d-flex justify-content-center text-center flex-column" middle={true} size="10"  md="5">
                        <h2 className="white-text"><b>Ota Yhteyttä</b></h2>
                        <div className="contact-link">
                            <a href="https://www.instagram.com/meriniemi_/?hl=fi">
                                <h4 className="white-text">
                                    <FontAwesomeIcon icon={ faInstagram } className="mr-3" size="2x" color="#e91e63"/>
                                    Instagram
                                </h4>
                            </a>
                        </div>
                        <div className="contact-link">
                            <a href="https://www.turunvihreat.fi/kuntavaalit/ehdokkaat2021/?kieli=fi&vaali=o_5&sukupuoli=nainen&ehdokas=niemi-meri-1075">
                                <h4 className="white-text">
                                    <FontAwesomeIcon icon={ faVoteYea } className="mr-3" size="2x" color="#81c784" />
                                    Vihreät - 427
                                </h4>
                            </a>
                        </div>
                    </MDBCol>
                    <MDBCol className={"d-flex justify-content-" + (this.state.isImageCentered ? 'center' : 'start')} middle={true} size="5" sm="3" md="4"> 
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
}

export default Social;