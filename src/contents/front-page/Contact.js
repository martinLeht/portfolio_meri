
import { useState } from 'react';
import { MDBIcon, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram  } from '@fortawesome/free-brands-svg-icons';
import { faAt, faVoteYea  } from '@fortawesome/free-solid-svg-icons';

const Contact = (props) => {

    const { navId, email } = props;
    const [copySuccess, setCopySuccess] = useState(false);
    const { t } = useTranslation();

    const copyEmailToClipboard = () => {
        const range = document.createRange();
        range.selectNode(document.getElementById("email"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range); 
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
        setCopySuccess(true);
    }

    return (
        <div className="contact pb-3" id={ navId }>
            <MDBRow center>
                <MDBCol className="flex-column" size="10" md="7">
                    <h1><b>{ t("front_page.contact.title")}</b></h1>
                    <br />
                    <MDBRow>
                        <MDBCol className="flex-column" center md="5">
                            <div className="contact-link">
                                <h5>{ t("front_page.contact.email")}</h5>
                                <p className="border-bottom border-2">
                                    <FontAwesomeIcon icon={ faAt } className="mr-2"/>
                                    <span id="email" onClick={copyEmailToClipboard}>{ email }</span>
                                    {
                                        copySuccess && (
                                            <span className="copy-success ms-5"><MDBIcon  color="success" fas icon="paste" /> Copied!</span>
                                        )
                                    }

                                </p>
                            </div>
                        </MDBCol>
                        <MDBCol className="flex-column" center md="3">
                            <div className="contact-link">
                                <h5>{ t("front_page.contact.instagram")}</h5>
                                <p className="border-bottom border-2">
                                    <a href="https://www.instagram.com/meriniemi_/?hl=fi">
                                        <FontAwesomeIcon icon={ faInstagram } className="mr-2" color="#e91e63"/> meriniemi_
                                    </a>
                                </p>
                            </div>
                        </MDBCol>
                        <MDBCol className="flex-column" center md="3">
                            <div className="contact-link">
                                <h5>{ t("front_page.contact.green")}</h5>
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