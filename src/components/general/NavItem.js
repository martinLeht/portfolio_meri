
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';


const NavItem = (props) => {
    let navigate = useNavigate();
    const changeRoute = () => {
        const routePath = window.location.pathname;
        if (routePath !== "/") {
            navigate("/");
        }
    }

    const { item } = props;

    return (
        <li className="nav-item">
            <Link
                className="nav-link text-white"
                activeClass={ 'selected' }
                to={ props.navId }
                spy={true}
                offset={-60}
                duration={300}
                onClick={ changeRoute }
            >
                { item }
            </Link>
        </li>
    )
}

export default NavItem;