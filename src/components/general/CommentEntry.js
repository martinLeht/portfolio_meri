import { MDBCol, MDBRow, MDBIcon, MDBBadge } from "mdb-react-ui-kit";
import { useKeycloak } from "@react-keycloak/web";
import { useTranslation } from "react-i18next";
import moment from 'moment';


const CommentEntry = (props) => {

    const {right, left, commentId, username, author, message, createdAt, updatedAt, onDelete, onEdit} = props;
    const { keycloak, initialized } = useKeycloak();
    const { t } = useTranslation();

    return (
        <MDBRow center>
            <MDBCol sm="10" lg="9" className="comment-entry border border-1 bg-white rounded my-2 pt-2">
                <p>
                    <b >{username}</b> {(author ? <MDBBadge className="ms-2">{t('blog.comment.author')}</MDBBadge> : null)} 
                    
                    <span className="time">
                        {moment(createdAt).fromNow(true)} ago
                        {
                            keycloak.authenticated && !!onDelete && <MDBIcon far icon="trash-alt" color="danger" className="ms-2" onClick={onDelete}/>
                        }
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