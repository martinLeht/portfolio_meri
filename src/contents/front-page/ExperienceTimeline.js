import { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBIcon} from 'mdb-react-ui-kit';
import { useKeycloak } from "@react-keycloak/web";
import { Chrono } from "react-chrono";
import useWindowDimensions from '../../hooks/window-dimensions';


const ExperienceTimeline = (props) => {

    const { timelineItems, timelineIcons } = props;

    const { keycloak } = useKeycloak();
    const { isMobileSize } = useWindowDimensions(); 

    return (
        <>
            <MDBRow className="justify-content-center">
                <Chrono
                    items={ timelineItems }
                    mode={ isMobileSize ? "VERTICAL" : "VERTICAL_ALTERNATING"}
                    scrollable={{ scrollbar: true }}
                    useReadMore
                    hideControls
                    allowDynamicUpdate
                    theme={{
                        cardBgColor: 'white',
                        primary: '#353535',
                        secondary: '#804d59',
                        titleColorActive: 'white',
                        textColor: 'blue',
                        titleColor: "#353535"
                    }}
                >
                    
                    <div className="chrono-icons">
                    {
                        keycloak.authenticated && timelineItems.length && timelineIcons.length > 0 && (
                            timelineIcons
                        )
                    }
                    </div>
                </Chrono>                
            </MDBRow>
        </>
    )
    
}

ExperienceTimeline.defaultProps = {
    timelineIcons: []
}

export default ExperienceTimeline;