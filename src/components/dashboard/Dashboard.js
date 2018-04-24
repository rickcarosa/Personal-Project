import React, {Component} from 'react';
import Nav from '../nav/Nav';
import './Dashboard.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';
import house from './house.jpg';

class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            display: []
        }
    }

    componentDidMount(){
        this.props.getUser();
    }



    render(){

        // const {getUser} = this.props
        // // console.log(this.props)

        return(
            <div> 
                <Nav/>
                <Link to = '/shows'> <button className = 'show_button'> Search for Shows! </button> </Link>
                <div className = 'pictures'>
                    <img src = {house} alt= 'house' />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser}) (Dashboard);