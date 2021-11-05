import { useHistory } from 'react-router-dom';
import { useAuthentication } from './../../hooks/useAuthentication';

const Login = () => {
    let history = useHistory();
    const { login } = useAuthentication();
  
    const handleLogin = () => {
      login().then(() => {
        history.push("/");
      });
    };
  
    return (
      <div>
        <h1>Login</h1>
        <button onClick={handleLogin}>
          Log in
        </button>
      </div>
    );
}

export default Login;