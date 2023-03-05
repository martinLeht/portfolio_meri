import { MDBCol, MDBRow, MDBIcon } from "mdb-react-ui-kit";
import { useKeycloak } from "@react-keycloak/web";
import moment from 'moment';


const CommentEntry = (props) => {

    const {right, left, commentId, username, author, message, createdAt, updatedAt, onDelete} = props;
    const { keycloak, initialized } = useKeycloak();

    return (
        <MDBRow center>
            <MDBCol sm="10" lg="9" className="comment-entry border border-1 bg-white rounded my-2">
                <p>
                    <b>{username}</b> {(author ? " (author)" : "")} 
                    
                    <span>
                        {
                            keycloak.authenticated && !!onDelete && <MDBIcon far icon="trash-alt" color="danger" onClick={onDelete}/>
                        }
                        {moment(createdAt).fromNow(true)} ago
                    </span>
                </p>
                <p>{message}</p>
            </MDBCol>
        </MDBRow>
    )
}

CommentEntry.defaultProps = {
    left: true,
    right: false
}

export default CommentEntry;