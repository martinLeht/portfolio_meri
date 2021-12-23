const AlertMsg = ({color, text}) => {

    return (
        <div class={"alert alert-" + (color ? color : 'danger')} role="alert">
           { text }
        </div>
    );
}

export default AlertMsg;