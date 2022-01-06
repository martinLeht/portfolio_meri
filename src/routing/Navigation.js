import { useNavigate } from 'react-router-dom';
import History from './History';

const Navigation = () => {
  History.navigate = useNavigate();

  return null;
};

export default Navigation;