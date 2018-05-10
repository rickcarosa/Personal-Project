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
        this.props.stripe.createToken({name: 'Ricky Bobby'}).then(({token}) => {
            console.log('Received Stripe token:', token)
            axios.post('/api/charge', {token, amount: this.props.total}).then(res => {
                alert(`${name}, thank you, your purchase has been made!`);
                axios.post('/send', {user_email: this.props.user_email, message: this.props.message}).then( res => {
                    console.log('here is the resonse', res)
                })
                this.props.history.push('/order')
            }).catch( err => console.log(err))          
        });
    }

    // onSubmit(e){
    //     e.preventDefault();
    //         axios.post('/send', {name, email, message}).then(res => {
    //             console.log('here is the response', res)
    //         }).catch((err) => {
    //             console.log('here is the error', err)
    //         })
    //     }


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

function mapStateToProps(state){
    return{
        user: state.user
    }
}


export default withRouter(injectStripe(connect(mapStateToProps, {getUser}) (Form)));