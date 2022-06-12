
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import useWindowDimensions from '../../hooks/window-dimensions';

const SectionSeparator = (props) => {

    const { children, title } = props;
    const { isMobileSize } = useWindowDimensions();

    return (
        <MDBRow className="mx-0" center>
            <MDBCol size="10" className="my-4 border-bottom border-dark border-4">
                <MDBRow between={!isMobileSize} center={isMobileSize}>
                    <MDBCol size="auto">
                        <h2>{ title }</h2>
                    </MDBCol>
                    <MDBCol size="auto" className='mb-2'>
                        { children }
                    </MDBCol>
                </MDBRow>
            </MDBCol>
        </MDBRow>
    )

}

export default SectionSeparator;