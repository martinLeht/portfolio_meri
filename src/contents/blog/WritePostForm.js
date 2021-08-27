import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBFormInline } from "mdbreact";
import BlogEditor from "./editor/BlogEditor";

const WritePostForm = () => {

    const printContent = () => {
        console.log(localStorage.getItem('content'));
    }

    return(
        <div>
            <MDBRow middle center className="dark-text">
                <MDBCol size="7" lg="3" className="d-inline justify-content-top m-1">
                    <div className="form-group text-white rounded-4 m-1 p-3 editor-action-panel">
                        <h2>Otsikko</h2>
                        <MDBInput className="text-white border-1" placaholder="Otsikko tähän..." size="lg" />
                        <MDBBtn outline color="white" type="submit" onClick={ printContent }>
                            Esikatsele
                        </MDBBtn>
                        <MDBBtn outline color="white" type="submit">
                            Tallenna ja julkaise
                        </MDBBtn>
                    </div>
                </MDBCol>
                <MDBCol middle className="d-flex flex-column m-1 editor" size="10" lg="7">
                    <BlogEditor />
                </MDBCol>
            </MDBRow>
            
        </div>
    )
}

export default WritePostForm;