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
                
                <Particles className = 'particles_js'
                        params = {{
                            particles:{
                                number:{
                                    value: 80
                                },
                                line_linked:{
                                    color: '#eac67a',
                                    opacity: .2
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
                                    distance: 100
                                }
                            }
                        }
                        }}
                        style = {{
                            width: '100%',
                            background: '#233237',
                            height: '100vh'
                        }}
                />

                        <div className = 'main_title'> ShowMania </div>
                            <a href = {process.env.REACT_APP_LOGIN} > 
                                <button className = 'sign_in'> Login </button>
                            </a> 
        </div>
    )
}
}

export default Login;
