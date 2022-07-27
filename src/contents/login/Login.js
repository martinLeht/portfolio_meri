
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useTranslation } from "react-i18next";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInputGroup, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import { useAuthentication } from './../../hooks/useAuthentication';
import AlertMsg from '../../components/general/AlertMsg';
import LoadingSpinner from '../../components/general/LoadingSpinner';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [callbackRoute, setCallbackRoute] = useState('/');
    const navigate = useNavigate();
    const { state } = useLocation();
    const { t } = useTranslation();
    const { login } = useAuthentication();

    useEffect(() => {
        console.log(state);
        if (state) {
            console.log(state);
            if (state.destinationRoute) {
                const destinationRoute = state.destinationRoute;
                if (destinationRoute && destinationRoute !== '') {
                    setCallbackRoute(destinationRoute);
                }
            }
            
            if (state.alertMsg) {
                const alertMsg = state.alertMsg;
                if (alertMsg && alertMsg !== '') {
                    setErrors([alertMsg]);
                }
            }
        }
        
    }, [state]);

    
    const loginHandler = (event) => {
        event.preventDefault();
        setLoading(true);
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
                    navigate(callbackRoute);
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
        <MDBContainer fluid className="login">
            <MDBRow center middle>
                <MDBCol md="4">
                    <form className="d-flex align-items-center flex-column login-form text-white" noValidate onSubmit={ loginHandler }>
                    
                        <h5 className="text-center mb-4 m-2">{ t('login.login') }</h5>
                        {
                            errors.length > 0 && (
                                <AlertMsg text={errors[0]} />
                            )
                        }

                        <div className='text-center'>
                            <MDBInputGroup className='m-2' noBorder textBefore={<MDBIcon fas color="white" icon='at' />}>
                                <input
                                    className="text-white"
                                    type='email' 
                                    value={ email }
                                    onChange={ emailChangeHandler }
                                    onBlur={ validateInput }
                                    placeholder='Email'
                                />
                            </MDBInputGroup>
                            <MDBInputGroup className='m-2' noBorder textBefore={<MDBIcon fas color="white" icon='key' />}>
                                <input
                                    className="text-white"
                                    type='password' 
                                    value={ password }
                                    onChange={ passwordChangeHandler }
                                    placeholder='Password'
                                />
                            </MDBInputGroup>
                        </div>
                        
                        
                        <div className="text-center m-2">
                            <MDBBtn 
                                color="dark"
                                className="text-white" 
                                type="submit"
                                disabled={ loginDisabled || loading }
                            >
                                {
                                    loading 
                                    ? <LoadingSpinner size="sm" />
                                    : t('login.login') 
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