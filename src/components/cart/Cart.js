import React, {Component} from 'react';
import Nav from '../nav/Nav';
import './Cart.css';
import Footer from '../footer/Footer';
import {connect} from 'react-redux';
import {getCart, deleteShow, addToOrder} from '../../ducks/reducer';

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

        
    return(
        <div className = "Cart">
            <Nav/>
            <div className = 'newcart'> {newCart}  </div>
            <div className = 'containter_buy'>
                <p className = 'total_price'> Total: ${totalPrice} </p>
                <button className = 'purchase' onClick = {() => this.props.addToOrder()}> Purchase! </button>
            </div>
            <form action="/charge" method="POST">
                   <script
                    src="https://checkout.stripe.com/checkout.js" className="stripe-button"
                    data-key="pk_test_5RmiQvVJnL9YpJzycc2ncwGz"
                    data-amount={totalPrice}
                    data-name="ShowMania"
                    data-description="TV Shows"
                    data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
                    data-locale="auto"
                    data-zip-code="true">
                </script>
            </form>
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


// public key = pk_test_5RmiQvVJnL9YpJzycc2ncwGz
// private key = sk_test_9zaYd9mFXnQ0YoT56VtcHpaP