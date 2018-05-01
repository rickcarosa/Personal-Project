import React, {Component} from 'react';
import Nav from '../nav/Nav';
import './Cart.css';
import Footer from '../footer/Footer';
// import Checkout from '../checkout/Checkout';
import {connect} from 'react-redux';
import {getCart, deleteShow, addToOrder} from '../../ducks/reducer';
import Stripe from '../stripe/Stripe';

class Cart extends Component{
    
    componentDidMount(){
        this.props.getCart()
    }

    render(){
        console.log(this.props)
      
        let newCart = null
        let totalPrice = null
        if(this.props.cart.length > 0){
            newCart = this.props.cart.map((e, i) => {
                // console.log(e)
                return(
                    <div className = 'cart_container' key = {e.id}>
                        <img className = 'x_cart' src = {e.image_cart} alt = 'show_image'/>
                        <div className = 'cart_container_two'>
                            <div className = "show_title"> {e.show_title} </div>
                            <br/>
                            <div className = 'description'> <div className = 'summary'> Summary: </div> <br/> {e.description} </div>
                            <div className = 'cart_container_three' >
                                <div className = "show_price"> ${e.price}.00 </div>
                                <br/>
                                <button className = 'delete' onClick = { () => this.props.deleteShow(e.id)}> Remove </button>
                            </div>
                        </div>
                    </div>
                   
                )
            })
            totalPrice = this.props.cart.reduce((acc, curr) => {
                // console.log(this.props.cart)
                return acc + curr.price
            }, 0)
        }
            console.log(totalPrice)
        
    return(
        <div className = "Cart">
            <Nav/>
            <div className = 'newcart'> {newCart}  </div>
            <div className = 'containter_buy'>
                <p className = 'total_price'> Total: ${totalPrice}.00 </p>
                <button className = 'purchase' onClick = {() => this.props.addToOrder()}> Purchase! </button>
            </div>
         
            {/* <Checkout 
            total = {totalPrice * 100}/> */}

            <Stripe
            total = {totalPrice * 100} />
            <Footer/>
        </div>
    )
}
}

function mapStateToProps(state){
    return{
        cart: state.cart,
    }
}

export default connect(mapStateToProps, {getCart, deleteShow, addToOrder}) (Cart);


