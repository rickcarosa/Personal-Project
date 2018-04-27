import React, {Component} from 'react';
import Nav from '../nav/Nav';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCart, deleteShow, getOrder} from '../../ducks/reducer';

class Cart extends Component{
    
    componentDidMount(){
        this.props.getCart()
    }

    addOrder(){
        axios.post('/api/order', {time:, totalPrice:, show_id:, show_price:}).then( () => {
            this.props.getOrder()
        })
    }

    render(){
        console.log(this.props)
      
        let newCart = null
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
        }
        
    
    return(
        <div className = "Cart">
            <Nav/>
            {newCart}
            <Link to = '/order'> <button className = 'purchase' onClick = {() => this.addOrder()}> Purchase! </button> </Link>

        </div>
    )
}
}

function mapStateToProps(state){
    return{
        cart: state.cart
    }
}

export default connect(mapStateToProps, {getCart, deleteShow, getOrder}) (Cart);