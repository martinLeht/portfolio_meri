import { MDBRow } from "mdb-react-ui-kit";
import LoadingSpinner from "./LoadingSpinner";


const Loader = (props) => {
    const { pulse, className } = props;
    return (
        <MDBRow center className={"p-5 text-center" + (!!className ? ` ${className}` : "")}>
            <LoadingSpinner pulse={pulse} />
        </MDBRow>
    );
}

export default Loader;