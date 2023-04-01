import { useState } from 'react';
import { MDBCol, MDBRow, MDBIcon, MDBBadge } from "mdb-react-ui-kit";
import { useKeycloak } from "@react-keycloak/web";
import { useTranslation } from "react-i18next";
import moment from 'moment';
import SimpleDialog from "../modal/dialog/SimpleDialog";


const CommentEntry = (props) => {

    const {right, left, commentId, username, author, message, createdAt, updatedAt, onDelete, onEdit} = props;

    const [deleteCommentDialogOpen, setDeleteCommentDialogOpen] = useState(false);
    const { keycloak, initialized } = useKeycloak();
    const { t } = useTranslation();

    const handleDelete = () => {
        setDeleteCommentDialogOpen(true);
    }

    const handleDeleteCommentDialogYesAction = () => {
        setDeleteCommentDialogOpen(false);
        onDelete(commentId);
    };

    const handleDeleteCommentDialogNoAction = () => {
        setDeleteCommentDialogOpen(false);
    };

    return (
        <>
            <MDBRow center>
                <MDBCol sm="10" lg="9" className="comment-entry border border-1 bg-white rounded my-2 pt-2">
                    <p>
                        <b >{username}</b> {(author ? <MDBBadge className="ms-2">{t('blog.comment.author')}</MDBBadge> : null)} 
                        
                        <span className="time">
                            {moment(createdAt).fromNow(true)} ago
                            {
                                keycloak.authenticated && !!onDelete && <MDBIcon far icon="trash-alt" color="danger" className="ms-2 hover-pointer" onClick={handleDelete}/>
                            }
                        </span>
                    </p>
                    <p>{message}</p>
                </MDBCol>
            </MDBRow>

            <SimpleDialog 
                title={t('dialog.confirm_delete')} 
                icon={<MDBIcon fas icon="trash-alt" size="lg" color="danger" />} 
                body={t('dialog.want_to_delete_comment')} 
                open={deleteCommentDialogOpen} 
                onYes={handleDeleteCommentDialogYesAction}
                onNo={handleDeleteCommentDialogNoAction}
            />
        </>
    )
}

CommentEntry.defaultProps = {
    left: true,
    right: false
}

export default CommentEntry;