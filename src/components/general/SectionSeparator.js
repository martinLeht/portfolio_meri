import { MDBBreadcrumb, MDBBreadcrumbItem, MDBRow, MDBCol } from 'mdbreact';
import { Children } from 'react';

const SectionSeparator = (props) => {

    const { children, title } = props;

    return (
        <MDBRow center>
            <MDBCol size="10" className="my-4 border-bottom border-dark border-4">
                <MDBRow between>
                    <MDBCol bottom size="auto">
                        <h2>{ title }</h2>
                    </MDBCol>
                    <MDBCol bottom size="auto">
                        { children }
                    </MDBCol>
                </MDBRow>
            </MDBCol>
        </MDBRow>
    )

}

export default SectionSeparator;