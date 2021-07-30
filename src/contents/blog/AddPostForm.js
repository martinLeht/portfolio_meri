import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBFormInline } from "mdbreact";
import BlogEditor from "./editor/BlogEditor";

const AddPostForm = () => {

    return(
        <div>
            <MDBRow middle center className="text-dark">
                <MDBCol center size="4" lg="6">
                    <div className="form-group">
                        <form className="md-form my-0">
                            <MDBInput label="Otsikko" className="dark-textborder-1" placaholder="Otsikko..." size="lg" />
                            <MDBBtn outline color="white" type="submit" className="my-0">
                                Tallenna
                            </MDBBtn>
                        </form>
                    </div>
                </MDBCol>

                <MDBCol middle className="d-flex justify-content-end flex-column" size="7" lg="6">
                    <BlogEditor />
                </MDBCol>

            </MDBRow>
            
        </div>
    )
}

export default AddPostForm;