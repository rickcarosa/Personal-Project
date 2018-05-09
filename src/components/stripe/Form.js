import React, {Component} from 'react';
import {injectStripe} from 'react-stripe-elements';
import './Form.css';
import Card from './Card';
import axios from 'axios';
import {withRouter} from 'react-router-dom'; // need withRouter because this component isn't rendered in app.js routes



class Form extends Component{
    

    onSubmit(e){
        e.preventDefault();
        this.props.stripe.createToken({name: 'Ricky Bobby'}).then(({token}) => {
            console.log('Received Stripe token:', token)
            axios.post('/api/charge', {token, amount: this.props.total}).then(res => {
                alert("Your purchase has been made!");
                this.props.history.push('/order')
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
                <button type = 'submit' className = 'purchase'> Purchase! </button> 
                
           </form>
        )
    }
}


export default withRouter(injectStripe (Form));