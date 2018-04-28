import React, {Component} from 'react';
import Nav from '../nav/Nav';
import axios from 'axios';
import './Dashboard.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';


class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            popular: [],
            api_key: '5ac62073c7fea542488a55bf2a3bfd54',
            picture_path: 'https://image.tmdb.org/t/p/w500'

        }
    }

    componentDidMount(){
        this.props.getUser();
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${this.state.api_key}&language=en-US`).then( res => {
            this.setState({
                popular: res.data.results
            }, ()=>{

                console.log(this.state.popular)
            })
        })
    }



    render(){

        var popularShows = this.state.popular.map( (e, i) => {
            return(
                <div key = {e.name}>
                    <div className = 'popular'>
                        <img className = 'poster' src={this.state.picture_path+e.poster_path} alt='movie poster' />
                    </div>
                </div>
            )
        })

        return(
            <div> 
                <Nav/>
                <Link to = '/shows'> <button className = 'show_button'> Search for Shows! </button> </Link>
                <div className='container'>
                {popularShows}
                </div>
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