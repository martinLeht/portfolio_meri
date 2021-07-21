import { MDBIcon } from 'mdbreact';


const HeaderMedium = (props) => {

    const { heading, img, icon } = props;
    const headingPath = process.env.PUBLIC_URL + heading;
    const styleImgUrl = `url('../images/mertsa_ig_header.jpg')`;
    return (
        <div
            className='p-5 text-center bg-image header-medium'
            style={{ backgroundImage: styleImgUrl, height: 400 }}
        >
            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <div className='d-flex justify-content-center align-items-center h-100'>
                <div className='text-white'>
                <h1 className='mb-3'>
                    { heading }
                    {
                        icon && (
                            <a href='https://www.instagram.com/meriniemi_/?hl=fi'>
                               {icon}
                            </a>
                        )
                    }
                    
                </h1>
                
                </div>
            </div>
            </div>
        </div>
    );
}

export default HeaderMedium;