import React, {Component} from 'react';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import './Order.css';
import {connect} from 'react-redux';
import {getOrder} from '../../ducks/reducer';

class Order extends Component{

    componentDidMount(){
        this.props.getOrder()
    }

    render(){

        let newOrder = null
        if(this.props.order.length > 0){
            newOrder = this.props.order.map( (e, i) => {
                return(
                    <div key = {e.orderId}>
                        {e.show_title}
                        {e.price}
                        {e.order_ts}
                        {e.total_price}
                    </div>
                )
            })
        }

        return(
            <div className = 'Order'>
                <Nav/>
                <div className = 'neworder'> {newOrder} </div>
                <Footer/>
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