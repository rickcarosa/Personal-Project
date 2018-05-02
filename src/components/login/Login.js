import React, {Component} from 'react';
import './Login.css';
// import 'particles.js/particles';
import Particles from 'react-particles-js';

class Login extends Component{
        
    // componentDidMount(){
    //     const particlesJS = window.particlesJS
    //     particlesJS.load('particles-js', 'particles.json', function(){
    //         console.log('particles.json loaded...')
    //         }) 
    // }

    render(){

    return(
        
        <div className = 'login'> 
                {/* <script src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"> </script> */}
                <div className='login_container'>
                    <div className = 'main_title'> ShowMania </div>
                        <a href = {process.env.REACT_APP_LOGIN} > 
                        <button className = 'sign_in'> Login </button>
                        </a> 
                </div>
                
                <Particles className = 'particles_js'
                        params = {{
                            particles:{
                                number:{
                                    value: 100
                                },
                                line_linked:{
                                    color: '#eac67a',
                                    opacity: .35,
                                    width: 1
                                },
                                move:{
                                    speed: 5
                                }
                            },
                            
                            interactivity:{
                                events:{
                                onhover:{
                                    enable: true,
                                    mode: 'repulse'
                                },
                                onclick:{
                                    enable: true,
                                    mode: 'push'    
                                }
                            },
                            modes:{
                                repulse:{
                                    distance: 80
                                }
                            }
                        }
                        }}
                        style = {{
                            width: '100%',
                            background: '#233237',
                            height: '120vh',
                            position: 'absolute',
                            backgroundSize: 'cover',
                            zIndex: '-1',
                            
                        }}
                />
        </div>
    )
}
}

export default Login;
