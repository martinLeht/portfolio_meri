import React, { useState, useEffect, useCallback } from 'react';
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody
} from 'mdb-react-ui-kit';

const ModalWindow = React.memo((props) => {

    const { title, content, open, onCloseAction, size } = props;
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
        onCloseAction();
    }, []);

    console.log(title);

    useEffect(() => {
        setShowModal(open);
    }, [open]);

    return (
        <>
            <MDBModal show={showModal} tabIndex='-1' setShow={setShowModal}>
                <MDBModalDialog size={ !!size ? size : 'xl'}>
                    <MDBModalContent>
                        <MDBModalHeader className="primary-bg-color text-white">
                            <MDBModalTitle>{ title }</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={handleCloseModal}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>{ content }</MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
})

export default ModalWindow;