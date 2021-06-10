import React, { Component } from 'react';
import ThemeCard from './ThemeCard';
import { faBalanceScale, faNotesMedical, faPalette } from '@fortawesome/free-solid-svg-icons';
import { MDBRow, MDBCol } from 'mdbreact';

class Themes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sectionId: props.id
        }
    }

    render() {
        return (
            <div class="themes" id={ this.state.sectionId }>
                <MDBRow className="d-flex justify-content-center">
                    <MDBCol>
                        <div class="text-center">
                            <h1><b>Vaaliteemat</b></h1>
                            <br />
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="d-flex justify-content-center">
                    <MDBCol className="theme-card-content">
                        <ThemeCard 
                            title="Yhdenvertaisuus" 
                            icon={ faBalanceScale } 
                            color="#e91e63" 
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
                    </MDBCol>
                    <MDBCol className="theme-card-content">
                        <ThemeCard 
                            title="Mielenterveyspalvelut" 
                            icon={ faNotesMedical }
                            color="#4caf50" 
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
                    </MDBCol>
                    <MDBCol className="theme-card-content">
                        <ThemeCard 
                            title="Taide ja kulttuuri" 
                            icon={ faPalette }
                            color="#00bcd4" 
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default Themes;