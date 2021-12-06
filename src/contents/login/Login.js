import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MDBContainer, MDBAlert, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { useAuthentication } from './../../hooks/useAuthentication';
import LoadingSpinner from '../../components/general/LoadingSpinner';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    let history = useHistory();
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
                    history.push("/");
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
                    <form className="login-form" noValidate onSubmit={ loginHandler }>
                        <h5 className="text-center mb-4">Login</h5>
                        {
                            errors.length > 0 && (
                                <MDBAlert color="danger">{ errors[0] }</MDBAlert>
                            )
                        }
                        <div className="grey-text">
                            <MDBInput 
                                value={ email }
                                onChange={ emailChangeHandler }
                                onBlur={ validateInput }
                                id="email" 
                                label="Email" 
                                icon="at" 
                                group 
                                type="email"
                                error="wrong"
                                success="right"
                                />
                            <div className="invalid-feedback">
                                Please provide a valid email.
                            </div>
                            <MDBInput 
                                value={ password }
                                onChange={ passwordChangeHandler }
                                id="password"
                                label="Password" 
                                icon="lock" 
                                group 
                                type="password"/>
                        </div>
                        <div className="text-center">
                            <MDBBtn 
                                className="text-white" 
                                type="submit" 
                                color="unique"
                                disabled={ loginDisabled || loading }
                            >Login</MDBBtn>
                            {
                                loading 
                                ? <LoadingSpinner />
                                : ''
                            }
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Login;