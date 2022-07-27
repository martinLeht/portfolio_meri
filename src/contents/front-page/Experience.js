
import { forwardRef, useState } from 'react';
import { Chrono } from "react-chrono";
import { MDBRow, MDBCol, MDBTextArea, MDBInput, MDBIcon} from 'mdb-react-ui-kit';
import DateRange from '../../components/general/DateRange';
import { useTranslation } from "react-i18next";
import data from "./data";
import useWindowDimensions from '../../hooks/window-dimensions';
import ModalWindow from "../../components/modal/ModalWindow";


const Experience = (props, ref) => {
    
    const [experienceEntryData, setExperienceEntryData] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState();
    const [openExperienceModal, setOpenExperienceModal] = useState(false);
    const { navId } = props;
    const { t } = useTranslation();
    const { isMobileSize } = useWindowDimensions(); 

    console.log("RERENDERED Experience");
    console.log(openExperienceModal);

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
                title: experienceEntry.startDate.toLocaleDateString() + " - " + experienceEntry.endDate.toLocaleDateString(),
                cardTitle: experienceEntry.title,
                cardSubtitle: experienceEntry.shortDescription,
                cardDetailedText: [experienceEntry.content],
              }
        })
    }

    const setExperienceDateTime = (startTime, endTime) => {
        selectedExperience.startDate = startTime;
        selectedExperience.endDate = endTime;
        setSelectedExperience(selectedExperience);
    }

    const toggleAddModal = () => {
        console.log("Adding experience");
    }

    const openEditModal = (entry) => {
        setSelectedExperience(entry);
        console.log("EDIT MODAL OPEN!");
        console.log(entry);
        setOpenExperienceModal(!openExperienceModal);
    }

    const toggleModal = () => {
        setOpenExperienceModal(!openExperienceModal);
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
                <MDBCol size='auto' center className="p-3 button-bg-hover dashed-border-4">
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
                            return <MDBIcon className='icon' icon='edit' size='sm' onClick={() => openEditModal(entry) } key={`exp-${i}`}/>
                        })
                    }

                    </div>
                </Chrono>                
            </MDBRow>           
        </div>
        {
            <ModalWindow 
                    open={ openExperienceModal }
                    onCloseAction={ toggleModal }
                    title={ 'Muokkaa kokemusta' }
                    content={ 
                        <>
                            <div>
                                <MDBRow className="mb-3" >
                                    <MDBCol sm='5' lg ='7'><MDBInput label='Experience Title' id='experience-title' type='text' size='lg' /></MDBCol>
                                    <MDBCol size='auto'>
                                            <DateRange
                                                startDate={ !!selectedExperience?.startDate ? selectedExperience?.startDate : new Date() }
                                                endDate={ !!selectedExperience?.endDate ? selectedExperience?.endDate : new Date() }
                                                minDate={ new Date(1993, 4, 8)}
                                                onDatesRangeChange={({ startDate, endDate }) => setExperienceDateTime(startDate, endDate)}
                                            />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow className="mb-3">
                                    <MDBCol sm='6' lg ='8'><MDBInput label='Experience Subtitle' id='experience-title' type='text' /></MDBCol>
                                </MDBRow>

                                <MDBRow center>
                                    <MDBCol><MDBTextArea label='Experience content...' id='experience-content' rows={4} size="lg" /></MDBCol>
                                </MDBRow>
                            </div>
                        </>
                    }
                />
        }            
        </>
    );
    
}

/*
                                <div>
                                    <MDBBtn className="m-2" outline color="white" type="submit" onClick={ () => toggleEditModal(entry) }>
                                        {t('front_page.experience.edit_experience')}
                                    </MDBBtn>
                                </div>
                                <div className="w-100" key={`exp-${i}`}>
                        
                                    <MDBRow className="mb-3" >
                                        <MDBCol sm='5' lg ='7'><MDBInput label='Experience Title' id='experience-title' type='text' size='lg' /></MDBCol>
                                    </MDBRow>

                                    <MDBRow className="mb-3">
                                        <MDBCol sm='5' lg ='7'>
                                                <DateRangePicker
                                                    startDate={moment(entry.startTime)}
                                                    startDateId='start-date-id'
                                                    endDate={moment(entry.endTime)}
                                                    endDateId='end-date-id'
                                                    onDatesChange={({ startDate, endDate }) => setExperienceDateTime(entry, startDate, endDate)} // PropTypes.func.isRequired,
                                                    focusedInput={focusedDatePickerInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                                    onFocusChange={focusedInput => setFocusedDatePickerInput(focusedInput)} // PropTypes.func.isRequired,
                                                    displayFormat='DD.MM.yyyy'
                                                    showDefaultInputIcon

                                                />
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBRow className="mb-3">
                                        <MDBCol sm='6' lg ='8'><MDBInput label='Experience Subtitle' id='experience-title' type='text' /></MDBCol>
                                    </MDBRow>

                                    <MDBRow center>
                                        <MDBCol><MDBTextArea label='Experience content...' id='experience-content' rows={4} size="lg" /></MDBCol>
                                    </MDBRow>
                                </div>
*/

export default forwardRef(Experience);