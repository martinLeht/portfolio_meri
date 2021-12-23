
import { forwardRef } from 'react';

const Menu = forwardRef(({ 
    className, ...props 
  }, ref) => (
    <div {...props} ref={ref} className={ className + " d-flex justify-content-center align-items-center" }
    />
  )
);

const Toolbar = forwardRef(({ 
    className, ...props 
  }, ref) => (
    <Menu {...props} ref={ref} className={ className +" toolbar-menu" } />
  )
);

export default Toolbar;

