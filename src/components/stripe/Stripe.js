import React, {Component} from 'react';
import {Elements} from 'react-stripe-elements';
import Form from './Form';
import './Stripe.css';

class Stripe extends Component{


    render(){
        return(
            <div>
                <Elements>
                    <Form
                    total = {this.props.total}
                    />
                </Elements>
                
            </div>
        )
    }
}

export default Stripe;