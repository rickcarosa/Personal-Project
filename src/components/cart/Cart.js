import React, {Component} from 'react';
import Nav from '../nav/Nav';
import './Cart.css';
import Footer from '../footer/Footer';
import Checkout from '../checkout/Checkout';
import {connect} from 'react-redux';
import {getCart, deleteShow} from '../../ducks/reducer';
import Stripe from '../stripe/Stripe';

class Cart extends Component{
    
    componentDidMount(){
        this.props.getCart()
    }

    removeTags(e){
        var newDescription = e.replace('<p>', '')
        newDescription = newDescription.replace('</p>', '')
        newDescription = newDescription.replace('<b>', '')
        newDescription = newDescription.replace('</b>', '')
        newDescription = newDescription.replace('<i>', '')
        newDescription = newDescription.replace('</i>', '')
        return newDescription
    }

    render(){
        console.log(this.props.cart)
      
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
                            <div className = 'description'> <div className = 'summary'> Summary: </div> <br/>  {this.removeTags(e.description)} </div>
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
                return acc + curr.price
            }, 0)

            
        }
            console.log(totalPrice)
        
    return(
        <div className = "Cart">
            <Nav/>
            <div className = 'newcart'> {newCart}  </div>
        
             <Checkout 
            total = {totalPrice * 100}/>


            <div className = 'containter_buy'>
                <p className = 'total_price'> Total: ${totalPrice}.00 </p>
                <p className = 'card_details'> Card Details:</p>
            <Stripe 
            total = {totalPrice * 100} 
            />
            <br/>
                
            </div>

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

export default connect(mapStateToProps, {getCart, deleteShow}) (Cart);


