import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import {Provider} from 'react-redux';
import {StripeProvider} from 'react-stripe-elements';


ReactDOM.render( 
<Provider store = {store}>
    <StripeProvider apiKey = {process.env.REACT_APP_STRIPE_KEY}>
        
        <App/> 
        
    </StripeProvider>
</Provider> , document.getElementById('root'));

