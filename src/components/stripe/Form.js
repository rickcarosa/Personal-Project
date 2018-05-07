import React, {Component} from 'react';
import {injectStripe} from 'react-stripe-elements';
import './Form.css';
import Card from './Card';
import axios from 'axios';
import {Link} from 'react-router-dom';


class Form extends Component{
    

    onSubmit(e){
        e.preventDefault();
        this.props.stripe.createToken({name: 'Ricky Bobby'}).then(({token}) => {
            console.log('Received Stripe token:', token)
            axios.post('/api/charge', {token, amount: this.props.total}).then(res => {
                // function loopOrders(orderTotal){
                //     console.log(orderTotal, 'orderTotal')
                //     for(var i = 0; i < this.props.cart.length; i++){
                //         this.props.addToOrder(this.props.cart[i].show_title, this.props.cart[i].price, orderTotal)
                //         console.log(this.props.cart[i])
                //     }
                // }
                 
            }).catch( err => console.log(err))          
        });
    }

    render(){

        console.log(this.props)
        
        return(
           <form onSubmit = {(e) => this.onSubmit(e)}>
           <Card
                token = {this.onToken}
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
                amount = {this.props.amount}/>
                <br/>
                <Link to = '/order'> <button type = 'submit' className = 'purchase'> Purchase! </button> </Link>
                
           </form>
        )
    }
}


export default injectStripe (Form);