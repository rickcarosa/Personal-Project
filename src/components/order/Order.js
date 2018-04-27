import React, {Component} from 'react';
import Nav from '../nav/Nav';
import {connect} from 'react-redux';
import {getOrder} from '../../ducks/reducer';

class Order extends Component{

    componentDidMount(){
        this.props.getOrder()
    }

    render(){
        return(
            <div className = 'Order'>
                <Nav/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        order: state.order
    }
}

export default connect(mapStateToProps, {getOrder} ) (Order);