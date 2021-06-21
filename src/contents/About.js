import React, { useRef, useEffect }  from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import AboutCard from './AboutCard';

const About = (props) => {

    const { navId } = props;
    return (
        <div className="about" id={ navId }>
            <MDBRow className="justify-content-center">
                <MDBCol className="d-flex justify-content-right" middle size="10" lg="5">
                    <img
                        className="img-fluid z-depth-1"
                        src={process.env.PUBLIC_URL + "/images/meri_about.jpg"}
                        alt="Meri minusta"
                    />
                </MDBCol>
                <MDBCol className="pt-3" middle size="8" sm="5" lg="6">
                    <h2><b>Kuka Meri?</b></h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <AboutCard 
                        title="Arvoja" 
                        icon={ faBalanceScale } 
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    />
                </MDBCol>
            </MDBRow>
        </div>
    )
}

export default About;