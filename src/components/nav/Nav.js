import React, {Component} from 'react';
import './Nav.css';
// import menu_icon from './menu_icon.png';
import {Link} from 'react-router-dom';


class Nav extends Component{


        menu(){
            document.getElementById("menu").classList.toggle("show");
        }

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

                    {/* <img className = 'menu_icon' src = {menu_icon} alt = 'menu_icon'/>  */}
                
                    <div className = "dropdown">
                        <button onClick = { () => this.menu()} className = "dropbtn">Menu</button>
                        <div id = 'menu' className = "dropdown-content">
                            <Link to = '/dashboard'> Home </Link>
                            <Link to = '/shows'> Shows </Link>
                            <Link to = '/cart'> Cart </Link>
                            <Link to = '/order'> Order </Link>
                            <a href = 'http://localhost:3005/logout'> Logout</a>
                        </div>
                    </div>

            </header>
        )
    }
}

export default Nav;