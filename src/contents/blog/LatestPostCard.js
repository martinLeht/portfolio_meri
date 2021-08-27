import { MDBCard, MDBCardTitle, MDBIcon  } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const LatestPostCard = (props) => {
    const { img, title, postIntro, createdAt, id } = props;

    const imgPath = "url('" + img + "')";

    return(
        <MDBCard
            className='card-image justify-content-end mb-1 blog-card'
            style={{
                backgroundImage: imgPath
            }}
        >
            <div className='d-flex justify-content-end align-items-bottom text-white text-left pt-5' >
                <div className="latest-blog-card-content px-4">
                    <div>
                        <MDBCardTitle tag='h4' className='pt-2'>
                            <strong>{ title }</strong>
                        </MDBCardTitle>
                        <p> { postIntro } </p>
                        <p className='d-inline font-weight-bold'>
                            <MDBIcon far icon="clock" /> { createdAt }
                        </p>
                    </div>

                    <NavLink
                        className="text-white mt-1 d-flex justify-content-end align-items-center nav-link"
                        to={ `/blog/post/${id}` }
                    >
                        <h6>
                            Lue lisää{' '}
                            <MDBIcon icon='chevron-right' size='sm'/>
                        </h6>
                    </NavLink>                  
                </div>
            </div>
        </MDBCard>
    );
}

export default LatestPostCard;

