import React, {Component} from 'react';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import axios from 'axios';
import './Dashboard.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser, addToCart} from '../../ducks/reducer';
import _ from 'lodash'

class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            popular: [],
            picture_path: 'https://image.tmdb.org/t/p/w500'

        }
    }

    componentDidMount(){
        this.props.getUser();
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`).then( res => {
            this.setState({
                popular: res.data.results
            }, ()=>{
                console.log(this.state.popular)
            })
        })
    }

    render(){

       let name = _.split(this.props.user.display_name, ' ', 1)

        var popularShows = this.state.popular.map( (e, i) => {
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
                <div key = {e.name}>
                    <div className = 'popular'>
                            <div className = 'poster' style={style} 
                                 onClick = {() => addToCart(e.name, e.overview, this.state.picture_path+e.poster_path, price )}>
                             <div>
                                ADD NOW!
                             </div>
                             </div>
                             
                    </div>
                </div>
            )
        })

        return(
            <div> 
                <Nav/>
                <div className = 'container'>
                    <h1> Hi {name}, See Whats Trending </h1>
                    <Link to = '/shows'> <button className = 'show_button'> Search for Shows! </button> </Link>
                </div>
                <div className='show_container'>
                    {popularShows}
                </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser, addToCart}) (Dashboard);