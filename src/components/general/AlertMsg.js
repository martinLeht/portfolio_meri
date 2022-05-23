const AlertMsg = ({color, text}) => {

    return (
        <div className={"alert alert-" + (color ? color : 'danger')} role="alert">
           { text }
        </div>
    );
}

export default AlertMsg;