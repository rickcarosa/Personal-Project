import React, {Component} from 'react';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import './Order.css';
import {connect} from 'react-redux';
import { addToOrder, getCart} from '../../ducks/reducer';
import _ from 'lodash';
import tv from './tv.png';

class Order extends Component{
    constructor(){
        super()
        this.state = {
            total_price: false,
            button: false,
            orderButton: true,
            title: false
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

    handleTitle(){
        this.setState({
            title: !this.state.title
        })
    }

    render(){        
        
        let newOrder = null
        let finalOrder = []
         newOrder = _.uniqBy(this.props.order, 'show_title')
        if(this.props.order.length > 0){
            finalOrder = newOrder.map( (e, i) => {
                let time = new Date(e.order_ts.split('.')[0] + "+0600");  // use GMT-0000 if passing in just the date, +0600 because I am recieving time in database 6 hours ahead of UTC
                return(
                    <div className = 'orderInfo' key = {i}>
                        
                        <div className = 'order_show_title'> {e.show_title} </div>
                        <div className = 'order_show_price'> ${e.price}.00 </div>
                        <div className = 'order_time'> {`${time.getMonth()}/${time.getDate()}/${time.getFullYear()}`} </div>
                        
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
                 { this.state.orderButton && <button className = 'add_order' onClick = {() => { this.loopOrders( orderTotal ); this.handleClick(); this.handleButton(); this.handleOrderButton(); this.handleTitle()}}> Get Your Order! </button>}
                 { this.state.orderButton ? <img className = 'tv_order' src = {tv} alt = 'television'/> : null}
                 <div className = 'order_title_container'> 
                    { this.state.title && <span className = 'order_title'> Your Order! </span>}
                 </div>
                    <div className = 'newOrder'> {finalOrder}  
                    { this.state.total_price && <div className = 'orderInfo'> Order Total: ${orderTotal}.00 </div> }
                    { this.state.button && <a href = {process.env.REACT_APP_LOGOUT_REDIRECT}> <button className = 'order_logout'> Logout </button> </a> }
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