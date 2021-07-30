import { MDBIcon, MDBTooltip } from 'mdbreact';

const IconButton = (props) => {

    const { icon, tooltip, tooltipPlacement, action } = props;

    return (
        <MDBTooltip
            domElement
            tag="span"
            material
            placement={ tooltipPlacement ? tooltipPlacement : 'left' }
        >
            <span><MDBIcon icon={ icon } className='m-1' onClick={ action } /></span>
            <span>{ tooltip }</span>
        </MDBTooltip>
    );
}

export default IconButton;