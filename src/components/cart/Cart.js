import React, {Component} from 'react';
import Nav from '../nav/Nav';
import {connect} from 'react-redux';
import {getCart} from '../../ducks/reducer';

class Cart extends Component{
    
    componentDidMount(){
        this.props.getCart()
    }

    render(){
        console.log(this.props)

        let newCart = this.props.cart.map((e, i) => {
            return(
                <div key = {e.id}>
                    {e.show_title}
                    {e.price}
                    {e.image}
                </div>
            )
        })

    return(
        <div className = "Cart">
            <Nav/>
            {newCart}
        </div>
    )
}
}

function mapStateToProps(state){
    return{
        cart: state.cart
    }
}

export default connect(mapStateToProps, {getCart}) (Cart);