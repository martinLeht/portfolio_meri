
import { forwardRef } from 'react';
import { MDBRow } from "mdb-react-ui-kit";

const Menu = forwardRef(({ 
    className, ...props 
  }, ref) => (
    <MDBRow center middle {...props} ref={ref} className={ className }/>
  )
);

const Toolbar = forwardRef(({ 
    ...props 
  }, ref) => (
    <Menu {...props} ref={ref} className="toolbar-menu" />
  )
);

export default Toolbar;

