import { MDBCard, MDBCardTitle, MDBIcon } from 'mdbreact';



const BlogCard = (props) => {

    const { img } = props;

    const imgPath = "url('" + img + "')";

    const date = new Date().toLocaleString();

    return(
        <MDBCard
          className='card-image justify-content-end m-0 blog-card'
          style={{
            backgroundImage: imgPath
          }}
        >
            <div className='text-white text-left d-flex align-items-bottom pt-5'>
                <div className="blog-card-content px-4">
                    <MDBCardTitle tag='h4' className='pt-2'>
                        <strong>Blogi Otsikko</strong>
                    </MDBCardTitle>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Repellat fugiat, laboriosam, voluptatem sit...
                    </p>
                    <p className='d-inline font-weight-bold orange-text'>
                        <MDBIcon far icon="clock" /> 
                        { date }
                    </p>
                    <a
                        href='!#'
                        className='orange-text mt-1 d-flex justify-content-end align-items-center'
                    >
                        <h6>
                            Lue lisää{' '}
                            <MDBIcon icon='chevron-right' size='sm'/>
                        </h6>
                    </a>                    
                </div>
            </div>
        </MDBCard>
    );

}

export default BlogCard;