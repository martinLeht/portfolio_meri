import { MDBSpinner } from 'mdb-react-ui-kit';

const LoadingSpinner = (props) => {
  const { size } = props;
  return (
    <>
        <MDBSpinner size={ size } className='mx-2 primary-color'>
            <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
    </>
  );
}

LoadingSpinner.defaultProps = {
  size: "md"
}

export default LoadingSpinner;