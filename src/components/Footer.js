import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdb-react-ui-kit";

const Footer = () => {

    return (
        <MDBFooter className="font-small sticky">
                <MDBContainer fluid className="text-center py-3">
                    <MDBRow center>
                        <MDBCol md="2">
                            <h5>
                                <a className="text-white" href="https://www.instagram.com/meriniemi_/?hl=fi"><MDBIcon fab icon="instagram" /> Instagram</a>
                            </h5>
                        </MDBCol>
                        <MDBCol md="2">
                            <h5>
                                <a className="text-white" href="https://www.turunvihreat.fi/kuntavaalit/ehdokkaat2021/?kieli=fi&vaali=o_5&sukupuoli=nainen&ehdokas=niemi-meri-1075"><MDBIcon fas icon="vote-yea" /> Vihreät | 427</a>
                            </h5>
                        </MDBCol>
                    </MDBRow>         
                </MDBContainer>
        </MDBFooter>
    )
}

export default Footer;