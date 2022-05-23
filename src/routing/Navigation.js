import { useNavigate, useLocation } from 'react-router-dom';
import History from './History';

const Navigation = () => {
  History.navigate = useNavigate();
  History.location = useLocation();
  return null;
};

export default Navigation;