
import { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBTextArea, MDBInput, MDBCheckbox, MDBIcon} from 'mdb-react-ui-kit';
import DateRange from '../../components/general/DateRange';
import { useTranslation } from "react-i18next";
import Select from 'react-select';
import ModalWindow from "../../components/modal/ModalWindow";
import SimpleDialog from "../../components/modal/dialog/SimpleDialog";
import { useAuthentication } from '../../hooks/useAuthentication';


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

    const [initialTitle, setInitialTitle] = useState('');
    const [initialPubliclyHidden, setInitialPubliclyHidden] = useState(false);
    const [initialStartDate, setInitialStartDate] = useState();
    const [initialEndDate, setInitialEndDate] = useState();
    const [initialShortDescription, setInitialShortDescription] = useState('');
    const [initialContent, setInitialContent] = useState('');
    const [initialExperienceType, setInitialExperienceType] = useState(null);

    const { t } = useTranslation();
    const { authenticatedUser } = useAuthentication();

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
        const data = {
            uuid: experienceData.uuid ? experienceData.uuid : null,
            title: title,
            userId: authenticatedUser.user.userId,
            startDate: startDate,
            endDate: endDate,
            shortDescription: shortDescription,
            content: content,
            hidden: publiclyHidden,
            media: experienceData.media ? experienceData.media : null,
            experienceType: experienceType.value
        }
        onSave(data);
    }

    const handleConfirmDeleteDialogYesAction = () => {
        setConfirmDeleteDialogOpen(false);
        onDelete(experienceData.uuid);
    };

    const handleConfirmDeleteDialogCancelAction = () => {
        setConfirmDeleteDialogOpen(false);
    };


    const onDeleteAndCloseModal = () => {
        console.log("Saving and closing!");
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
        console.log(experienceData);
        if (experienceData) {
            setTitle(experienceData.title);
            setPubliclyHidden(experienceData.hidden);
            setStartDate(experienceData.startDate);
            setEndDate(experienceData.endDate);
            setShortDescription(experienceData.shortDescription);
            setContent(experienceData.content);

            const type = experienceTypeOpts.find(opt => opt.value === experienceData.experienceType);
            setExperienceType(type);

            setInitialTitle(experienceData.title);
            setInitialPubliclyHidden(experienceData.hidden);
            setInitialStartDate(experienceData.startDate);
            setInitialEndDate(experienceData.endDate);
            setInitialShortDescription(experienceData.shortDescription);
            setInitialContent(experienceData.content);
            setInitialExperienceType(type);
        } else {
            setTitle("");
            setPubliclyHidden(false);
            setStartDate(null);
            setEndDate(null);
            setShortDescription("");
            setContent("");

            const type = experienceTypeOpts.find(opt => opt.value === 'WORK');
            setExperienceType(type);

            setInitialTitle("");
            setInitialPubliclyHidden(false);
            setInitialStartDate(null);
            setInitialEndDate(null);
            setInitialShortDescription(null);
            setInitialContent(null);
            setInitialExperienceType(type);
        }

    }, [experienceData]);


    
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