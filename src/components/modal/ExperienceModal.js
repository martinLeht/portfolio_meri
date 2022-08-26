
import { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBTextArea, MDBInput, MDBCheckbox, MDBIcon} from 'mdb-react-ui-kit';
import { useTranslation } from "react-i18next";
import Select from 'react-select';
import ModalWindow from "./ModalWindow";
import SimpleDialog from "./dialog/SimpleDialog";
import { useAuthentication } from '../../hooks/useAuthentication';
import useImageUploadHandler from '../../hooks/useGeneralImageUploader';
import DateRange from '../general/DateRange';
import IconButton from '../general/IconButton';
import LoadingSpinner from '../general/LoadingSpinner';
import Image from '../general/Image';
import PortfolioDataService from '../../services/PortfolioDataService';


const ExperienceModal = (props) => {

    const { open, experienceData, onSave, onDelete, onClose } = props;

    const [confirmUnsavedChangesDialogOpen, setConfirmUnsavedChangesDialogOpen] = useState(false);
    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [publiclyHidden, setPubliclyHidden] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [shortDescription, setShortDescription] = useState('');
    const [content, setContent] = useState('');
    const [experienceType, setExperienceType] = useState(null);
    const [media, setMedia] = useState(null);

    const [initialTitle, setInitialTitle] = useState('');
    const [initialPubliclyHidden, setInitialPubliclyHidden] = useState(false);
    const [initialStartDate, setInitialStartDate] = useState();
    const [initialEndDate, setInitialEndDate] = useState();
    const [initialShortDescription, setInitialShortDescription] = useState('');
    const [initialContent, setInitialContent] = useState('');
    const [initialExperienceType, setInitialExperienceType] = useState(null);
    const [initialMedia, setInitialMedia] = useState(null);

    const { t } = useTranslation();
    const { authenticatedUser } = useAuthentication();
    const { file, isUploading, uploadImage, deleteImage, getImage } = useImageUploadHandler();
    const portfolioDataService = new PortfolioDataService();

    const experienceTypeOpts = [
        { value: 'WORK', label: 'Work' },
        { value: 'EDUCATION', label: 'Education' }
    ];
    

    const checkHasChanges = () => {
        return (
            title !== initialTitle
            || publiclyHidden !== initialPubliclyHidden
            || startDate !== initialStartDate
            || endDate !== initialEndDate
            || shortDescription !== initialShortDescription
            || content !== initialContent
            || experienceType !== initialExperienceType
            || media !== initialMedia
        )
    }

    const handleUnsavedChangesDialogYesAction = () => {
        setConfirmUnsavedChangesDialogOpen(false);
        onSaveAndCloseModal();
    };

    const handleUnsavedChangesDialogNoAction = () => {
        setConfirmUnsavedChangesDialogOpen(false);
        onClose(undefined);
    };

    const handleUnsavedChangesDialogCloseAction = () => {
        setConfirmUnsavedChangesDialogOpen(false);
    };

    const onSaveAndCloseModal = () => {

        if (media && media.name) {
            getImage(media.name, (img) => {
                let data;
                if (img && img.name && img.src) {
                    data = {
                        uuid: experienceData && experienceData.uuid ? experienceData.uuid : null,
                        title: title,
                        userId: authenticatedUser.user.userId,
                        startDate: startDate,
                        endDate: endDate,
                        shortDescription: shortDescription,
                        content: content,
                        hidden: publiclyHidden,
                        media: media,
                        experienceType: experienceType.value
                    };
                } else {
                    data = {
                        uuid: experienceData && experienceData.uuid ? experienceData.uuid : null,
                        title: title,
                        userId: authenticatedUser.user.userId,
                        startDate: startDate,
                        endDate: endDate,
                        shortDescription: shortDescription,
                        content: content,
                        hidden: publiclyHidden,
                        media: null,
                        experienceType: experienceType.value
                    };
                }
                onSave(data);
            });
        } else {
            const data = {
                uuid: experienceData && experienceData.uuid ? experienceData.uuid : null,
                title: title,
                userId: authenticatedUser.user.userId,
                startDate: startDate,
                endDate: endDate,
                shortDescription: shortDescription,
                content: content,
                hidden: publiclyHidden,
                media: media,
                experienceType: experienceType.value
            }
            onSave(data);
        }
    }

    const handleConfirmDeleteDialogYesAction = () => {
        setConfirmDeleteDialogOpen(false);
        onDelete(experienceData.uuid);
    };

    const handleConfirmDeleteDialogCancelAction = () => {
        setConfirmDeleteDialogOpen(false);
    };


    const onDeleteAndCloseModal = () => {
        setConfirmDeleteDialogOpen(true);
    }

    const onCloseModal = () => {
        if (checkHasChanges()) {
            setConfirmUnsavedChangesDialogOpen(true);
        } else {
            onClose(undefined);
        }
    };

    const buttons = experienceData && experienceData.uuid ? [
        {
            text: t('general.buttons.save_and_close'),
            action: onSaveAndCloseModal,
            color: "success"
        },
        {
            text: t('general.buttons.cancel'),
            action: onCloseModal,
            color: "danger"
        },
        {
            text: <MDBIcon fas icon="trash-alt" size="lg" />,
            action: onDeleteAndCloseModal,
            color: "danger"
        }
    ]: [
        {
            text: t('general.buttons.save_and_close'),
            action: onSaveAndCloseModal,
            color: "success"
        },
        {
            text: t('general.buttons.cancel'),
            action: onCloseModal,
            color: "danger"
        }
    ]


    useEffect(() => {
        if (experienceData) {
            setTitle(experienceData.title);
            setPubliclyHidden(experienceData.hidden);
            setStartDate(experienceData.startDate);
            setEndDate(experienceData.endDate);
            setShortDescription(experienceData.shortDescription);
            setContent(experienceData.content);
            setMedia(experienceData.media);

            const type = experienceTypeOpts.find(opt => opt.value === experienceData.experienceType);
            setExperienceType(type);

            setInitialTitle(experienceData.title);
            setInitialPubliclyHidden(experienceData.hidden);
            setInitialStartDate(experienceData.startDate);
            setInitialEndDate(experienceData.endDate);
            setInitialShortDescription(experienceData.shortDescription);
            setInitialContent(experienceData.content);
            setInitialMedia(experienceData.media);
            setInitialExperienceType(type);
        } else {
            setTitle("");
            setPubliclyHidden(false);
            setStartDate(null);
            setEndDate(null);
            setShortDescription("");
            setContent("");
            setMedia(null);

            const type = experienceTypeOpts.find(opt => opt.value === 'WORK');
            setExperienceType(type);

            setInitialTitle("");
            setInitialPubliclyHidden(false);
            setInitialStartDate(null);
            setInitialEndDate(null);
            setInitialShortDescription(null);
            setInitialContent(null);
            setInitialMedia(null);
            setInitialExperienceType(type);
        }

    }, [experienceData]);


    const handleImageUpload = (e) => {
        uploadImage(e, setMedia);
    }

    const handleRestoreInitialImage = () => {
        if (initialMedia && initialMedia.name) {
            getImage(initialMedia.name, setMedia);
        } else {
            console.log("No images to restore: " + initialMedia);
        }
    }

    const handleDeleteImage = (fileName) => {
        deleteImage(fileName, () => {
            setMedia(null);
            if (initialMedia && initialMedia.name === fileName) {
                setInitialMedia(null);
            }
        });
    }
    
    const handlePublicCheckbox = (e) => {
        setPubliclyHidden(!publiclyHidden);
    }

    const setDateRange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleShortDescriptionChange = (e) => {
        setShortDescription(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    return (
        <>
            <ModalWindow 
                open={ open }
                centered
                onCloseAction={ onCloseModal }
                title={ (!!experienceData ? t('experience_modal.edit_title') : t('experience_modal.add_title')) }
                content={ 
                    <>
                        <MDBRow className="mb-3">
                            <MDBCol sm='5' lg ='7'>
                                <MDBInput label={t('experience_modal.title_field')} id='experience-title' type='text' size='lg' value={ title } onChange={handleTitleChange} />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow className="mb-3">
                            <MDBCol size="auto">
                                <Select
                                    value={experienceType}
                                    onChange={setExperienceType}
                                    options={experienceTypeOpts}
                                />
                            </MDBCol>
                            <MDBCol center size='auto'>
                                <MDBCheckbox 
                                    name='experiencePublicCheck' 
                                    id='experience-public-checkbox' 
                                    label={t('experience_modal.public_checkbox_field')} 
                                    value={publiclyHidden}
                                    onChange={handlePublicCheckbox} 
                                />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow className="mb-3" >
                            <MDBCol size='auto'>
                                    <DateRange
                                        startDate={ startDate }
                                        endDate={ endDate }
                                        minDate={ new Date(1993, 4, 8)}
                                        onDateRangeChange={({ startDate, endDate }) => setDateRange(startDate, endDate)}
                                    />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow className="mb-3">
                            <MDBCol size="auto">
                                <MDBRow center>
                                    <MDBCol center size="auto">
                                        <label htmlFor="image-upload">
                                            <IconButton 
                                                icon='image'
                                                tooltip={t('general.image.upload')} 
                                                tooltipPlacement='top'
                                                size='lg'
                                            />
                                            { t('general.image.upload') }
                                        </label>
                                        <input
                                            type="file"
                                            id="image-upload"
                                            className="image-upload-input"
                                            accept="image/png, image/jpeg"
                                            onChange={ handleImageUpload }
                                        />
                                    </MDBCol>                                    
                                </MDBRow>
                                
                            </MDBCol>
                            <MDBCol sm='5' lg ='7'>
                                {
                                    isUploading 
                                    ? <LoadingSpinner pulse />
                                    : media && (
                                        <Image src={media.src} name={media.name} onDelete={handleDeleteImage} />
                                    )
                                }
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-3">
                            <MDBCol sm='6' lg ='8'>
                                <MDBInput label={t('experience_modal.short_desc_field')} id='experience-title' type='text' value={ shortDescription } onChange={handleShortDescriptionChange} />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow center>
                            <MDBCol><MDBTextArea label={t('experience_modal.content_field')} id='experience-content' rows={4} size="lg" value={ content } onChange={handleContentChange}/></MDBCol>
                        </MDBRow>
                    </>
                }
                buttons={buttons}
            />
            <SimpleDialog 
                title={t('dialog.unsaved_changes')} 
                icon={<MDBIcon fas icon="exclamation-triangle" size="lg" color="warning" />}
                body={t('dialog.want_to_save')} 
                open={confirmUnsavedChangesDialogOpen} 
                onYes={handleUnsavedChangesDialogYesAction}
                onNo={handleUnsavedChangesDialogNoAction}
                onCancel={handleUnsavedChangesDialogCloseAction}
            />
            <SimpleDialog 
                title={t('dialog.confirm_delete')}
                icon={<MDBIcon fas icon="trash-alt" size="lg" color="danger" />} 
                body={t('dialog.want_to_delete')} 
                open={confirmDeleteDialogOpen} 
                onYes={handleConfirmDeleteDialogYesAction}
                onCancel={handleConfirmDeleteDialogCancelAction}
            />
        </>
    );
    
}

export default ExperienceModal;