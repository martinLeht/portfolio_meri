import React, { useState, useEffect } from 'react';
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody
} from 'mdb-react-ui-kit';

const ModalWindow = (props) => {

    const { title, content, open, onCloseAction } = props;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(open);
    }, [open]);

    const toggleCloseModal = () => {
        setShowModal(!showModal);
        onCloseAction();
    }

    return (
        <>
            <MDBModal show={showModal} tabIndex='-1' setShow={setShowModal}>
                <MDBModalDialog size='xl'>
                    <MDBModalContent>
                        <MDBModalHeader className="primary-bg-color text-white">
                            <MDBModalTitle>{ title }</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleCloseModal}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>{ content }</MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default ModalWindow;