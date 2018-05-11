import React, {Component} from 'react';
import './Recommend.css'
import axios from 'axios';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import {Link} from 'react-router-dom';
import {connect} from  'react-redux';
import {addToCart, getCart} from '../../ducks/reducer';

class Recommend extends Component{
    constructor(){
        super()
        this.state = {
            api_key: '5ac62073c7fea542488a55bf2a3bfd54',
            picture_path: 'https://image.tmdb.org/t/p/w500',
            similar: []
        }
    }
    
    
    render(){

        let similarShows = null
        if (this.props.similar > 0){
            this.props.similar.map((e, i) => {
            let price = e.vote_average * 10
            let style = {
                background: `url(${this.state.picture_path+e.poster_path})`,
                width: '170px',
                height: '285px',
                padding: '5px',
                backgroundpPosition: 'center',
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat'   
            }

            return(
                <div key = {e.similar}>
                    <div className = 'popular'>
                        <div className = 'poster' style={style}
                             onClick = {() => addToCart(e.name, e.overview, this.state.picture_path+e.poster_path, price)}>
                            <div>
                                ADD NOW!
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

        return(
            <div>
                <Nav/>
                <div className = 'container_similar'>
                        <div className = 'message'> Similar to {this.props.similar.name}! </div>
                        <Link to = '/cart'> <button className = 'back'> Back to Cart </button> </Link>
                    </div>

                    <div className = 'container_similar_two'>
                        {similarShows}
                    </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        // similar: state.similar,
        cart: state.cart
    }
}

export default connect(mapStateToProps, {getCart, addToCart}) (Recommend);