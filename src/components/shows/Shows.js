import React, {Component} from 'react';
import Nav from '../nav/Nav';

class Shows extends Component{
    constructor(){
        super()
        this.state = {
            shows: []
        }
    }


    render(){
        return(
            <div>
                <Nav/>
            </div>
        )
    }
}

export default Shows;