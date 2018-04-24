import React, {Component} from 'react';
import Nav from '../nav/Nav';
import axios from 'axios';

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
        var array = [];
        axios.get(`${this.props.baseUrl}/search/shows?q=${this.state.input}`).then( res => {
            array.push(res.data)
            this.setState({
                shows: array
            })
            console.log(this.state.shows)
        })
    }

    render(){
        return(
            <div>
                <Nav/>
                <input placeholder = 'Search' onChange = {(event) => {this.addShows(event.target.value)}} /> 
                <button className = 'find_shows' onClick = {() => {this.updateShows()}}> Find Shows! </button>
                {/* {this.state.shows} */}
            </div>
        )
    }
}

export default Shows;