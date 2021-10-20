import { MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import { NavLink } from "react-router-dom";

const PostListItem = (props) => {
    const { img, id, title, intro, createdAt } = props;

    return(
        <>
            <MDBRow center middle>
                <MDBCol middle size="5" className="min-width-300">
                    <img src={ img } className="img-fluid z-depth-1" alt="" />
                </MDBCol>
                <MDBCol middle size="7" className="mt-1 align-items-center">
                    <NavLink
                        className="text-white nav-link"
                        to={ `/blog/post/${id}` }
                    >
                        <h5>{ title }</h5>
                    </NavLink>
                    <p>{ intro }</p>
                    <p>{ createdAt }</p>
                </MDBCol>
            </MDBRow>

        </>
    );
}

export default PostListItem;