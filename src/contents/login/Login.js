
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBInputGroup, MDBInputGroupElement, MDBInputGroupText, MDBIcon } from 'mdb-react-ui-kit';
import { useAuthentication } from './../../hooks/useAuthentication';
import AlertMsg from '../../components/general/AlertMsg';
import LoadingSpinner from '../../components/general/LoadingSpinner';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const { navigate } = useNavigate();
    const { login } = useAuthentication();

  
    const loginHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        console.log(email);
        console.log(password);
        validateInput();
        if (loginDisabled) {
            setLoading(false);
            return;
        } else {
            login({ email, password }).then((authRes) => {
                setLoading(false);
                if (authRes.error) {
                    setErrors([authRes.error]);
                } else {
                    setErrors([]);
                    navigate("/");
                }
            });
        }
        
    };

    const emailChangeHandler = (event) => {
        const emailInput = event.target.value;
        validateEmailInput(emailInput);
        setEmail(emailInput);
    }

    const validateEmailInput = (value) => {
        if (value && value.trim() !== '' && password && password.trim() !== '') {
            setLoginDisabled(false);
        } else {
            setLoginDisabled(true);
        }
    }

    const passwordChangeHandler = (event) => {
        const passwordInput = event.target.value;
        validatePasswordInput(passwordInput);
        setPassword(passwordInput);
    }

    const validatePasswordInput = (value) => {
        if (value && value.trim() !== '' && email && email.trim() !== '') {
            setLoginDisabled(false);
        } else {
            setLoginDisabled(true);
        }
    }

    const validateInput = () => {
        if (email && password && email.trim() !== '' && password.trim() !== '') {
            setLoginDisabled(false);
        } else {
            setLoginDisabled(true);
        }
    }
  
    return (
        <MDBContainer>
            <MDBRow center middle>
                <MDBCol md="6">
                    <form className="d-flex align-items-center flex-column login-form" noValidate onSubmit={ loginHandler }>
                    
                        <h5 className="text-center mb-4">Login</h5>
                        {
                            errors.length > 0 && (
                                <AlertMsg text={errors[0]} />
                            )
                        }
                        <MDBInputGroup className='text-center w-50'>
                            <MDBInputGroupText noBorder>
                                <MDBIcon fas icon='at' />
                            </MDBInputGroupText>
                            <MDBInputGroupElement
                                type='email' 
                                value={ email }
                                onChange={ emailChangeHandler }
                                onBlur={ validateInput }
                                placeholder='Email'
                            />
                        </MDBInputGroup>
                        <MDBInputGroup className='w-50'>
                            <MDBInputGroupText noBorder>
                                <MDBIcon fas icon='key' />
                            </MDBInputGroupText>
                            <MDBInputGroupElement
                                type='password' 
                                value={ password }
                                onChange={ passwordChangeHandler }
                                placeholder='Password'
                            />
                        </MDBInputGroup>
                        <div className="text-center">
                            <MDBBtn 
                                
                                className="text-white" 
                                type="submit"
                                disabled={ loginDisabled || loading }
                            >
                                {
                                    loading 
                                    ? <LoadingSpinner />
                                    : 'Login'
                                }
                            </MDBBtn>
                            
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Login;