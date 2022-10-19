import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './Login.css'

const Login = () => {
    const {signInUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/'

    const handelSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password)

        signInUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            form.reset()
            navigate(from, {replace: true})
        })
        .catch(error => console.log(error))
    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Login</h1>
            <form onSubmit={handelSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='Your Email' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Password' required />
                </div>
                <button className='btn-submit' type="submit">Login</button>
            </form>
            <p>New to Ema-jhon? <Link to='/signup'>Create a New Account</Link></p>
        </div>
    );
};

export default Login;