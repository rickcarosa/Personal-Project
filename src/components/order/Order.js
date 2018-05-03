import React, {Component} from 'react';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import './Order.css';
import {connect} from 'react-redux';
import {getOrder, addToOrder} from '../../ducks/reducer';

class Order extends Component{

    // componentDidMount(){
    //     this.props.getOrder()
    // } needs to render after button is clicked 

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
                <button className = 'add_order' onClick = {() => this.props.addToOrder()}> Get Your Order! </button>
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

export default connect(mapStateToProps, {getOrder, addToOrder} ) (Order);