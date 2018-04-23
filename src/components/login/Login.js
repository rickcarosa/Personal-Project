import React from 'react';


function Login(){
    return(
        <div className = "App">
             <a href = {process.env.REACT_APP_LOGIN} > 
                <button> Title, Picture, Login </button>
            </a> 
        </div>
    )
}

export default Login;