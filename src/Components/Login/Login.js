import React, { useState } from 'react';
import './Login.css';

const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = e => setUsername(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);

    const loginFormSubmit = async e => {
        e.preventDefault();
        if (!username) {
            alert('username is required');
            return;
        }
        if (!password) {
            alert('password is required')
            return;
        }
        if (username !== password) {
            alert('Please enter valid credentials');
            return;
        }
        if(username === password){
         
            window.localStorage.setItem('loginStatus',true)
            alert('login successful')
            props.history.push('./orders')
           
        }

    }

        return (
            <>
                <div id="loginform-wrapper">
                    <form onSubmit={loginFormSubmit} className="LoginPage" id="loginform">
                        <h1>Sign In</h1>
                        <input onChange={handleUsernameChange} className="LoginPage_InputField" type="text" name="username" value={username} placeholder="Enter Username"></input>
                        <input onChange={handlePasswordChange} className="LoginPage_InputField" type="password" name="password" value={password} placeholder="Enter Password"></input>
                        <input className="LoginPage_Button" type="submit" value="Login"></input>
                    </form>
                </div>
            </>
        );
    
}

export default Login;