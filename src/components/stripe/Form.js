import React, {Component} from 'react';
import {injectStripe} from 'react-stripe-elements';
import './Form.css';
import Card from './Card';
import axios from 'axios';
import {withRouter} from 'react-router-dom'; // need withRouter because this component isn't rendered in app.js routes
import {getUser} from '../../ducks/reducer';
import {connect} from 'react-redux';
import _ from 'lodash';

class Form extends Component{
    

    onSubmit(e){
        e.preventDefault();
        let name = _.split(this.props.user.display_name, ' ', 1)
        let message = `Thank you, ${name}, your shows are on the way! -ShowMania`
        this.props.stripe.createToken({name: this.props.user.display_name}).then(({token}) => {
            // console.log('Received Stripe token:', token)
            axios.post('/api/charge', {token, amount: this.props.total}).then(res => {
                alert(`${name}, your purchase has been made!`);
                axios.post('/send', {email: this.props.user.email, message}).then( res => {
                    // console.log('here is the resonse', res)
                })
                this.props.history.push('/order')
            })         
        });
    }

    

    render(){

        
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

function mapStateToProps(state){
    return{
        user: state.user
    }
}


export default withRouter(injectStripe(connect(mapStateToProps, {getUser}) (Form)));