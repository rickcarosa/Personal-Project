import React, {Component} from 'react';
import {injectStripe} from 'react-stripe-elements';
import Card from './Card';
import axios from 'axios';

class Form extends Component{
    constructor(props) {
        super(props);
        this.state = {
            amount: 100
        }
    }

    onSubmit(e){
        e.preventDefault();
        this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
            console.log('Received Stripe token:', token)
            axios.post('/api/charge', {token, amount: this.props.total}).then(res => {
                console.log("woopiieeee")
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
               <button> Pay ${this.state.amount}.00 </button>
           </form>
        )
    }
}

export default injectStripe(Form);