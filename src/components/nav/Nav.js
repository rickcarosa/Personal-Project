import React, {Component} from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';


class Nav extends Component{

        render(){
        return(
            <header className = 'Navbar'>
                <div className = "title"> ShowMania </div>
                    <nav className = 'navigation'>
                        <ul>
                            <Link to = '/dashboard'> <li> Home </li> </Link>
                            <Link to = '/shows'> <li> Shows </li> </Link>
                            <Link to = '/cart'> <li> Cart Icon </li> </Link>
                            <Link to = '/order'> <li> Order </li> </Link>
                            <a href = 'http://localhost:3005/logout'> <li> Logout </li> </a>
                        </ul>
                    </nav>
            </header>
        )
    }
}

export default Nav;