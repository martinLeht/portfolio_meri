import { MDBRow } from "mdb-react-ui-kit";
import LoadingSpinner from "./LoadingSpinner";


const Loader = (props) => {
    const { className } = props;
    return (
        <MDBRow center className={"p-5 text-center" + (!!className ? ` ${className}` : "")}>
            <LoadingSpinner />
        </MDBRow>
    );
}

export default Loader;