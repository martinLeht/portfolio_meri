import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBFormInline } from "mdbreact";
import BlogEditor from "./editor/BlogEditor";

const WritePostForm = () => {

    return(
        <div>
            <MDBRow middle center className="text-white">
                <MDBCol middle size="3" sm="2" lg="3" className="m-2">
                    <div className="form-group">
                        <form className="md-form my-0 text-white">
                            <h2>Otsikko</h2>
                            <MDBInput className="dark-text border-1" placaholder="Otsikko tähän..." size="lg" />
                            <MDBBtn outline color="white" type="submit">
                                Tallenna
                            </MDBBtn>
                            <MDBBtn outline color="white" type="submit">
                                Esikatsele
                            </MDBBtn>
                        </form>
                    </div>
                </MDBCol>
            </MDBRow>
            <MDBRow middle center className="text-dark">
                <MDBCol middle className="d-flex flex-column editor" size="8" sm="6" lg="7">
                    <BlogEditor />
                </MDBCol>
            </MDBRow>
            
        </div>
    )
}

export default WritePostForm;