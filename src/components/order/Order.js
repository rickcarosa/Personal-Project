import React, {Component} from 'react';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import './Order.css';
import {connect} from 'react-redux';
import { addToOrder, getCart} from '../../ducks/reducer';
import _ from 'lodash';

class Order extends Component{
    constructor(){
        super()
        this.state = {
            total_price: false,
            button: false,
            orderButton: true
        }
    }

    loopOrders(orderTotal){
        var showTitles = [];
        var prices = [];
            for(var i = 0; i < this.props.cart.length; i++){
                showTitles.push(this.props.cart[i].show_title)
                prices.push(this.props.cart[i].price)
            }
            this.props.addToOrder(showTitles, prices, orderTotal)
            // console.log(showTitles)
            // console.log(prices)
    }

    handleClick(){
        this.setState({
            total_price: !this.state.total_price
        })
    }

    handleButton(){
        this.setState({
            button: !this.state.button
        })
    }

    handleOrderButton(){
        this.setState({
            orderButton: !this.state.orderButton
        })
    }

    render(){        
        
        let newOrder = null
        let finalOrder = []
         newOrder = _.uniqBy(this.props.order, 'show_title')
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
                <div className = 'background'>
                 { this.state.orderButton && <button className = 'add_order' onClick = {() => { this.loopOrders( orderTotal ); this.handleClick(); this.handleButton(); this.handleOrderButton()}}> Get Your Order! </button>}
                    <div className = 'newOrder'> {finalOrder}  
                    { this.state.total_price && <div className = 'orderInfo'> Order Total: ${orderTotal}.00 </div> }
                    { this.state.button && <a href = 'http://localhost:3005/logout'> <button className = 'order_logout'> Logout </button> </a> }
                    </div>
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

export default connect(mapStateToProps, {addToOrder, getCart} ) (Order);