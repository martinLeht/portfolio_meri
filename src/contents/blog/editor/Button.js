import { forwardRef } from 'react';

const Button = forwardRef(({
    className, active, reversed, ...props 
  }, ref) => (
    <span
      {...props}
      ref={ref} 
      className={ 
        className + " text-dark"
      }
    />
));

export default Button;