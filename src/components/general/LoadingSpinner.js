import { MDBSpinner } from 'mdb-react-ui-kit';

const LoadingSpinner = (props) => {
  const { pulse, size, color } = props;
  return (
    <>
        <MDBSpinner size={ size } className='mx-2 primary-color' color={color ? color : ""} grow={!!pulse}>
            <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
    </>
  );
}

LoadingSpinner.defaultProps = {
  size: "md"
}

export default LoadingSpinner;