import { MDBIcon, MDBTooltip } from 'mdbreact';

const IconButton = (props) => {

    const { children, icon, tooltip, tooltipPlacement, action, active, size } = props;

    return (
        <MDBTooltip
            domElement
            tag="span"
            material
            placement={ tooltipPlacement ? tooltipPlacement : 'left' }
        >
            <span>
                <MDBIcon 
                    icon={ icon } 
                    className={'m-1 p-2 icon-button' + (active ? ' active' : '')} 
                    onClick={ action } 
                    size={ size } 
                />
                { children }
            </span>
            <span>{ tooltip }</span>
        </MDBTooltip>
    );
}

export default IconButton;