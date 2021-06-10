import React, { Component } from 'react';
import { Link } from 'react-scroll';

class NavItem extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            itemName: props.item,
            navId: props.navId
        }
    }

    render() {
        return (
            <li className="nav-item">
                <Link
                    className="nav-link"
                    activeClass="active"
                    to={ this.state.navId }
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                >
                    { this.state.itemName }
                </Link>
            </li>
        )
    }
}

export default NavItem;