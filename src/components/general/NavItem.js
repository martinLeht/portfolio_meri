import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-scroll';


const NavItem = (props) => {
    let history = useHistory();
    const changeRoute = () => {
        const routePath = window.location.pathname;
        if (routePath !== "/") {
            history.push("/");
        }
    }

    const { item } = props;

    return (
        <li className="nav-item">
            <Link
                className="nav-link"
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