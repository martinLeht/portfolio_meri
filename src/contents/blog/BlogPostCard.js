import { useTranslation } from "react-i18next";
import { MDBCard, MDBCardTitle, MDBIcon } from 'mdb-react-ui-kit';
import { NavLink } from "react-router-dom";
import { useDateFormatter } from '../../hooks/useDateFormatter';



const BlogPostCard = (props) => {

    const { className, img, title, postIntro, createdAt, id } = props;
    const { t } = useTranslation();    
    const trimmedPostIntro = postIntro.substr(0, 100) + '...';
    const imgPath = "url('" + img + "')";
    const { formatDateTime } = useDateFormatter();

    return(
        <MDBCard
            className={className + ' card-image justify-content-end mb-1 hover-shadow blog-card'}
            style={{
                backgroundImage: imgPath
            }}
        >
            <div className='d-flex justify-content-end align-items-bottom text-white text-left pt-5' >
                <div className="blog-card-content px-4">
                    <div>
                        <MDBCardTitle tag='h4' className='pt-2'>
                            <strong>{ title }</strong>
                        </MDBCardTitle>
                        <p> { trimmedPostIntro  } </p>
                        <p className='d-inline font-weight-bold'>
                            <MDBIcon far icon="clock" /> { createdAt }
                        </p>
                    </div>

                    <NavLink
                        className="text-white mt-1 d-flex justify-content-end align-items-center nav-link"
                        to={ `/blog/posts/${id}` }

                    >
                        <h6>
                            { t('blog.post_card.read_more') }{' '}
                            <MDBIcon icon='chevron-right' size='sm'/>
                        </h6>
                    </NavLink>                  
                </div>
            </div>
        </MDBCard>
    );

}

export default BlogPostCard;