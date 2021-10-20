import { MDBBreadcrumb, MDBBreadcrumbItem } from 'mdbreact';

const SectionSeparator = (props) => {

    const { title } = props;

    return (
        <div className="d-flex justify-content-center rounded-4 text-white bg-dark p-3 mb-3">
             <h3>{ title } </h3>
        </div>
    )

}

export default SectionSeparator;