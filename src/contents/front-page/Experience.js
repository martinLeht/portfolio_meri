
import { forwardRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Chrono } from "react-chrono";
import moment from "moment";
import { MDBRow, MDBCol, MDBIcon} from 'mdb-react-ui-kit';
import { useTranslation } from "react-i18next";
import useWindowDimensions from '../../hooks/window-dimensions';
import ExperienceModal from '../../components/modal/ExperienceModal';
import Loader from '../../components/general/Loader';
import PortfolioDataService from '../../services/PortfolioDataService';
import { useAuthentication } from '../../hooks/useAuthentication';


const Experience = (props, ref) => {
    
    const [selectedExperience, setSelectedExperience] = useState();
    const [openExperienceModal, setOpenExperienceModal] = useState(false);
    const { navId } = props;
    const { t } = useTranslation();
    const { authenticatedUser } = useAuthentication();
    const { isMobileSize } = useWindowDimensions(); 
    const portfolioDataService = new PortfolioDataService();
    const queryClient = useQueryClient();

    const { data: experiencesData, isLoading: isLoading } = useQuery(
        ["experience"],
        () => portfolioDataService.getExperiences(),
        {
            // time until stale data is garbage collected
            cacheTime: 60 * 1000,
            // time until data becomes stale
            staleTime: 30 * 1000
            // and many more
        }
    );
    const experiences = isLoading ? [] : experiencesData.data;
    const createExperience = useMutation(data => portfolioDataService.createExperience(data), {
        onSuccess: data => {
          console.log(data);
          console.log("DATA SUCCESFULLY CREATED");
        },
        onError: () => {
          alert("there was an error")
        },
        onSettled: () => {
          queryClient.invalidateQueries('experience');
        }
    });

    const updateExperience = useMutation(data => portfolioDataService.updateExperience(data.uuid, data), {
        onSuccess: data => {
          console.log(data);
          console.log("DATA SUCCESFULLY UPDATED");
        },
        onError: () => {
          alert("there was an error")
        },
        onSettled: () => {
          queryClient.invalidateQueries('experience');
        }
    });
    

    const deleteExperience = useMutation(id => portfolioDataService.deleteExperienceById(id), {
        onSuccess: data => {
          console.log(data);
          console.log("DATA SUCCESFULLY DELETED");
        },
        onError: () => {
          alert("there was an error");
        },
        onSettled: () => {
          queryClient.invalidateQueries('experience');
        }
    });

    const convertExperinceDataToTimeline = () => {
        return experiences.map(experience => {
            return {
                title: moment(experience.startDate).format("M / YYYY") + " - " + moment(experience.endDate).format("M / YYYY"),
                cardTitle: experience.title,
                cardSubtitle: experience.shortDescription,
                cardDetailedText: [experience.content],
                media: !!experience.media 
                ? {
                    name: experience.media.name,
                    source: {
                      url: experience.media.url
                    },
                    type: experience.media.type
                } : null
              }
        })
    }

    const openModal = (entry) => {
        setSelectedExperience(entry);
        setOpenExperienceModal(true);
    }

    const handleSaveAndCloseModal = (data) => {
        if (data.uuid) {
            updateExperience.mutate(data);
        } else {
            createExperience.mutate(data);
        }
        setOpenExperienceModal(false);
    }

    const handleDeleteAndCloseModal = (id) => {
        deleteExperience.mutate(id);
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

                {
                    authenticatedUser && (
                        <MDBRow center middle>
                            <MDBCol size='auto' center className="p-3 button-bg-hover dashed-border-4" onClick={() => openModal(null)}>
                                <div className="text-dark">
                                    <h5 className="d-flex justify-content-center align-items-center flex-column">
                                        <b>{t('front_page.experience.add_experience')}</b>
                                        <MDBIcon icon="plus" />
                                    </h5>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    )
                }
                {isLoading && <Loader/>}
                {
                    !isLoading && (
                        <MDBRow className="justify-content-center">
                            <Chrono
                                items={ convertExperinceDataToTimeline() }
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
                                    authenticatedUser && (
                                        experiences.map((entry) => {
                                            return <MDBIcon className='icon' icon='edit' size='sm' onClick={() => openModal(entry) } key={`${entry.uuid}`}/>
                                        })
                                    )
                                }

                                </div>
                            </Chrono>                
                        </MDBRow>        
                    )
                }
            </div>
            {
                authenticatedUser && (
                    <ExperienceModal 
                        open={openExperienceModal} 
                        experienceData={selectedExperience} 
                        onSave={ handleSaveAndCloseModal }
                        onDelete={ handleDeleteAndCloseModal }
                        onClose={ closeModal } 
                    />         
                )
            }   
        </>
    );
    
}

export default forwardRef(Experience);