
import { forwardRef, useState, useEffect } from 'react';
import { useMutation, useInfiniteQuery, useQueryClient } from "react-query";
import { useKeycloak } from "@react-keycloak/web";
import moment from "moment";
import { MDBBtn, MDBRow, MDBCol, MDBIcon} from 'mdb-react-ui-kit';
import { useTranslation } from "react-i18next";
import useWindowDimensions from '../../hooks/window-dimensions';
import ExperienceTimeline from './ExperienceTimeline';
import ExperienceModal from '../../components/modal/ExperienceModal';
import Loader from '../../components/general/Loader';
import LoadingSpinner from '../../components/general/LoadingSpinner';
import { usePortfolioDataApi } from '../../api/usePortfolioDataApi';


const Experience = (props, ref) => {
    
    const [selectedExperience, setSelectedExperience] = useState();
    const [openExperienceModal, setOpenExperienceModal] = useState(false);
    const [timelineItems, setTimelineItems] = useState([]);
    const { navId } = props;
    const { t } = useTranslation();
    const { keycloak, initialized } = useKeycloak();
    const { isMobileSize } = useWindowDimensions(); 
    const { getPaginatedExperiences, getPaginatedPublicExperiences, createExperience, updateExperience, deleteExperienceById }  = usePortfolioDataApi();
    const queryClient = useQueryClient();

    const {
        data: experiencesData, 
        isLoading, 
        isError, 
        error,
        hasNextPage,
        fetchNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery(['experience'], (pageConfig) => getPaginatedExperiences(pageConfig), {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.page === Math.floor(lastPage.totalSize / lastPage.pageSize)) return undefined;
                else return lastPage.page + 1;
            },
            onSettled: () => {
                setTimelineItems(convertExperinceDataToTimeline());
            }
    })

    useEffect(() => { 
        queryClient.invalidateQueries(['experience']);
    }, [keycloak, initialized])

    useEffect(() => { 
        const setExperiencesToTimeline = () => {
            if (experiencesData) {
                setTimelineItems(convertExperinceDataToTimeline())
            }
        }
        setExperiencesToTimeline()
    }, [experiencesData])

    const experiences = isLoading || !initialized ? [] : experiencesData ? experiencesData.pages : [];
    const createExperienceHandler = useMutation(data => createExperience(data), {
        onSuccess: data => {
          console.log("DATA SUCCESFULLY CREATED");
        },
        onError: () => {
          alert("there was an error")
        },
        onSettled: () => {
          queryClient.invalidateQueries(['experience']);
        }
    });

    const updateExperienceHandler = useMutation(data => updateExperience(data.uuid, data), {
        onSuccess: data => {
          console.log("DATA SUCCESFULLY UPDATED");
        },
        onError: () => {
          alert("there was an error")
        },
        onSettled: () => {
          queryClient.invalidateQueries(['experience']);
        }
    });
    

    const deleteExperienceHandler = useMutation(id => deleteExperienceById(id), {
        onSuccess: data => {
          console.log("DATA SUCCESFULLY DELETED");
        },
        onError: () => {
          alert("there was an error");
        },
        onSettled: () => {
          queryClient.invalidateQueries(['experience']);
        }
    });

    const convertExperinceDataToTimeline = () => {
        const timelineItems = [];
        experiences.forEach(experiencePage => 
            timelineItems.push(...experiencePage.data.map(experience => {
                return {
                    title: moment(experience.startDate).format("M / YYYY") + " - " + moment(experience.endDate).format("M / YYYY"),
                    cardTitle: experience.title,
                    cardSubtitle: experience.shortDescription,
                    cardDetailedText: [experience.content],
                    media: !!experience.media 
                    ? {
                        name: experience.media.name,
                        source: {
                            url: experience.media.src
                        },
                        type: experience.media.type
                    } : null
                }
            }))
        )
        return timelineItems;
    }

    const renderEditIcons = () => {
        const timelineIcons = [];
        experiences.forEach(experiencePage =>
            timelineIcons.push(...experiencePage.data.map(experience => {
                    return <MDBIcon className='icon' icon='edit' size='sm' onClick={() => openModal(experience) } key={`${experience.uuid}`}/>
                })
            )
        )
        return timelineIcons;
    }

    const openModal = (entry) => {
        setSelectedExperience(entry);
        setOpenExperienceModal(true);
    }

    const handleSaveAndCloseModal = (data) => {
        if (data.uuid) {
            updateExperienceHandler.mutate(data);
        } else {
            createExperienceHandler.mutate(data);
        }
        setOpenExperienceModal(false);
    }

    const handleDeleteAndCloseModal = (id) => {
        deleteExperienceHandler.mutate(id);
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
                    keycloak.authenticated && (
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
                {
                    isLoading 
                    ? <Loader pulse/>
                    : (
                        experiences.length > 0 && experiences[0].data.length > 0 && (
                            <>
                                <MDBRow className="justify-content-center">
                                    <ExperienceTimeline timelineItems={timelineItems} timelineIcons={keycloak.authenticated ? renderEditIcons() : []} />               
                                </MDBRow>
                                {
                                    hasNextPage && (
                                        <MDBRow center middle>
                                            <MDBCol size='auto' center className="p-2 button-bg-hover border border-dark border-4" onClick={fetchNextPage}>
                                                <div className="text-dark">
                                                    <h6 className="d-flex justify-content-center align-items-center flex-column">
                                                        {isFetching && !isFetchingNextPage ? <LoadingSpinner pulse color="white" /> : <b>{t('front_page.experience.load_more')}</b>}
                                                        <br/>
                                                        {experiences[0].totalSize - timelineItems.length}
                                                    </h6>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                    )
                                }   
                            </>     
                        )
                    )
                }
                {
                    !isLoading && (isError || !experiences) && (
                        <MDBRow className="text-center p-4">
                            <MDBCol>
                                <h5>No experiences yet</h5>
                            </MDBCol>
                        </MDBRow>
                    )
                }
            </div>
            {
                keycloak.authenticated && (
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