import { MDBIcon } from "mdb-react-ui-kit";

const AlertMsg = ({color, text}) => {

    return (
        <div className={"alert alert-" + (color ? color : 'danger')} role="alert">
           <MDBIcon fas icon="exclamation-triangle" />{" " + text}
        </div>
    );
}

export default AlertMsg;