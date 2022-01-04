import React  from 'react';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import useWindowDimensions from '../../hooks/window-dimensions';

const About = (props) => {

    const { navId } = props;
    const { isMobileSize } = useWindowDimensions();

    return (
        <div className="about" id={ navId }>
            <MDBRow center>
                <MDBCol size="10" lg="4">
                    <img
                        className="img-fluid z-depth-1"
                        src={process.env.PUBLIC_URL + "/images/meri_about.jpg"}
                        alt="Meri minusta"
                    />
                </MDBCol>
                <MDBCol center size="8" lg="4" className="pt-3">
                    <h2><b>Kuka Meri?</b></h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className="about-content">
                        <MDBRow className={"d-flex justify-content-start about-content-row text-white pt-3" + (isMobileSize ? " rounded border border-2 border-white": "")} >
                            <MDBCol className={"d-flex flex-column" + (!isMobileSize ? " border-right border-2 border-white" : "")}> 
                                <h5><b>Arvoja</b></h5>
                                <ul>
                                    <li>Tasa-arvo</li>
                                    <li>Intersektionaalinen feminismi</li>
                                    <li>Antirasismi</li>
                                </ul>
                            </MDBCol>
                            <MDBCol className="d-flex flex-column">
                                <h5><b>Lähellä sydäntä</b></h5>
                                <ul>
                                    <li>Tanssi</li>
                                    <li>Avantouinti</li>
                                    <li>Kulttuuri</li>
                                    <li>Rantaloma</li>
                                </ul>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </MDBCol>
            </MDBRow>
        </div>
    )
}

export default About;