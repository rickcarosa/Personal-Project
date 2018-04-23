import React, {Component} from 'react';
import Nav from '../nav/Nav';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';

class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            display: []
        }
    }

    componentDidMount(){
        this.props.getUser();
    }

    render(){

        

        return(
            <div> 
                <Nav/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser}) (Dashboard);