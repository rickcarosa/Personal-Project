import React from 'react';
import {CardElement, CardNumberElement} from 'react-stripe-elements';
import './Card.css';
 
class Card extends React.Component {
  render() {
    return (
      <label>
        <CardElement style={{base: {fontSize: '18px'}}} />
      </label>
    );
  }
};
 
export default Card;