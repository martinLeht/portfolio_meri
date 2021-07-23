import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBIcon, MDBView } from 'mdbreact';



const BlogCard = (props) => {

    const date = new Date().toLocaleString();

    return(
        <MDBCard wide cascade>
            <MDBView cascade>
                <MDBCardImage
                    hover
                    overlay='red-light'
                    className='card-img-top'
                    src={ process.env.PUBLIC_URL + "/images/gandalf-ak.jpg" }
                    alt='Card cap'
                />
            </MDBView>

            <MDBCardBody cascade className='text-center'>
                <MDBCardTitle className='card-title'>
                    <strong>Blogi Otsikko</strong>
                </MDBCardTitle>

                    <p className='font-weight-bold blue-text'>
                        <MDBIcon far icon="clock" /> 
                        { date }
                    </p>

                <MDBCardText>
                Sed ut perspiciatis unde omnis iste natus sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.{' '}
                </MDBCardText>

                <MDBCol md='12' className='d-flex justify-content-center'>
                    <a
                        href='!#'
                        className='orange-text mt-1 d-flex justify-content-end align-items-center'
                    >
                        <h5 className=''>
                            Lue lisää{' '}
                            <MDBIcon
                            icon='chevron-right'
                            className='ml-2'
                            size='sm'
                            ></MDBIcon>
                        </h5>
                    </a>
                </MDBCol>
            </MDBCardBody>
        </MDBCard>
    );

}

export default BlogCard;