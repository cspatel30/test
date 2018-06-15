import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Menu extends Component {
    render() {
        return (
            <div>
            <li><NavLink className="menu-link" key="link_about" to="/about/">HOW IT WORKS</NavLink></li>
            <li><NavLink className="menu-link" key="link_contact" to="/contact/">CONTACT US</NavLink></li>
           </div>
        )
    }
}
