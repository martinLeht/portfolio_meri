import { forwardRef }  from 'react';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useTranslation } from "react-i18next";
import useWindowDimensions from '../../hooks/window-dimensions';

const About = (props, ref) => {

    const { navId } = props;
    const { isMobileSize } = useWindowDimensions();
    const { t } = useTranslation();

    return (
        <div ref={ref} className="about" id={ navId }>
            <MDBRow center>
                <MDBCol size="10" lg="4">
                    <img
                        className="img-fluid z-depth-1"
                        src={process.env.PUBLIC_URL + "/images/meri_about.jpg"}
                        alt="Meri minusta"
                    />
                </MDBCol>
                <MDBCol center size="8" lg="4" className="pt-3">
                    <h2><b>{ t("front_page.about.title")}</b></h2>
                    <p>{ t("front_page.about.caption")}</p>
                    <div className="about-content">
                        <MDBRow className={"d-flex justify-content-start about-content-row text-white pt-3" + (isMobileSize ? " rounded border border-2 border-white": "")} >
                            <MDBCol className={"d-flex flex-column" + (!isMobileSize ? " border-end border-2 border-white" : "")}> 
                                <h5><b>{ t("front_page.about.values.title")}</b></h5>
                                <ul>
                                    <li>{ t("front_page.about.values.equality")}</li>
                                    <li>{ t("front_page.about.values.feminism")}</li>
                                    <li>{ t("front_page.about.values.anti_racism")}</li>
                                </ul>
                            </MDBCol>
                            <MDBCol className="d-flex flex-column">
                                <h5><b>{ t("front_page.about.likes.title")}</b></h5>
                                <ul>
                                    <li>{ t("front_page.about.likes.dance")}</li>
                                    <li>{ t("front_page.about.likes.ice_swim")}</li>
                                    <li>{ t("front_page.about.likes.culture")}</li>
                                    <li>{ t("front_page.about.likes.vacation")}</li>
                                </ul>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </MDBCol>
            </MDBRow>
        </div>
    )
}

export default forwardRef(About);