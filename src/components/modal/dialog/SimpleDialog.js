import { useEffect, useCallback, useState } from 'react';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useTranslation } from "react-i18next";
import ModalWindow from "../ModalWindow";


const SimpleDialog = (props) => {
    const { title, icon, body, open, onYes, onNo, onCancel } = props;

    const [dialogButtons, setDialogButtons] = useState([]);

    const { t } = useTranslation();

    useEffect(() => {
        const buttons = [];
        if (!!onYes) {
            buttons.push({
                text: t('general.buttons.yes'),
                action: onYesAction,
                color: "primary"
            });
        }
        if (!!onNo) {
            buttons.push({
                text: t('general.buttons.no'),
                action: onNoAction,
                color: "danger"
            });
        }
        if (!!onCancel) {
            buttons.push({
                text: t('general.buttons.cancel'),
                action: onCancelAction,
                color: "danger"
            });
        }


        setDialogButtons(buttons);

    }, [open]);

    const onYesAction = useCallback(() => {
        console.log("Pressed YES");
        onYes();
    })

    const onNoAction = useCallback(() => {
        console.log("Pressed no...");
        onNo();
    })

    const onCancelAction = useCallback(() => {
        console.log("Pressed cancel...");
        onCancel();
    })

    return (
        <ModalWindow 
            open={ open }
            title={ title }
            centered
            headerColorClass="bg-gray"
            size="sm"
            content={ 
                <MDBRow>
                    { 
                        icon && (
                            <MDBCol center size='auto'>
                                { icon }
                            </MDBCol>
                        )
                    }
                    <MDBCol>
                        { body }
                    </MDBCol>
                </MDBRow>
            }
            buttons={dialogButtons}
        />
    );
}

export default SimpleDialog;