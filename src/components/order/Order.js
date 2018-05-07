import React, {Component} from 'react';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import './Order.css';
import {connect} from 'react-redux';
import {getOrder, addToOrder, getCart} from '../../ducks/reducer';
import _ from 'lodash';

class Order extends Component{
    // constructor(){
    //     super()
    //     this.state = {
    //         total_price: false
    //     }
    // }

    componentDidMount(){
        alert("Your purchase has been made!")
        this.props.getCart()
        this.props.getOrder()
    }

    // loopOrders(orderTotal){
    //     console.log(orderTotal, 'orderTotal')
    //     for(var i = 0; i < this.props.cart.length; i++){
    //         this.props.addToOrder(this.props.cart[i].show_title, this.props.cart[i].price, orderTotal)
    //         console.log(this.props.cart[i])
    //     }
    // }

    // handleClick(){
    //     this.setState({
    //         total_price: !this.state.total_price
    //     })
    // }


    render(){        
        
        let newOrder = null
        let finalOrder = []
         newOrder = _.uniqBy(this.props.order, 'show_title')
         console.log(newOrder, 'newOrder')
        if(this.props.order.length > 0){
            console.log(this.props.order)
            finalOrder = newOrder.map( (e, i) => {
                return(
                    <div className = 'orderInfo' key = {i}>
                        <div className = 'order_show_title'> {e.show_title} </div>
                        <div className = 'order_show_price'> ${e.price}.00 </div>
                        <div className = 'order_time'> {e.order_ts} </div>
                        
                    </div>
                )
            })
        }
        
        let orderTotal = this.props.cart.reduce((acc, curr) => {
            return acc + curr.price
        }, 0)


        return(
            <div className = 'Order'>
                <Nav/>
                
                {/* <button className = 'add_order' onClick = {() => { this.loopOrders( orderTotal ); this.handleClick()}}> Get Your Order! </button> */}
        
                <div className = 'newOrder'> {finalOrder}  
                {/* { this.state.total_price && <div className = 'orderInfo'> Order Total: ${orderTotal}.00 </div> } */}
                <div className = 'orderInfo'> Order Total: ${orderTotal}.00 </div>
                </div>
                
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        order: state.order,
        cart: state.cart
    }
}

export default connect(mapStateToProps, {getOrder, addToOrder, getCart} ) (Order);