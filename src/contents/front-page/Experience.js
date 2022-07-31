
import { forwardRef, useState } from 'react';
import { Chrono } from "react-chrono";
import moment from "moment";
import { MDBRow, MDBCol, MDBTextArea, MDBInput, MDBIcon} from 'mdb-react-ui-kit';
import DateRange from '../../components/general/DateRange';
import { useTranslation } from "react-i18next";
import data from "./data";
import useWindowDimensions from '../../hooks/window-dimensions';
import ModalWindow from "../../components/modal/ModalWindow";
import ExperienceModal from '../../components/modal/ExperienceModal';


const Experience = (props, ref) => {
    
    const [experienceEntryData, setExperienceEntryData] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState();
    const [experienceFormData, setExperienceFormData] = useState();
    const [openExperienceModal, setOpenExperienceModal] = useState(false);
    const { navId } = props;
    const { t } = useTranslation();
    const { isMobileSize } = useWindowDimensions(); 

    const experienceData = [
        {
            title: "Item title",
            startDate: new Date(2019, 1, 17),
            endDate: new Date(2020, 2, 18),
            shortDescription: "Some short description but not much text.",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            images: []
        },
        {
            title: "Item title 2",
            startDate: new Date(),
            endDate: new Date(),
            shortDescription: "Some short description but not much text.",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            images: []
        },
        {
            title: "Item title 3",
            startDate: new Date(),
            endDate: new Date(),
            shortDescription: "Some short description but not much text.",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            images: []
        }

    ];

    const convertExperinceDataToTimeline = () => {
        return experienceData.map(experienceEntry => {
            return {
                title: moment(experienceEntry.startDate).format("M/YYYY") + " - " + moment(experienceEntry.endDate).format("M/YYYY"),
                cardTitle: experienceEntry.title,
                cardSubtitle: experienceEntry.shortDescription,
                cardDetailedText: [experienceEntry.content],
              }
        })
    }

    const openModal = (entry) => {
        setSelectedExperience(entry);
        setOpenExperienceModal(true);
    }

    const handleSaveAndCloseModal = (data) => {
        setOpenExperienceModal(false);
    }

    const handleDeleteAndCloseModal = (data) => {
        setOpenExperienceModal(false);
    }

    const closeModal = (data) => {
        setOpenExperienceModal(false);
    }

    return (
        <>
            <div ref={ref} className="experience" id={ navId }>
                <MDBRow className='mb-3'>
                    <MDBCol>
                        <div className="d-flex justify-content-center">
                            <h1><b>{ t("front_page.experience.title")}</b></h1>
                            <br />
                        </div>
                    </MDBCol>
                </MDBRow>

                <MDBRow center middle>
                    <MDBCol size='auto' center className="p-3 button-bg-hover dashed-border-4" onClick={() => openModal(undefined)}>
                        <div className="text-dark">
                            <h5 className="d-flex justify-content-center align-items-center flex-column">
                                <b>{t('front_page.experience.add_experience')}</b>
                                <MDBIcon icon="plus" />
                            </h5>
                        </div>
                    </MDBCol>
                </MDBRow>

                <MDBRow className="justify-content-center">
                    <Chrono
                        items={ convertExperinceDataToTimeline() }
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
                        <div className="chrono-icons">
                        {
                            experienceData.map((entry, i) => {
                                return <MDBIcon className='icon' icon='edit' size='sm' onClick={() => openModal(entry) } key={`exp-${i}`}/>
                            })
                        }

                        </div>
                    </Chrono>                
                </MDBRow>           
            </div>
            <ExperienceModal 
                open={openExperienceModal} 
                experienceData={selectedExperience} 
                onSave={ handleSaveAndCloseModal }
                onDelete={ handleDeleteAndCloseModal }
                onClose={ closeModal } 
            />            
        </>
    );
    
}

export default forwardRef(Experience);