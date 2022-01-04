
import { MDBIcon } from 'mdb-react-ui-kit';

const IconButton = (props) => {

    const { children, icon, tooltip, tooltipPlacement, action, active, size } = props;

    return (
        <span
            data-mdb-toggle="tooltip"
            data-mdb-placement={ tooltipPlacement ? tooltipPlacement : 'left' }
            title={ tooltip }>
            <MDBIcon 
                icon={ icon } 
                className={'m-1 p-2 icon-button' + (active ? ' active' : '')} 
                onClick={ action } 
                size={ size } 
            />
            { children }
        </span>
    );
}

export default IconButton;