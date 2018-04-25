import React, {Component} from 'react';
import Nav from '../nav/Nav';
import axios from 'axios';
import x from './x.png';
import './Shows.css';

class Shows extends Component{
    constructor(){
        super()
        this.state = {
            input: '',
            shows: []
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

    render(){

        var showList = this.state.shows.map( (e, i) => {
            return(
                <div key={e.show.id}>
                    <div className = 'info'>
                        {e.show.image ? ( <div> <img className = 'x' src = {e.show.image.medium} alt = "showImg"/> </div> ) : <img className = "x" src = {x} alt = 'N/A'/> } 
                        {e.show.name} 
                        {e.show.rating.average ? <div> <p> Rating: {e.show.rating.average} </p> </div> : <p> Rating: N/A </p>}
                        {e.show.rating.average ? <div className = 'price'> <p> Price: ${e.show.rating.average * 10} </p> </div> : <p> Price: ${Math.trunc((Math.random() * 10) + 1)} </p> }
                        <button className = 'add'> Add to Cart! </button>
                    </div>
                </div>
            )
        })

        return(
            <div>
                <Nav/>
                <div className = 'get_shows'>
                    <input className = 'search' placeholder = 'Search' onChange = {(event) => {this.addShows(event.target.value)}} /> 
                    <button className = 'find_shows' onClick = {() => {this.updateShows()}}> Find Shows! </button>
                </div>
                {showList}
            </div>
        )
    }
}

export default Shows;