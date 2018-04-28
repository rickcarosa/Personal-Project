import React, {Component} from 'react';
import './Nav.css';
import menu_icon from './menu_icon.png';
import {Link} from 'react-router-dom';


class Nav extends Component{

        render(){
        return(
            <header className = 'Navbar'>
                <Link to = '/dashboard'> <div className = "title"> ShowMania </div> </Link>
                    <nav className = 'navigation'>
                        <ul>
                            <Link to = '/dashboard'> <li> Home </li> </Link>
                            <Link to = '/shows'> <li> Shows </li> </Link>
                            <Link to = '/cart'> <li> Cart </li> </Link>
                            <Link to = '/order'> <li> Order </li> </Link>
                            <a href = 'http://localhost:3005/logout'> <li> Logout </li> </a>
                        </ul>
                    </nav>

                    <img className = 'menu_icon' src = {menu_icon} alt = 'menu_icon'/> 
                
            </header>
        )
    }
}

export default Nav;