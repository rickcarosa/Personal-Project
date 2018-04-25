import React from 'react';
import Nav from '../nav/Nav';
import {connect} from 'react-redux';
import {getCart} from '../../ducks/reducer';

function Cart(){
    return(
        <div className = "Cart">
            <Nav/>
        </div>
    )
}

function mapStateToProps(state){
    return{
        
    }
}

export default connect(mapStateToProps, {getCart}) (Cart);