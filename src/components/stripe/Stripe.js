import React, {Component} from 'react';
import {Elements} from 'react-stripe-elements';
import Form from './Form';

class Stripe extends Component{


    render(){
        return(
            <div>
                <Elements>
                    <Form/>
                </Elements>
                
            </div>
        )
    }
}

export default Stripe;