
import { Chrono } from "react-chrono";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useTranslation } from "react-i18next";
import data from "./data";
import useWindowDimensions from '../../hooks/window-dimensions';

const Experience = (props) => {

    const { navId } = props;
    const { t } = useTranslation();
    const { isMobileSize } = useWindowDimensions(); 

    return (
        <div className="experience" id={ navId }>
            <MDBRow>
                <MDBCol>
                    <div className="d-flex justify-content-center">
                        <h1><b>{ t("front_page.experience.title")}</b></h1>
                        <br />
                    </div>
                </MDBCol>
            </MDBRow>
            <MDBRow className="justify-content-center">
                <Chrono
                    items={data}
                    mode={ isMobileSize ? "VERTICAL" : "VERTICAL_ALTERNATING"}
                    slideShow
                    slideItemDuration={4000}
                    scrollable={{ scrollbar: true }}
                    useReadMore
                    theme={{
                        cardBgColor: 'white',
                        primary: '#353535',
                        secondary: '#804d59',
                        titleColorActive: 'white',
                        textColor: 'blue',
                        titleColor: "#353535"
                      }}
                >
                </Chrono>
                
            </MDBRow>
        </div>
    );
    
}

export default Experience;