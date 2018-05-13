import React, {Component} from 'react';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import axios from 'axios';
import x from './x.png';
import tv from './tv.png';
import './Shows.css';
import {connect} from 'react-redux';
import {addToCart} from '../../ducks/reducer';

class Shows extends Component{
    constructor(){
        super()
        this.state = {
            input: '',
            shows: [],
            background: false,
            clearBackground: true
        }
    }

    addShows(value){
        this.setState({
            input: value
        })
    }

    updateShows(){
        axios.get(`${this.props.baseUrl}/search/shows?q=${this.state.input}`).then( res => {   
            this.setState({
                shows: res.data
            })
            console.log(this.state.shows)
        })
    }

    handleBackground(){
        this.setState({
            background: !this.state.background
        })
    }

    handleClearBackground(){
        this.setState({
            clearBackground: !this.state.clearBackground
        })
    }

    render(){

        var showList = this.state.shows.map( (e, i) => {
            let price = e.show.rating.average * 10
            return(
                <div key={e.show.id}>
                    <div className = 'info'>
                        {e.show.image ? ( <div> <img className = 'x' src = {e.show.image.medium} alt = "showImg"/> </div> ) : <img className = "x" src = {x} alt = 'N/A'/> } 
                        <div className = 'data'>
                            <p className = 'p_one'> {e.show.name} </p> 
                            {e.show.rating.average ? <div> <p> Rating: {e.show.rating.average} </p> </div> : <p> Rating: N/A </p>}
                            {e.show.rating.average ? <div className = 'price'> <p> Price: ${price} </p> </div> : <p> Price: ${Math.trunc((Math.random() * 100))} </p> }
                        </div>
                        <button className = 'add' onClick = {() => addToCart(e.show.name, e.show.summary, e.show.image.medium, price)}> Add to Cart! </button>
                    </div>
                </div>
            )
        })

        return(
            <div className = 'get_shows_parent'>
                <Nav/>
                    <div className = 'background_content'>
                        <div className = 'get_shows'>
                            { this.state.clearBackground && <input className = 'search' placeholder = 'Search Shows' onChange = {(event) => {this.addShows(event.target.value)}} /> }
                            { this.state.clearBackground && <button className = 'find_shows' onClick = {() => {this.updateShows(); this.handleBackground(); this.handleClearBackground()}}> Find Shows! </button> }    
                        </div>
                        { this.state.clearBackground && <img className = 'tv' src = {tv} alt = 'television'/> }
                        <div className = 'get_shows_two'>
                            <div className = 'search_two'> 
                                { this.state.background && <input className = 'search' placeholder = 'Search Shows' onChange = {(event) => {this.addShows(event.target.value)}} /> }
                                { this.state.background && <button className = 'find_shows' onClick = {() => this.updateShows()}> Find Shows! </button>}
                            </div>
                            <div>
                                { this.state.background && <div className = 'showlist'> {showList} </div>}
                            </div>
                        </div>
                    </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        cart: state.cart
    }
}

export default connect(mapStateToProps, {addToCart}) (Shows);
