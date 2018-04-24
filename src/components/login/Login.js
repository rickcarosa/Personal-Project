import React from 'react';
import './Login.css';

function Login(){
    return(
        <div className = "App">
            <div className = 'main_title'> ShowMania </div>
                <a href = {process.env.REACT_APP_LOGIN} > 
                    <button className = 'sign_in'> Login </button>
                </a> 
        </div>
    )
}

export default Login;
