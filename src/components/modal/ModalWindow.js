import React, { useState, useEffect } from 'react';
import { 
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit';

const ModalWindow = (props) => {

    const { title, content, buttons, centered, open, onCloseAction, size, headerColorClass } = props;
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        onCloseAction();
    };

    useEffect(() => {
        setShowModal(open);
    }, [open]);

    const renderButtons = () => {
        return (
            <MDBModalFooter>
                {
                    buttons.map((btn, i) => {
                        return (
                            <MDBBtn 
                                key={i} 
                                color={!!btn.color ? btn.color : 'primary'} 
                                onClick={btn.action} 
                                outline={ !!btn.color && btn.color === 'danger'} 
                                className={ !!btn.color && btn.color === 'danger' ? 'border border-0' : ''}>
                                { btn.text }
                            </MDBBtn>
                        );
                    })
                }
            </MDBModalFooter>
        );
    }

    return (
        <>
            <MDBModal show={showModal} tabIndex='-1' setShow={setShowModal} staticBackdrop>
                <MDBModalDialog size={ !!size ? size : 'xl'} centered={centered}>
                    <MDBModalContent>
                        <MDBModalHeader className={`text-white ${(!!headerColorClass ? headerColorClass : "primary-bg-color")}`}>
                            <MDBModalTitle>{ title }</MDBModalTitle>
                            {
                                !!onCloseAction && (
                                    <MDBBtn className='btn-close' color='none' onClick={handleCloseModal}></MDBBtn>
                                )
                            }
                        </MDBModalHeader>
                        <MDBModalBody>{ content }</MDBModalBody>
                        {
                            !!buttons && buttons.length
                            ? renderButtons()
                            : undefined 
                        }
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default ModalWindow;