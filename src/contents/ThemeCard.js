import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBRow, MDBCol } from 'mdbreact';

class ThemeCard extends Component {

    constructor(props) {
        super(props);
        
        this.props = {
            title: props.title,
            icon: props.icon,
            color: props.color,
            content: props.content
        };
    }

    render() {
        return (
            <div class="theme-card-content">
                <MDBRow className="d-flex justify-content-center theme-content-row " >
                    <MDBCol className="d-flex justify-content-end" middle={true} size="2" sm="1" lg="3"> 
                        <FontAwesomeIcon icon={ this.props.icon }  color={ this.props.color } size="3x"/>
                    </MDBCol>
                    <MDBCol className="d-flex justify-content-center flex-column" middle={true} size="8"  md="6" lg="8">
                        <h5><b>{ this.props.title }</b></h5>
                        <p>{ this.props.content }</p>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default ThemeCard;