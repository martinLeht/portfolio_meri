import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBFormInline, MDBIcon } from 'mdbreact';

const BlogToolBar = (props) => {


    return(
        <MDBRow between className="rounded-4 text-white bg-dark px-2 mb-2">
            <MDBCol middle size="6" lg="5">
                <h3>Kaikki Julkaisut</h3>
            </MDBCol>
            
            <MDBCol middle className="d-flex justify-content-end" size="5" lg="4">
                <MDBFormInline className="md-form m-0">
                    <MDBInput className="m-0" label="Etsi / Search" />
                    <MDBBtn outline color="white" size="sm" type="submit" className="border-0 m-0">
                        <MDBIcon icon="search" size="2x" />
                    </MDBBtn>
                </MDBFormInline>
            </MDBCol>
        </MDBRow>

    );
}

export default BlogToolBar;