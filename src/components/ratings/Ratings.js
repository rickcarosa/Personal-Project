import React, {Component} from 'react';
import './Ratings.css'
import axios from 'axios';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import {Link} from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import {connect} from  'react-redux';
import {getCart} from '../../ducks/reducer';

class Ratings extends Component{
    constructor(props){
        super(props)
        let myLabels= props.cart.map(e=>e.show_title)
        let myRatings = props.cart.map(e=> (e.price/10).toFixed(1))
        this.state = {
            chartData: {
               labels: myLabels,
               datasets: [
                   {
                       type: 'line',
                       label: 'Top Rated',
                       data: [],
                       backgroundColor: '#984b43',
                       borderColor: '#eac67a',
                       fill: false,
                       pointRadius: 5,
                   },
                   {
                       type: 'bar',
                       label: 'Your Shows',
                       data: myRatings,
                       backgroundColor: '#233237',
                       borderColor: '#eac67a',
                       
                   },
               ],
           },

            chartOptions: {
               title: {
                   display: true,
                   text: 'How Did Your Shows Stack Up',
                   fontSize: 24,
                   fontColor: '#233237',
               },
               legend: {
                   display: true, 
                   position: 'top',
               },
               scales: {    
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 10,
                            stepSize: 1,
                            display: true
                        }, 
                        scaleLabel: {
                            display: true,
                            labelString: 'Rating',
                            fontSize: 20,
                            fontColor: '#233237'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Show List',
                            fontSize: 20,
                            fontColor: '#233237'
                        },
                        barThickness: 80,
                    }]
                },
                animation: {
                    duration: 1500,
                }, 

                responsive: true,
                maintainAspectRatio: false
           }
        }
    }

    componentDidMount(){
        this.props.getCart()
    }


    generate(){
        axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`).then( resp => {
            console.log(resp)
            let topRated = Object.assign({}, this.state.chartData)
            console.log(topRated)
            topRated.datasets[0].data = resp.data.results.map(e => e.vote_average)
            this.setState({
                data: topRated
            })
        }).catch(console.error)
    }
    
    
    render(){
        

        return(
            <div className = 'ratings_one'>
                <Nav/>
                    <div className = 'container_ratings'>
                        {
                            this.props.cart.length > 0 ? <button className = 'generate' onClick = {() => this.generate()}> Generate! </button>
                        :
                            null
                        }
                        {
                            this.props.cart.length === 0 ? <Link to = '/shows'> <button className = 'wait'> Add to Cart First! </button> </Link> 
                        :
                            <Link to = '/cart'> <button className = 'back'> Back to Cart! </button> </Link>
                        }
                    </div>
                    <div className = 'chart'>
                     <Bar data = {this.state.chartData} options = {this.state.chartOptions} />
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

export default connect(mapStateToProps, {getCart}) (Ratings);