import React, {Component} from 'react';
import Nav from '../nav/Nav';
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
                console.log(e)
                return(
                    <div key = {e.id}>
                        <img src = {e.image_cart} alt = 'show_image'/>
                        {e.show_title}
                        {e.price}
                        <button onClick = { () => this.props.deleteShow(e.id)}> Remove </button>
                    </div>
                   
                )
            })
            totalPrice = this.props.cart.reduce((acc, curr) => {
                console.log(this.props.cart)
                return acc + curr.price
            }, 0)
        }

        
    
    return(
        <div className = "Cart">
            <Nav/>
            {newCart}
            {totalPrice}
            <br/>
            <button className = 'purchase' onClick = {() => this.props.addToOrder()}> Purchase! </button>
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