import  { Component } from 'react';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

class AboutCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMobile: false
        }
        this.isMobileSize = this.isMobileSize.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.isMobileSize); 
        
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.isMobileSize);
    }

    isMobileSize() {
        if (window.innerWidth < 990) {
            this.setState({
                isMobile: true
            });
        } else {
            this.setState({
                isMobile: false
            });
        }
    }

    render() {
        const { isMobile } = this.state;
        return (
            <div className="about-card-content">
                <MDBRow className={"d-flex justify-content-start about-content-row text-white pt-3" + (isMobile ? " rounded border border-2 border-white": "")} >
                    <MDBCol className={"d-flex flex-column" + (!isMobile ? " border-right border-2 border-white" : "")} lg="5"> 
                        <h5><b>Arvoja</b></h5>
                        <ul>
                            <li>Tasa-arvo</li>
                            <li>Intersektionaalinen feminismi</li>
                            <li>Antirasismi</li>
                        </ul>
                    </MDBCol>
                    <MDBCol className="d-flex flex-column" lg="5">
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
        )
    }
    
}

export default AboutCard;